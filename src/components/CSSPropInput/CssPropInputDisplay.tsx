import React, { useMemo, useCallback } from 'react';
import { camelToKebab } from '@/utils/camelToKebab';

export interface CssPropInputDisplayProps {
  prop: string;
  editable?: boolean;
  onEdit: () => void;
}

const CssPropInputDisplay: React.FC<CssPropInputDisplayProps> = ({ prop, editable, onEdit }) => {
  const pureCssProperty = useMemo(() => {
    if (prop.startsWith('--')) return prop;
    return camelToKebab(prop);
  }, [prop]);
  const handleEdit = useCallback(() => {
    if (editable) onEdit();
  }, [editable, onEdit]);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (editable && (e.key === 'Enter' || e.key === ' ')) onEdit();
    },
    [editable, onEdit],
  );
  return (
    <span
      className={'text-blue-700 flex-1 pointer'}
      tabIndex={0}
      onClick={editable ? handleEdit : undefined}
      onKeyDown={handleKeyDown}
    >
      {pureCssProperty}
    </span>
  );
};

export default React.memo(CssPropInputDisplay); 