import React, { useEffect, useCallback } from 'react';
import { Node } from '@/types';
import StyleBlock from '@/components/StyleBlock';
import './InspectorSidebar.css';

interface InspectorSidebarProps {
  node?: Node;
  onChange: (node: Node) => void;
  globalCss: Record<string, Record<string, string>>;
  setGlobalCss: React.Dispatch<React.SetStateAction<Record<string, Record<string, string>>>>;
}

export const InspectorSidebar: React.FC<InspectorSidebarProps> = ({
  node,
  onChange,
  globalCss,
}) => {
  useEffect(() => {
    let css = '';
    for (const selector in globalCss) {
      css += `${selector} {`;
      for (const [prop, value] of Object.entries(globalCss[selector])) {
        css += `${prop}: ${value};`;
      }
      css += '}\n';
    }
    let styleTag = document.getElementById('global-class-styles') as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'global-class-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
  }, [globalCss]);

  const handleInlineStyleChange = useCallback(
    (styles: Record<string, string>) => {
      if (!node) return;
      onChange({ ...node, styles });
    },
    [onChange, node],
  );

  if (!node) {
    return <span pt-2>Select a node to inspect</span>;
  }

  return (
    <aside className="bg-[#fff8e7] border-l border-[#e8e8e8] p-8 box-border overflow-y-auto grid gap-4 text-[15px] w-full">
      <article className="">
        <StyleBlock
          title="element.style"
          styles={node.styles || {}}
          onChange={handleInlineStyleChange}
          editable
        />
      </article>
    </aside>
  );
};

const MemoizedInspectorSidebar = React.memo(InspectorSidebar);

export default MemoizedInspectorSidebar;
