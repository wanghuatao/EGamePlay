import { JsMonoBehaviour } from "csharp";
import { JsBehaviour } from "./Base/base";

export default class TestJsBehavior extends JsBehaviour<JsMonoBehaviour>{

    Start(): void {
        console.log(" ddd TestJsB.Start");
    }

    Update(): void {
    
        // console.log("sssssssrdddrrjjjjj")
    }
}

// export {TestJsBehavior}