using System.IO;
using Puerts;
using UnityEngine;

public class JsLoader : ILoader
{
    private string root = "";

    public JsLoader()
    {
    }

    public JsLoader(string root)
    {
        this.root = root;
    }

    public bool FileExists(string filepath)
    {
        return true;
    }

    private bool IsPuertsModule(string filePath)
    {
        return filePath.StartsWith("puerts/");
    }

    private string PathToUse(string filepath)
    {
        return
            // .cjs asset is only supported in unity2018+
            filepath.EndsWith(".cjs") || filepath.EndsWith(".mjs")
                ? filepath.Substring(0, filepath.Length - 4)
                : filepath;
    }

    public string ReadFile(string filepath, out string debugpath)
    {
        //本地加载模式
        // if (GameManager.Instance.LocalMode) //一个bool类型的值，可以自己定义一下
        // {
        //     var puertsDir = Path.Combine(Application.dataPath, "AssetsPackage/JS");
        //     var jsPath = Path.Combine(puertsDir, filepath);
        //
        //     var txt = File.ReadAllText(jsPath);
        //     debugpath = jsPath.Replace("/", "\\");
        //
        //     return txt;
        // }
        // else
        // {
        debugpath = "";

        bool isPuerts = IsPuertsModule(filepath);
        string pathToUse = this.PathToUse(filepath);
        if (isPuerts)
        {
            return Resources.Load<TextAsset>(pathToUse).text;
        }


        var jscache = ResourcesManager.jscache;
        // string jsName = filepath.Replace("puerts/", "");
        string jsName1 = filepath.Replace(".mjs", ".mjs");

        string txt;
        jscache.TryGetValue(jsName1, out txt);
        Debug.Log("filepath:" + filepath+" ,jsname: "+"  "+jsName1);

        if (txt == null) txt = "";
        return txt;
    }
}