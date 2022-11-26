import {JsBehaviour} from "./base/base";
import {AnimationComponent, JsMonoBehaviour} from "csharp";
import CombatEntity = CS.EGamePlay.Combat.CombatEntity;
import CombatContext = CS.EGamePlay.Combat.CombatContext;
import MotionComponent = CS.EGamePlay.Combat.MotionComponent
import AddStatusAction = CS.EGamePlay.Combat.AddStatusAction;
import Entity = CS.EGamePlay.Entity;
import GameObject = CS.UnityEngine.GameObject;
import Text = CS.UnityEngine.UI.Text;
import {GetComponent, GetComponentInChildren} from "./base/CoreUtil";
import ResPath from "./common/ResPath";
import ActionPointType = CS.EGamePlay.Combat.ActionPointType;


export default class MonsterLogic extends JsBehaviour<JsMonoBehaviour> {
    CombatEntity: CS.EGamePlay.Combat.CombatEntity
    MotionComponent: CS.EGamePlay.Combat.MotionComponent
    AnimationComponent: AnimationComponent

    Start() {
        this.CombatEntity = CombatContext.Instance.AddChild(puerts.$typeof(CombatEntity)) as CombatEntity

        CombatContext.Instance.Object2Entities.Add(this._mb.gameObject, this.CombatEntity)
        this.CombatEntity.Position = this._mb.transform.position
        this.MotionComponent = this.CombatEntity.Get(puerts.$typeof(MotionComponent)) as MotionComponent
        this.MotionComponent.RunAI()

        this.AnimationComponent = GetComponent(this._mb.gameObject, CS.AnimationComponent)
        this.CombatEntity.ListenActionPoint(ActionPointType.PostReceiveStatus, this.OnReceiveStatus)

        CombatContext.Instance.Object2Entities.get_Item(this._mb.gameObject)
        
            
    }

    private OnReceiveStatus(combatAction: Entity) {
        let action = combatAction as AddStatusAction
        let addStatusEffect = action.AddStatusEffect
        let statusConfig = addStatusEffect.AddStatus
        console.log('statusConfig', statusConfig)
        

        let resManager = GetComponent(GameObject.Find("JsManager"), CS.ResourcesManager)

        console.log('resManager', resManager)
        resManager.LoadAA2(ResPath.StatusIcon, (go) => {
            let obj = GameObject.Instantiate(go) as GameObject
            let StatusSlotsTrm = GameObject.Find("UIRoot/MonsterStats/StatusSlots").transform
            obj.transform.SetParent(StatusSlotsTrm);
            GetComponentInChildren(obj, Text).text = statusConfig.Name

            obj.name = action.Status.Id.toString()
            console.log('obj.name', obj.name)
        })


        // this.load().then(res => {})

    }

    // async load() {
    //     let task = ResourcesManager.LoadAssetAsync("Assets/EGPsExamples/RpgExample/Prefabs/StatusIcon.prefab")
    //     let go = await puer.$promise(task)
    //     let obj = GameObject.Instantiate(go)
    // }


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
            this._mb.transform.GetChild(0).localEulerAngles = new CS.UnityEngine.Vector3(0, this.CombatEntity.Rotation.eulerAngles.y + 90, 0)
        } else {
            console.log("disable")
            this.AnimationComponent.Speed = 1
            this.AnimationComponent.TryPlayFade(this.AnimationComponent.IdleAnimation)
        }

    }
}