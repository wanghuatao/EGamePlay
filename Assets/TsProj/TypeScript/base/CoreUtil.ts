import Component = CS.UnityEngine.Component;
import GameObject = CS.UnityEngine.GameObject;

/**
 * 获取cs对象身上的MonoBehaviour组件
 * @param go
 * @param t MonoBehaviour
 * @constructor
 */
export function GetComponent<T extends Component>(go: GameObject, t: { new(): T }) {
    return go.GetComponent(puerts.$typeof(t)) as T
}


/**
 * 返回cs对象或者子对象身上的MonoBehaviour组件
 * @param go
 * @param t MonoBehaviour
 * @constructor
 */
export function GetComponentInChildren<T extends Component>(go: GameObject, t: { new(): T }) {
    return go.GetComponentInChildren(puerts.$typeof(t)) as T
}

/**
 * 实例化
 * @param go
 * @constructor
 */
export function Instantiate(go: GameObject|CS.UnityEngine.Object) {
    return GameObject.Instantiate(go) as GameObject
}



export function Destroy(go: GameObject) {
    GameObject.Destroy(go)
}