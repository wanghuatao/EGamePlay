import BaseComponent from "./BaseComponent";

export default class TestCom1 extends BaseComponent{
    protected Awake(): void {
        console.log("Method not implemented.");
    }
    protected Start(): void {
    }
    protected Update(): void {
        // console.log("Method not implemented.");
    }
    protected FixedUpdate(): void {
        
        console.log("Method not implemented.");
    }
    protected LateUpdate(): void {
        console.log("Method not implemented.");
    }
    protected OnDestroy(): void {
        console.log("Method not implemented.");
    }
    public OnEnable(): void {
        console.log("Method not implemented.");
    }
    public OnDisEnable(): void {
        console.log("Method not implemented.");
    }

}