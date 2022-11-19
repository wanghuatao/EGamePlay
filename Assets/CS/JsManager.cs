using System;
using System.Collections;
using System.IO;
using Puerts;
using UnityEngine;
using UnityEngine.Networking;

public class JsManager : MonoBehaviour
{
    private static JsEnv jsEnv;

    private JsLoader loader;
    private string scriptsDir = Path.Combine(Application.streamingAssetsPath, "Scripts");

    private void Start()
    {
        if (jsEnv == null)
        {
            // yield return loadJs("behaviours.mjs", scriptsDir + "/" + "behaviours.mjs");

            LoadJs("behaviours.mjs", () =>
            {
                loader = new JsLoader(scriptsDir);
                Debug.Log("JsMonoBehaviour start");
                // jsEnv = Puerts.WebGL.GetBrowserEnv();
                jsEnv = Puerts.WebGL.GetBrowserEnv(loader, -1);
            });
        }
    }

    public static JsEnv GetJsEnv()
    {
        return jsEnv;
    }


    private void Update()
    {
        if (jsEnv != null)
        {
            jsEnv.Tick();
        }
    }

    public void LoadJs(string filename, Action loadOk)
    {
        LoadJs(filename, scriptsDir + "/" + filename, loadOk);
    }


    public void LoadJs(string fileName, string url, Action loadOk)
    {
        var request1 = UnityWebRequest.Get(url);
        var result = request1.SendWebRequest();

        result.completed += (op) =>
        {
            Debug.Log(request1.downloadHandler.text);
            ResourcesManager.jscache[fileName] = request1.downloadHandler.text;
            loadOk?.Invoke();
        };
    }

    private IEnumerator LoadJs(string fileName, string url)
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
            // Debug.Log(request1.downloadHandler.text);
            ResourcesManager.jscache[fileName] = request1.downloadHandler.text;
        }
    }
}