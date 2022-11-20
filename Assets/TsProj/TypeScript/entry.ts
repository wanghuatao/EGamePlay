import {JSGameManager} from "./JSGameManager";
import {JSBallBehaviour} from "./JSBallBehaviour";
import TestJsBehavior from "./TestJsBehavior";
import MonsterLogic from "./MonserLogic";

function makeFactory(cls: any) {
    return function (...args: any[]) {
        return new cls(...args);
    }
}

console.log("eehello worldeedddd!");

const JSBallBehaviourFactory = makeFactory(JSBallBehaviour)
const JSGameManagerFactory = makeFactory(JSGameManager)
const TestJsBehaviorFactory = makeFactory(TestJsBehavior)
const MonsterLogicFactory = makeFactory(MonsterLogic)
export {
    JSBallBehaviourFactory as JSBallBehaviour,
    JSGameManagerFactory as JSGameManager,
    TestJsBehaviorFactory as TestJsBehavior,
    MonsterLogicFactory as MonsterLogic
}