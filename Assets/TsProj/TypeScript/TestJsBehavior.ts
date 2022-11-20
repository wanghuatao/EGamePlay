import { Hero, JsMonoBehaviour, UnityEngine } from "csharp";
import { from } from "rxjs"
import { JsBehaviour } from "./Base/base";
const Vector2 = CS.UnityEngine.Vector2;

export default class TestJsBehavior extends JsBehaviour<JsMonoBehaviour> {


    Start(): void {
        console.log(" ddd TestJsB.Start");
        // this._mb.gameObject.GetComponent(puerts.$typeof(Hero))
        // let hero = this._mb.gameObject.GetComponent(puerts.$typeof(CS.PuertsTest.TestHero)) as CS.PuertsTest.TestHero
        // console.log('hero',hero);
       let hero = this._mb.gameObject.GetComponent(puerts.$typeof(CS.Hero)) as CS.Hero

        
        console.log('hero',hero);
        let xx = from([1, 2, 3, 4])
        xx.subscribe((x: any) => console.log(x))


        // hero.MoveSpeed = 12
        // this._mb.gameObject.AddComponent(puer.$typeof(CS.UnityEngine.ParticleSystem));

    }


    Update(): void {
        // let go = new CS.UnityEngine.GameObject("go");
        let heroObj = CS.UnityEngine.GameObject.Find("Hero")
        // console.log("hero: " + heroObj)
        // console.log("this", this._mb)
        // console.log("go", this._mb.gameObject, this._mb.name)


        // let hero =  this._mb.gameObject.GetComponent("Hero") as Hero

        // hero.GetComponent(puer.$typeof(Hero))
        // this._mb.gameObject.AddComponent(puer.$typeof(CS.UnityEngine.ParticleSystem));

        // let hero = this._mb.gameObject.GetComponent($typeof(Hero))
        // hero.MoveSpeed = 12

        // console.log("sssssssrdddrrjjjjj")
        // let hero =this._mb.GetComponent(puerts.$typeof(Hero))
        // console.log("MoveSpeed: " +hero)
    }
}
