using GameUtils;

namespace EGamePlay.Combat
{
    /// <summary>
    /// 
    /// </summary>
    public partial class SkillAbility
    {
        public SkillExecutionData SkillExecutionData { get; set; }
        public ExecutionObject ExecutionObject { get; set; }


        public void Awake_Client()
        {
            LoadExecution();
        }

        public void LoadExecution()
        {
            ExecutionObject = AssetUtils.Load<ExecutionObject>($"Execution_{SkillConfig.Id}");
            if (ExecutionObject == null)
            {
                return;
            }
        }
    }
}
