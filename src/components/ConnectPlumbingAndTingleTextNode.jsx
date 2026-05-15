import React, { memo } from 'react';
import { useStore } from './useStore';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data, isConnectable }) => {
  const gameTree = useStore((state) => state.gameTree);
  const currentNodeIndex = useStore((state) => state.currentNodeIndex);
  const mkUrl = (u) => (u ? (u.startsWith('http') ? u : `http://${u}`) : null);
  const interoceptiveTopics = ['coLon', 'amygdala', 'hot flash', 'heart', 'DARM', 'menstruation', 'epididymal hypertension', 'dyspepsia',
    'HErZ', 'MITTeLSCHMERZ', 'opiods', 'sNRI', 'MaoI', 'Lungenentzündung', 'antibabypille', 'adenOsine', 'sCHADENFREUDe', 'dePerSonAliZatIon', 'ORGASMUS', 'FRÖLICH', 'BluSh', 'OrDiNaL LiNguIsTiC PeRsOnIfIcaTiOn',
    'ÜBELKEIT', 'fERNWEH', 'ssri', 'ayahuasca',  'Sleep Paralysis', 'diphenhydramin', 'PSILOCIN', 'psilocybin', 'hypothermia', 'DErEAlIZaTIoN', 'thirsT', 'MAGEN', 'phantom limbs', 'mIrOr ToUcH'
  ];

  const randomTopic = interoceptiveTopics[Math.floor(Math.random() * interoceptiveTopics.length)];

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        {randomTopic}
      </div>
      <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
});
