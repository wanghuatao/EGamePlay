import { JsMonoBehaviour, UnityEngine } from 'csharp'
import { JsBehaviour } from './Base/base'
import { JSGameManager } from './JSGameManager';

class JSBallBehaviour extends JsBehaviour<JsMonoBehaviour>{

    Start(): void {
        console.log('sstart')
    }

    protected prescore: boolean
    OnTriggerEnter(trigger: UnityEngine.Collider) {
        console.log('onTriggerEnter',trigger)

        // if (trigger == JSGameManager.instance._mb.PrescoreTrigger) {
        //     this.prescore = true;
        // }
        // if (trigger == JSGameManager.instance._mb.ScoredTrigger && this.prescore) {
        //     console.log("得分")
        // }
    }
}

export { JSBallBehaviour }