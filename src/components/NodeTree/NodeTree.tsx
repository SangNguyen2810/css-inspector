import React, { useCallback } from 'react';
import { Node } from '@/types';
import NodeRenderer from '@/components/NodeRenderer';

interface Props {
  nodes: Node[];
  onSelect: (nodeId: string) => void;
  selectedId: string | null;
}

const renderNode = (node: Node, onSelect: (nodeId: string) => void, selectedId: string | null) => {
  return (
    <React.Fragment key={node.id}>
      <NodeRenderer node={node} onSelect={onSelect} selectedId={selectedId} />
      {node.children && node.children.length > 0 && (
        <section style={{ position: 'relative' }}>
          {node.children.map((child) => renderNode(child, onSelect, selectedId))}
        </section>
      )}
    </React.Fragment>
  );
};

export const NodeTree: React.FC<Props> = ({ nodes, onSelect, selectedId }) => {
  const renderNodeCb = useCallback(renderNode, []);
  return (
    <article className='grid grid-cols-2 gap-4' style={{ position: 'relative' }}>
      {nodes.map((node) => renderNodeCb(node, onSelect, selectedId))}
    </article>
  );
};

const MemoizedNodeTree = React.memo(NodeTree);

export default MemoizedNodeTree;
