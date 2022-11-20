import { UnityEngine, System } from 'csharp'
import ComponentManager from './ComponentManager';

export default abstract class BaseComponent{
    protected abstract Awake():void;
    protected abstract Start():void;
    protected abstract Update():void;
    protected abstract FixedUpdate():void;
    protected abstract LateUpdate():void;
    protected abstract OnDestroy():void;
    public abstract OnEnable():void;
    public abstract OnDisEnable():void;
    
    public gameObject:UnityEngine.GameObject;
    public transform:UnityEngine.Transform;
    public _active:boolean;

    public SetActive(active:boolean){
        let lastActive = this.gameObject.activeSelf;
        this.gameObject.SetActive(active)
        this._active = active;
        if(!lastActive && active){
            this.OnEnable();
        }
        if(lastActive && !active){
            this.OnDisEnable();
        }
    }
    
    private awaked:boolean;
    private started:boolean;
    public LogicUpdate(deltaTime:number){
        if (!this.started && this._active) {
            this.Start();
            this.started = true;
        }
        if (this._active) {
            this.Update()
        }
    }

    public LogicFixedUpdate(){
        if (this.started && this._active) {
            this.FixedUpdate()
        }
    }

    public LogicLateUpdate(){
        if (this.started && this._active) {
            this.LateUpdate()
        }
    }

    public LogicAwake(){
        this.Awake()
    }

    protected Destroy(){
        ComponentManager.RemoveComponentFromUpdateList(this);
        ComponentManager.RemoveComponentFromComDic(this.gameObject, this);
        this.OnDestroy();
    }

    protected static DestroyImmediate(gameObject:UnityEngine.GameObject){
        UnityEngine.Object.DestroyImmediate(gameObject);
        let list = ComponentManager.GetComponents(gameObject);
        for (let index = 0; index < list.length; index++) {
            let element = list[index];
            element.OnDestroy();
        }
        ComponentManager.RemoveComponentByGameObject(gameObject)
    }
}