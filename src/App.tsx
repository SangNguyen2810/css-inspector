import React, { useState } from 'react';
import { NodeTree } from '@/components/NodeTree/NodeTree';
import { Node } from '@/types';
import mockData from '../mockData.json';
import InspectorSidebar from '@/components/InspectorSidebar';

interface MockData {
  nodes: Node[];
  globalCss: Record<string, Record<string, string>>;
}

const typedMockData = mockData as unknown as MockData;
const initialNodes = typedMockData.nodes;
const initialGlobalCss = typedMockData.globalCss;

const App: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [globalCss, setGlobalCss] =
    useState<Record<string, Record<string, string>>>(initialGlobalCss);

  const findNodeById = (nodes: Node[], id: string): Node | undefined => {
    for (const node of nodes) {
      if (node.id === id) return node;
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
    return undefined;
  };

  const updateNode = (updated: Node, nodes: Node[]): Node[] =>
    nodes.map((node) => {
      if (node.id === updated.id) return updated;
      return { ...node, children: updateNode(updated, node.children) };
    });

  const selectedNode = selectedId ? findNodeById(nodes, selectedId) : undefined;

  return (
    <main className="grid grid-cols-2 h-screen bg-gray-100 gap-10">
      <NodeTree nodes={nodes} selectedId={selectedId} onSelect={(id) => setSelectedId(id)} />
      <InspectorSidebar
        node={selectedNode}
        onChange={(updatedNode) => setNodes((prev) => updateNode(updatedNode, prev))}
        globalCss={globalCss}
        setGlobalCss={setGlobalCss}
      />
    </main>
  );
};

export default App;
