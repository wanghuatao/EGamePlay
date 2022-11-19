using System.Collections;
using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using Puerts;
using UnityEngine.Networking;

public class JsMonoBehaviour : MonoBehaviour
{
    public string JSClassName;

    // Start is called before the first frame update
    public Action JsStart;

    private bool isStart;

    void Start()
    {
        // if (jsEnv == null)
        // {
        //     // yield return loadJs("behaviours.mjs", scriptsDir + "/" + "behaviours.mjs");
        //     loader = new JsLoader(scriptsDir);
        //     Debug.Log("JsMonoBehaviour start");
        //
        //     jsEnv = Puerts.WebGL.GetBrowserEnv();
        //     // jsEnv = Puerts.WebGL.GetBrowserEnv(loader, -1);
        // }
        // Action<JsMonoBehaviour> init = env.Eval<Action<JsMonoBehaviour>>(@"
        //     global.CS = require('csharp');

        //     var jsCls = require('behaviours.cjs')." + JSClassName + @";
        //     (function init(mono) {
        //         return new jsCls(mono)
        //     });
        // ");


        // Action<JsMonoBehaviour> init = jsEnv.ExecuteModule<Action<JsMonoBehaviour>>("behaviours.mjs", JSClassName);
        // init(this);

        // yield return reload();


        // if (JsStart != null) JsStart();
    }

    private void OnEnable()
    {
    
    }


    // Update is called once per frame
    public Action JsUpdate;

    void Update()
    {
        if (!isStart)
        {
            if (JsManager.GetJsEnv() != null)
            {
                isStart = true;
                
                Action<JsMonoBehaviour> init = JsManager.GetJsEnv().ExecuteModule<Action<JsMonoBehaviour>>("behaviours.mjs", JSClassName);
                init(this);
                
                if (JsStart != null) JsStart();
            }
        }


        if (JsUpdate != null) JsUpdate();
    }

    public Action<Collider> JsOnTriggerEnter;

    void OnTriggerEnter(Collider other)
    {
        if (JsOnTriggerEnter != null) JsOnTriggerEnter(other);
    }
    
}