using UnityEngine;
using UnityEngine.UI;
using EGamePlay.Combat;
using GameUtils;

namespace PuertsTest
{
    public class TestHero : MonoBehaviour
    {
        public CombatEntity CombatEntity;
        public AnimationComponent AnimationComponent;
        public float MoveSpeed = 1f;
        public float AnimTime = 0.05f;
        public GameTimer AnimTimer = new GameTimer(0.1f);
        public GameObject AttackPrefab;
        public GameObject SkillEffectPrefab;
        public GameObject HitEffectPrefab;
        public Transform InventoryPanelTrm;
        public Transform EquipmentPanelTrm;
        public Transform SkillSlotsTrm;
        public GameObject ItemPrefab;
        public Text DamageText;
        public Text CureText;
        public UnityEngine.UI.Image HealthBarImage;
        public Transform CanvasTrm;
    }
}