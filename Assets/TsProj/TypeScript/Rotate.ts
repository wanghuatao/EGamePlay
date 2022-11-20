// const speed = 10;

// export default class Rotate {
//     private bindTo=null;
//     constructor(bindTo) {
//         this.bindTo = bindTo;
//         this.bindTo.JsUpdate = () => this.onUpdate();
//         this.bindTo.JsOnDestroy = () => this.onDestroy();
//     }
    
//     onUpdate() {
//         //js不支持操作符重载所以Vector3的乘这么用
//         let r = CS.UnityEngine.Vector3.op_Multiply(CS.UnityEngine.Vector3.up, CS.UnityEngine.Time.deltaTime * speed);
//         this.bindTo.transform.Rotate(r);

//     }
    
//     onDestroy() {
//         console.log('onDestroy...');
//     }
// }

// exports.init = function(bindTo) {
//     new Rotate(bindTo);
//     console.log('init')
// }
