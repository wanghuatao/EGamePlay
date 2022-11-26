using DG.Tweening;

using System.Collections.Generic;
using UnityEngine;


namespace EGamePlay
{
    public enum BezierPointType
    {
        corner,
        smooth,
        bezierCorner,
    }

    [System.Serializable]
    public class CtrlPoint
    {
        public BezierPointType type;
        public Vector3 position;
        [SerializeField]
        Vector3 inTangent;
        [SerializeField]
        Vector3 outTangent;

        public Vector3 InTangent
        {
            get
            {
                if (type == BezierPointType.corner) return Vector3.zero;
                else return inTangent;
            }
            set
            {
                if (type != BezierPointType.corner) inTangent = value;
                if (value.sqrMagnitude > 0.001 && type == BezierPointType.smooth)
                {
                    outTangent = value.normalized * (-1) * outTangent.magnitude;
                }
            }
        }

        public Vector3 OutTangent
        {
            get
            {
                if (type == BezierPointType.corner) return Vector3.zero;
                if (type == BezierPointType.smooth)
                {
                    if (inTangent.sqrMagnitude > 0.001)
                    {
                        return inTangent.normalized * (-1) * outTangent.magnitude;
                    }
                }
                return outTangent;
            }
            set
            {
                if (type == BezierPointType.smooth)
                {
                    if (value.sqrMagnitude > 0.001)
                    {
                        inTangent = value.normalized * (-1) * inTangent.magnitude;
                    }
                    outTangent = value;
                }
                if (type == BezierPointType.bezierCorner) outTangent = value;
            }
        }
    }

    public class BezierComponent : MonoBehaviour
    {
        //[ShowInInspector]
        public List<CtrlPoint> ctrlPoints { get => CollisionExecuteData.Points; }
        public CollisionExecuteData CollisionExecuteData;

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

        float SegmentCount = 100;

        public float Progress;
        public void DOMove()
        {
            Progress = 0.1f;
            transform.DOMove(Evaluate(Progress), 0.3f).OnComplete(DOMoveNext);
        }

        public void DOMoveNext()
        {
            if (Progress >= 1f)
            {
                return;
            }
            Progress += 0.1f;
            transform.DOMove(Evaluate(Progress), 0.3f).OnComplete(DOMoveNext);
        }

        public Vector3 Evaluate(float t, int derivativeOrder = 0)
        {
            if (ctrlPoints.Count == 0) return transform.position;
            if (ctrlPoints.Count == 1) return ctrlPoints[0].position;
            t = Mathf.Clamp(t, 0, SegmentCount);
            int segment_index = (int)t;
            if (segment_index == SegmentCount) segment_index -= 1;
            Vector3[] p = new Vector3[4];
            p[0] = ctrlPoints[segment_index].position;
            p[1] = ctrlPoints[segment_index].OutTangent + p[0];
            p[3] = ctrlPoints[segment_index + 1].position;
            p[2] = ctrlPoints[segment_index + 1].InTangent + p[3];

            t = t - segment_index;
            float u = 1 - t;
            if (derivativeOrder < 0) derivativeOrder = 0;
            //ԭ����
            if (derivativeOrder == 0)
            {
                var v = p[0] * u * u * u + 3 * p[1] * u * u * t + 3 * p[2] * u * t * t + p[3] * t * t * t;
                //Debug.Log($"Evaluate {t} {v}");
                return v;
            }
            else if (derivativeOrder > 0)
            {
                Vector3[] q = new Vector3[3];
                q[0] = 3 * (p[1] - p[0]);
                q[1] = 3 * (p[2] - p[1]);
                q[2] = 3 * (p[3] - p[2]);
                //һ�׵�
                if (derivativeOrder == 1)
                {
                    return q[0] * u * u + 2 * q[1] * t * u + q[2] * t * t;
                }
                else if (derivativeOrder > 1)
                {
                    Vector3[] r = new Vector3[2];
                    r[0] = 2 * (q[1] - q[0]);
                    r[1] = 2 * (q[2] - q[1]);
                    //���׵�
                    if (derivativeOrder == 2)
                    {
                        return r[0] * u + r[1] * t;
                    }
                    else if (derivativeOrder > 2)
                    {
                        //���׵�
                        if (derivativeOrder == 3)
                        {
                            return r[1] - r[0];
                        }
                        //�����׵�
                        else if (derivativeOrder > 3)
                        {
                            return Vector3.zero;
                        }
                    }
                }
            }
            return Vector3.zero;
        }
        #if  UNITY_EDITOR
        private void OnDrawGizmos()
        {
            BezierComponent bezierComponent = this;
            if (bezierComponent.ctrlPoints == null)
            {
                return;
            }
            for (int i = 0; i < bezierComponent.ctrlPoints.Count; i++)
            {
                //һ�����ذѿ��Ƶ���Ⱦ����
                CtrlPoint ctrlPoint = bezierComponent.ctrlPoints[i];
                BezierPointType type = ctrlPoint.type;
                Vector3 position = ctrlPoint.position;
                Vector3 inTangentPoint = ctrlPoint.InTangent + position;
                Vector3 outTangentPoint = ctrlPoint.OutTangent + position;
                //�ӵڶ������Ƶ㿪ʼ��Bezier�߶�
                if (i > 0)
                {
                   UnityEditor.Handles.DrawBezier(lastPosition, position, lastOutTangent, inTangentPoint, Color.green, null, 2f);
                }
                //����ÿ�����ݴ��¿��Ƶ�λ�ú�OutTangent��������һ�����Ƶ㻭����
                lastPosition = position;
                lastOutTangent = outTangentPoint;
            }
        }
        #endif
    }
}
