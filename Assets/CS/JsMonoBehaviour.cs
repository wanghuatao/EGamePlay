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
        // Action<JsMonoBehaviour> init1 = JsManager.GetJsEnv().Eval<Action<JsMonoBehaviour>>(@"
        //     global.CS = require('csharp');
        // ");
        //
        // init1(this);


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
                JsManager.GetJsEnv().UsingAction<int>();
                JsManager.GetJsEnv().UsingAction<string>();
                JsManager.GetJsEnv().UsingFunc<int>();
                JsManager.GetJsEnv().UsingFunc<string>();
                JsManager.GetJsEnv().UsingAction<object>();
                
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