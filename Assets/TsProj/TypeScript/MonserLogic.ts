import {JsBehaviour} from "./base/base";
import {AnimationComponent, JsMonoBehaviour} from "csharp";
import CombatEntity = CS.EGamePlay.Combat.CombatEntity;
import CombatContext = CS.EGamePlay.Combat.CombatContext;
import MotionComponent = CS.EGamePlay.Combat.MotionComponent

export default class MonsterLogic extends JsBehaviour<JsMonoBehaviour> {
    CombatEntity: CS.EGamePlay.Combat.CombatEntity
    MotionComponent: CS.EGamePlay.Combat.MotionComponent
    AnimationComponent: AnimationComponent

    Start() {
        this.CombatEntity = CombatContext.Instance.AddChild(puerts.$typeof(CS.EGamePlay.Combat.CombatEntity)) as CombatEntity

        CombatContext.Instance.Object2Entities.Add(this._mb.gameObject, this.CombatEntity)
        this.CombatEntity.Position = this._mb.transform.position
        this.MotionComponent = this.CombatEntity.Get(puerts.$typeof(MotionComponent)) as MotionComponent
        this.MotionComponent.RunAI()
        this.AnimationComponent = this._mb.gameObject.GetComponent(puerts.$typeof(CS.AnimationComponent)) as AnimationComponent
        
    }

    Update() {
        if (this.MotionComponent.Enable) {
            if (this.MotionComponent.MoveTimer.IsRunning) {
                this.AnimationComponent.Speed = 1.3
                this.AnimationComponent.TryPlayFade(this.AnimationComponent.RunAnimation)
            } else {
                this.AnimationComponent.Speed = 1
                this.AnimationComponent.TryPlayFade(this.AnimationComponent.IdleAnimation)

            }
            this._mb.transform.position = this.CombatEntity.Position
            this._mb.transform.GetChild(0).localEulerAngles = new CS.UnityEngine.Vector3(0,0,0)
        }else {
            console.log("disable")
            this.AnimationComponent.Speed=1
            this.AnimationComponent.TryPlayFade(this.AnimationComponent.IdleAnimation)
        }

    }
}