#if  UNITY_EDITOR
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using UnityEditor;

//���ߣ���������С��
//���ӣ�https://zhuanlan.zhihu.com/p/439735583
//��Դ��֪��

namespace EGamePlay
{
    [CustomEditor(typeof(BezierComponent))]
    public class BezierComponentInspector : Editor
    {
        //��������Beizer�߶ε�ʱ��Ҫ��
        private Vector3 lastPosition;
        private Vector3 lastOutTangent;
        //���ڲ����ĸ����Ƶ�
        int pickedIndex = -1;
        //���ڲ������Ƶ����һ����
        enum CtrlPointPickedType
        {
            position,
            inTangent,
            outTangent
        }

        CtrlPointPickedType pickedType = CtrlPointPickedType.position;

        private void OnSceneGUI()
        {
            BezierComponent bezierComponent = target as BezierComponent;
            if (bezierComponent.ctrlPoints == null)
            {
                return;
            }
            //�����϶������Ĳ���
            //��Խ��
            if (pickedIndex >= bezierComponent.ctrlPoints.Count)
            {
                pickedIndex = -1;
            }
            if (pickedIndex != -1)
            {
                //�õ����ڲ����Ŀ��Ƶ�
                CtrlPoint pickedCtrlPoint = bezierComponent.ctrlPoints[pickedIndex];
                //�ǵ�ֻ�ܱ༭λ�ò��ܱ༭Tangent
                if (pickedCtrlPoint.type == BezierPointType.corner) pickedType = CtrlPointPickedType.position;
                if (pickedType == CtrlPointPickedType.position)
                {
                    //ʹ��PositionHandle��������λ��
                    Vector3 newPosition = Handles.PositionHandle(pickedCtrlPoint.position, Quaternion.identity);
                    pickedCtrlPoint.position = newPosition;
                }
                else if (pickedType == CtrlPointPickedType.inTangent)
                {
                    //ʹ��PositionHandle����InTangent
                    Vector3 position = pickedCtrlPoint.position;
                    Vector3 newInTangent = Handles.PositionHandle(pickedCtrlPoint.InTangent + position, Quaternion.identity) - position;
                    pickedCtrlPoint.InTangent = newInTangent;
                }
                else if (pickedType == CtrlPointPickedType.outTangent)
                {
                    //����һ�����
                    Vector3 position = pickedCtrlPoint.position;
                    Vector3 newOutTangent = Handles.PositionHandle(pickedCtrlPoint.OutTangent + position, Quaternion.identity) - position;
                    pickedCtrlPoint.OutTangent = newOutTangent;
                }
            }


            for (int i = 0; i < bezierComponent.ctrlPoints.Count; i++)
            {
                //һ�����ذѿ��Ƶ���Ⱦ����
                CtrlPoint ctrlPoint = bezierComponent.ctrlPoints[i];
                BezierPointType type = ctrlPoint.type;
                Vector3 position = ctrlPoint.position;
                Vector3 inTangentPoint = ctrlPoint.InTangent + position;
                Vector3 outTangentPoint = ctrlPoint.OutTangent + position;
                bool button_picked = Handles.Button(position, Quaternion.identity, 0.1f, 0.1f, Handles.CubeHandleCap);
                if (button_picked)
                {
                    //ֻҪ����������Ƶ㣬����ѡ��������һ֡PositionHandle�������������
                    pickedIndex = i;
                    pickedType = CtrlPointPickedType.position;
                    //to-do:
                }

                if (type != BezierPointType.corner)
                {
                    //��InTangent
                    Handles.DrawLine(position, inTangentPoint);
                    bool in_tangent_picked = Handles.Button(inTangentPoint, Quaternion.identity, 0.1f, 0.1f, Handles.SphereHandleCap);
                    if (in_tangent_picked)
                    {
                        pickedIndex = i;
                        pickedType = CtrlPointPickedType.inTangent;
                        //to-do:
                    }
                    //��OutTangent
                    Handles.DrawLine(position, outTangentPoint);
                    bool out_tangent_picked = Handles.Button(outTangentPoint, Quaternion.identity, 0.1f, 0.1f, Handles.SphereHandleCap);
                    if (out_tangent_picked)
                    {
                        pickedIndex = i;
                        pickedType = CtrlPointPickedType.outTangent;
                        //to_do:
                    }
                }
                ////�ӵڶ������Ƶ㿪ʼ��Bezier�߶�
                //if (i > 0)
                //{
                //    Handles.DrawBezier(lastPosition, position, lastOutTangent, inTangentPoint, Color.green, null, 2f);
                //}
                ////����ÿ�����ݴ��¿��Ƶ�λ�ú�OutTangent��������һ�����Ƶ㻭����
                //lastPosition = position;
                //lastOutTangent = outTangentPoint;
            }
        }
    }
}
#endif