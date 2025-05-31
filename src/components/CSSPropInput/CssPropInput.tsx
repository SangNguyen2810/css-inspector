import { camelToKebab } from '@/utils/camelToKebab';
import { kebabToCamel } from '@/utils/kebabToCamel';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import CssPropInputEdit from './CssPropInputEdit';
import CssPropInputDisplay from './CssPropInputDisplay';

interface CssPropInputProps {
  prop: string;
  editable?: boolean;
  onCommit: (newProp: string) => void;
}

export const CssPropInput: React.FC<CssPropInputProps> = ({ prop, editable, onCommit }) => {
  const [localProp, setLocalProp] = useState(() => {
    if (prop.startsWith('--')) return prop;
    return camelToKebab(prop);
  });
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prop.startsWith('--')) setLocalProp(prop);
    else setLocalProp(camelToKebab(prop));
  }, [prop]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (localProp !== (prop.startsWith('--') ? prop : camelToKebab(prop))) {
      if (localProp.startsWith('--')) onCommit(localProp);
      else onCommit(kebabToCamel(localProp));
    }
  }, [localProp, prop, onCommit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  const handleEdit = useCallback(() => setIsEditing(true), []);

  if (!editable) {
    return <CssPropInputDisplay prop={prop} editable={false} onEdit={() => {}} />;
  }

  return isEditing ? (
    <CssPropInputEdit
      localProp={localProp}
      setLocalProp={setLocalProp}
      inputRef={inputRef}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
    />
  ) : (
    <CssPropInputDisplay prop={prop} editable={editable} onEdit={handleEdit} />
  );
};

const MemoizedCssPropInput = React.memo(CssPropInput);

export default MemoizedCssPropInput;
