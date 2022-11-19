using System;
using System.Collections;
using UnityEngine;
using Puerts; 
using System.IO;
using UnityEngine.Networking;

public delegate void ModuleInit(Main monoBehaviour);

public class Main : MonoBehaviour
{
    public bool isDebug = false; // 是否开启调试
    public int debugPort = 43990; // 调试端口号
    public static JsEnv jsEnv; // 定义 jsEnv
    private JsLoader loader;
    public Action JsStart;
    public Action JsUpdate;
    private string scriptsDir = Path.Combine(Application.streamingAssetsPath, "Scripts");


    IEnumerator Start()
    {
        yield return loadJs("rxjs.js", scriptsDir + "/" + "rxjs.js");
        yield return loadJs("bundle.js", scriptsDir + "/" + "bundle.js");

        loader = new JsLoader(scriptsDir);
#if UNITY_WEBGL
        jsEnv= Puerts.WebGL.GetBrowserEnv(loader, debugPort);
#else        
        jsEnv = new JsEnv(loader, debugPort);        // 实例化 js 虚拟机
#endif

        jsEnv = Puerts.WebGL.GetBrowserEnv(loader, debugPort);
        if (isDebug)
        {
            // 启用调试
            // await jsEnv.WaitDebuggerAsync();
        }
        // jsEnv.Eval(@"
        //         global.csharp = require('csharp')
        //         global.puerts = require('puerts')
        //       
        //     ");
        //jsEnv.Eval("require('rxjs')");


        var comInit = jsEnv.Eval<Action<Main>>(@"
           var xx = require('bundle');
            const func = function(bindTo) {
            new xx().InitMain (bindTo)
            }
            func;
        ");
        comInit(this);

    }




    void Update()
    {
        if (jsEnv != null)
        {
            jsEnv.Tick();
        }

        if (JsUpdate != null) JsUpdate();
    }

    public IEnumerator loadJs(string fileName, string url)
    {
        Debug.Log(url);
        var request1 = UnityWebRequest.Get(url);
        yield return request1.SendWebRequest();
        if (request1.isHttpError || request1.isNetworkError)
        {
            Debug.LogError(request1.error);
        }
        else
        {
            ResourcesManager.jscache[fileName] = request1.downloadHandler.text;
        }
    }
}