using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.AddressableAssets;

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