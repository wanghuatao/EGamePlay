using UnityEngine;
using Puerts;
using System;
using System.Collections;
using System.IO;
using UnityEngine.Networking;

namespace PuertsTest
{
    public delegate void ModuleInit(JsBehaviour monoBehaviour);

    //只是演示纯用js实现MonoBehaviour逻辑的可能，
    //但从性能角度这并不是最佳实践，会导致过多的跨语言调用
    public class JsBehaviour : MonoBehaviour
    {
        public string ModuleName; //可配置加载的js模块

        public Action JsStart;
        public Action JsUpdate;
        public Action JsOnDestroy;
        private JsLoader loader;

        static JsEnv jsEnv;
        private string scriptsDir = Path.Combine(Application.streamingAssetsPath, "Scripts");

        void Awake()
        {
        }

        IEnumerator Start()
        {
            yield return loadJs(ModuleName + ".js", scriptsDir + "/" + ModuleName + ".mjs");

            loader = new JsLoader(scriptsDir);
            if (jsEnv == null)
            {
                jsEnv = new JsEnv(loader, 4399);
                // jsEnv = Puerts.WebGL.GetBrowserEnv(loader, 4399);
            }

            // var init = jsEnv.Eval<ModuleInit>("require('" + ModuleName + "');");

            var init = jsEnv.ExecuteModule<ModuleInit>(ModuleName+".mjs","init");

            Debug.Log("init = " + init);
            init?.Invoke(this);


            if (JsStart != null) JsStart();
        }

        void Update()
        {
            if (JsUpdate != null) JsUpdate();
        }

        void OnDestroy()
        {
            if (JsOnDestroy != null) JsOnDestroy();
            JsStart = null;
            JsUpdate = null;
            JsOnDestroy = null;
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
                Debug.Log(request1.downloadHandler.text);
                ResourcesManager.jscache[fileName] = request1.downloadHandler.text;
            }
        }
    }
}