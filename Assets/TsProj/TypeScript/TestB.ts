// import { JsMonoBehaviour, UnityEngine } from 'csharp';
// class TestB<T extends JsMonoBehaviour> {

//     Start(): void { }
//     Update(): void {
//         console.log('updatable')
//      }
//     OnTriggerEnter(other: UnityEngine.Collider): void { }

//     public _mb: T

//     constructor(mb: T) {
//         // mono.Js
//         this._mb = mb;
//         if (this.Start != TestB.prototype.Start) {
//             mb.JsStart = this.Start.bind(this);
//         }
//         if (this.Update != TestB.prototype.Update) {
//             mb.JsUpdate = this.Update.bind(this);
//         }
//         if (this.OnTriggerEnter != TestB.prototype.OnTriggerEnter) {
//             // mb.JsOnTriggerEnter = this.OnTriggerEnter.bind(this);
//         }
//     }
// }

// exports.init = function(bindTo) {
//     new TestB(bindTo);
// }