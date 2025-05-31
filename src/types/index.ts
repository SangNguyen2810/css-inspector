export type NodeType = 'Div' | 'Input' | 'Image' | 'Button';

export interface Node {
  id: string;
  x: number; 
  y: number; 
  name: string; 
  type: NodeType;
  width: number; 
  height: number; 
  styles?: Record<string, string>;
  classNames?: string[];
  ids?: string[];
  display?: string; 
  value?: string; 
  backgroundColor?: string; 
  color?: string; 
  border?: string; 
  children: Node[];
}