import React, { useState, useCallback } from 'react';
import { Node } from '@/types';

interface Props {
  node: Node | undefined;
  onChange: (newNode: Node) => void;
}

const CSSInspector: React.FC<Props> =(({ node, onChange }) => {
  const [localNode, setLocalNode] = useState<Node | null>(node ?? null);

  React.useEffect(() => {
    setLocalNode(node ?? null);
  }, [node]);

  const handleStyleChange = useCallback((prop: keyof React.CSSProperties, value: string) => {
    if (!localNode) return;
    const updated = {
      ...localNode,
      [prop]: value,
    };
    setLocalNode(updated);
    onChange(updated);
  }, [localNode, onChange]);

  if (!localNode) return <div>Select a node to inspect</div>;

  return (
    <section className="inspector">
      <h2>Inspector: {localNode.name}</h2>
      {['backgroundColor', 'color', 'border', 'display'].map((prop) => (
        <section key={prop}>
          <label>{prop}</label>
          <input
            value={localNode[prop as keyof Node] as string || ''}
            onChange={(e) => handleStyleChange(prop as keyof React.CSSProperties, e.target.value)}
          />
        </section>
      ))}
    </section>
  );
});

const MemoizedCSSInspector = React.memo(CSSInspector);

export default MemoizedCSSInspector;