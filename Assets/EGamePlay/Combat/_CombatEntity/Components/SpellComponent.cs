﻿using System.Collections.Generic;
using UnityEngine;
using GameUtils;

namespace EGamePlay.Combat
{
    /// <summary>
    /// 技能施法组件
    /// </summary>
    public class SpellComponent : EGamePlay.Component
    {
        private CombatEntity CombatEntity => GetEntity<CombatEntity>();
        public override bool DefaultEnable { get; set; } = true;
        public Dictionary<int, ExecutionObject> ExecutionObjects = new Dictionary<int, ExecutionObject>();


        public override void Awake()
        {

        }

        public void LoadExecutionObjects()
        {
            foreach (var item in CombatEntity.IdSkills)
            {
                var executionObj = AssetUtils.Load<ExecutionObject>($"Execution_{item.Key}");
                if (executionObj != null)
                {
                    ExecutionObjects.Add(item.Key, executionObj);
                }
            }
        }

        public void SpellWithTarget(SkillAbility spellSkill, CombatEntity targetEntity)
        {
            if (CombatEntity.SpellingExecution != null)
                return;

            if (CombatEntity.SpellAbility.TryMakeAction(out var spellAction))
            {
                spellAction.SkillAbility = spellSkill;
                spellAction.InputTarget = targetEntity;
                spellAction.InputPoint = targetEntity.Position;
                spellSkill.OwnerEntity.Rotation = Quaternion.LookRotation(targetEntity.Position - spellSkill.OwnerEntity.Position);
                spellAction.InputDirection = spellSkill.OwnerEntity.Rotation.eulerAngles.y;
                spellAction.SpellSkill();
            }
        }

        public void SpellWithPoint(SkillAbility spellSkill, Vector3 point)
        {
            if (CombatEntity.SpellingExecution != null)
                return;

            if (CombatEntity.SpellAbility.TryMakeAction(out var spellAction))
            {
                spellAction.SkillAbility = spellSkill;
                spellAction.InputPoint = point;
                spellSkill.OwnerEntity.Rotation = Quaternion.LookRotation(point - spellSkill.OwnerEntity.Position);
                spellAction.InputDirection = spellSkill.OwnerEntity.Rotation.eulerAngles.y;
                spellAction.SpellSkill();
            }
        }

        //public void SpellWithDirect(SkillAbility spellSkill, float direction, Vector3 point)
        //{
        //    if (CombatEntity.SpellingExecution != null)
        //        return;

        //    if (CombatEntity.SpellAbility.TryMakeAction(out var spellAction))
        //    {
        //        spellAction.SkillAbility = spellSkill;
        //        spellAction.InputPoint = point;
        //        spellSkill.OwnerEntity.Rotation = Quaternion.LookRotation(point - spellSkill.OwnerEntity.Position);
        //        spellAction.InputDirection = spellSkill.OwnerEntity.Rotation.eulerAngles.y;
        //        spellAction.SpellSkill();
        //    }
        //}
    }
}