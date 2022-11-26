using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.ResourceProviders;
using UnityEngine.SceneManagement;
using Object = UnityEngine.Object;

public class ResourcesManager : MonoBehaviour
{
    public static Dictionary<string, string> jscache = new Dictionary<string, string>();

    public Action OnUpdate;

    public void Start()
    {
    }

    public void Init(Action onUpdate)
    {
        OnUpdate = onUpdate;
    }

    public void Update()
    {
        if (OnUpdate != null)
        {
            OnUpdate();
        }
    }


    public Action LoadJSComplete;


    public static void LoadAAAndAndInstant(string resPath, Action<GameObject> ok)
    {
        Addressables.InstantiateAsync(resPath).Completed += (res) => { ok(res.Result); };
    }

    public void LoadAA2(string resPath, Action<Object> ok)
    {
        Addressables.LoadAssetAsync<Object>(resPath).Completed += (res) =>
        {
            Debug.Log("Load" + res.Result);
            ok(res.Result);
        };
    }


    public static void LoadAA(string resPath, Action<Object> ok)
    {
        Addressables.LoadAssetAsync<Object>(resPath).Completed += (res) => { ok(res.Result); };
    }


    public static async Task<Object> LoadAssetAsync(string resPath)
    {
        var res = await Addressables.LoadAssetAsync<Object>(resPath).Task;
        return res;
    }


    public static void LoadScene(string resPath, Action<SceneInstance> ok)
    {
        Addressables.LoadSceneAsync(resPath).Completed += (res) => { ok(res.Result); };
    }

    public async Task<bool> PreloadJS(string jsLabel)
    {
        var list = await Addressables.LoadAssetsAsync<TextAsset>(jsLabel, null).Task;
        if (list != null)
        {
            jscache.Clear();
            foreach (var txt in list)
            {
                jscache.Add($"{txt.name}.js", txt.text);
            }

            LoadJSComplete?.Invoke();
            return true;
        }
        else
        {
            Debug.LogError("加载JS失败....");
            return false;
        }
    }
}