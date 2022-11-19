import { UnityEngine, System } from 'csharp'
import BaseComponent from './BaseComponent';

export default class ComponentManager{

    private static activeList:Array<BaseComponent>;
    private static allComponentDic:Map<UnityEngine.GameObject, Array<BaseComponent>>;
    
    public static Init(bindTo:any){
        this.activeList = new Array<BaseComponent>();
        this.allComponentDic = new Map<UnityEngine.GameObject, Array<BaseComponent>>();

        bindTo.JsUpdate = () => ComponentManager.Update();
    }

    public static Update(){
        for (let index = 0; index < this.activeList.length; index++) {
            const element = this.activeList[index];
            element.LogicUpdate(UnityEngine.Time.deltaTime);
        }
    }

    public static FixedUpdate(){
        for (let index = 0; index < this.activeList.length; index++) {
            const element = this.activeList[index];
            element.LogicFixedUpdate();
        }
    }

    public static LateUpdate(){
        for (let index = 0; index < this.activeList.length; index++) {
            const element = this.activeList[index];
            element.LogicLateUpdate();
        }
    }

    private static AddComponentToUpdateList(com:BaseComponent){
        this.activeList.push(com);
    }

    public static RemoveComponentFromUpdateList(com:BaseComponent){
        let index = this.activeList.indexOf(com);
        this.activeList.splice(index, 1);
    }

    private static AddComponentToComDic(go:UnityEngine.GameObject, com:BaseComponent){
        let list = this.allComponentDic.get(go);
        if (list == null) {
            list = new Array<BaseComponent>();
            this.allComponentDic.set(go, list);
        }
        list.push(com);
    }

    public static RemoveComponentFromComDic(go:UnityEngine.GameObject, com:BaseComponent){
        let list = this.allComponentDic.get(go);
        let index = list.indexOf(com);
        list.splice(index, 1);
    }

    public static RemoveComponentByGameObject(go:UnityEngine.GameObject){
        let list = this.allComponentDic.get(go);
        if (list == null) {
            return;
        } 
        for (let index = 0; index < list.length; index++) {
            let element = list[index];
            this.RemoveComponentFromUpdateList(element);
        }
        this.allComponentDic.delete(go);
    }

    public static AddComponent<T extends BaseComponent>(go:UnityEngine.GameObject, com: { new (): T }):T{
        let component = new com();
        component.gameObject = go;
        component.transform = go.transform;
        this.AddComponentToUpdateList(component);
        this.AddComponentToComDic(go, component);
        component.LogicAwake();
        component._active = go.activeSelf
        if (go.activeSelf) {
            component.OnEnable();
        } else {
            component.OnDisEnable();
        }
        return component;
    }

    public static GetComponent(go:UnityEngine.GameObject):BaseComponent{
        let list = this.allComponentDic.get(go);
        if (list == null) {
            return null;
        } else {
            return list.pop();
        }
    }

    public static GetComponents(go:UnityEngine.GameObject):BaseComponent[]{
        let list = this.allComponentDic.get(go);
        return list;
    }
}