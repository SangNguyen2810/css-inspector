import React, { useMemo, useCallback } from 'react';
import { Node } from '@/types';
import { SELECTED_STYLE } from '@/constants';
import { kebabToCamel } from '@/utils/kebabToCamel';

interface NodeRendererProps {
  node: Node;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

interface CommonProps {
  style: React.CSSProperties;
  className?: string;
  onClick: () => void;
}

interface NodeConfig {
  element: keyof React.JSX.IntrinsicElements;
  getProps: (node: Node, commonProps: CommonProps) => React.HTMLAttributes<HTMLElement>;
}

const nodeConfigs: Record<string, NodeConfig> = {
  Div: {
    element: 'div',
    getProps: (node, commonProps) => ({
      ...commonProps,
      children: node.name,
    }),
  },
  Input: {
    element: 'input',
    getProps: (node, commonProps) => ({
      ...commonProps,
      value: node.value,
      readOnly: true,
    }),
  },
  Image: {
    element: 'img',
    getProps: (node, commonProps) => ({
      ...commonProps,
      src: node.value,
    }),
  },
  Button: {
    element: 'button',
    getProps: (node, commonProps) => ({
      ...commonProps,
      children: node.name,
    }),
  },
};

const createNodeElement = (node: Node, commonProps: CommonProps): React.ReactElement => {
  const config = nodeConfigs[node.type];
  if (!config) {
    throw new Error(`Unsupported node type: ${node.type}`);
  }

  return React.createElement(config.element, config.getProps(node, commonProps));
};

export const NodeRenderer: React.FC<NodeRendererProps> = ({ node, selectedId, onSelect }) => {
  const isSelected = selectedId === node.id;

  const commonStyle = useMemo(() => {
    const styles = {
      position: 'absolute',
      top: node.y,
      left: node.x,
      width: node.width,
      height: node.height,
      ...node.styles,
      ...(isSelected ? SELECTED_STYLE : {}),
    };

    const camelStyles = Object.fromEntries(
      Object.entries(styles).map(([key, value]) => [kebabToCamel(key), value])
    );

    return camelStyles;
  }, [node, isSelected]);

  const handleClick = useCallback(() => {
    onSelect(node.id);
  }, [node.id, onSelect]);

  const className = node.classNames?.length ? node.classNames.join(' ') : undefined;

  const commonProps: CommonProps = {
    style: commonStyle,
    className,
    onClick: handleClick,
  };

  return createNodeElement(node, commonProps);
};

const MemoizedNodeRenderer = React.memo(NodeRenderer);

export default MemoizedNodeRenderer;
