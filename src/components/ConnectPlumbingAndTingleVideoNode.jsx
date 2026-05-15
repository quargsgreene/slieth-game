import React, { memo } from 'react';
import { useStore } from './useStore';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data, isConnectable }) => {
  const gameTree = useStore((state) => state.gameTree);
  const currentNodeIndex = useStore((state) => state.currentNodeIndex);
  const mkUrl = (u) => (u ? (u.startsWith('http') ? u : `http://${u}`) : null);

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        {gameTree?.nodes?.[currentNodeIndex]?.videoUrl && <video id="game-video" src={mkUrl(gameTree.nodes[currentNodeIndex].videoUrl)} controls />}
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
