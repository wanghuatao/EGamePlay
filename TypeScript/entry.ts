import { JSGameManager } from "./JSGameManager";
import { JSBallBehaviour } from "./JSBallBehaviour";
import TestJsBehavior from "./TestJsBehavior";

function makeFactory(cls: any) {
    return function (...args: any[]) {
        return new cls(...args);
    }
}

console.log("eehello worldeedddd!");


const JSBallBehaviourFactory = makeFactory(JSBallBehaviour)
const JSGameManagerFactory = makeFactory(JSGameManager)
const TestJsBehaviorFactory = makeFactory(TestJsBehavior)
export {
    JSBallBehaviourFactory as JSBallBehaviour,
    JSGameManagerFactory as JSGameManager,
    TestJsBehaviorFactory as TestJsBehavior
}