import { camelToKebab } from '@/utils/camelToKebab';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

interface CssPropInputProps {
  prop: string;
  editable?: boolean;
  onCommit: (newProp: string) => void;
}

const CssPropInputDisplay: React.FC<{
  prop: string;
  editable?: boolean;
  onEdit: () => void;
}> = ({ prop, editable, onEdit }) => {
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

const MemoizedCssPropInputDisplay = React.memo(CssPropInputDisplay);

const CssPropInputEdit: React.FC<{
  localProp: string;
  setLocalProp: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleBlur: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ localProp, setLocalProp, inputRef, handleBlur, handleKeyDown }) => (
  <input
    ref={inputRef}
    className="text-blue-700 flex-1"
    value={localProp}
    spellCheck={false}
    onChange={(e) => setLocalProp(e.target.value)}
    onBlur={handleBlur}
    onKeyDown={handleKeyDown}
  />
);

const MemoizedCssPropInputEdit = React.memo(CssPropInputEdit);

export const CssPropInput: React.FC<CssPropInputProps> = ({ prop, editable, onCommit }) => {
  const [localProp, setLocalProp] = useState(prop);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalProp(prop);
  }, [prop]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (localProp !== prop) {
      onCommit(localProp);
    }
  }, [localProp, prop, onCommit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  const handleEdit = useCallback(() => setIsEditing(true), []);

  if (!editable) {
    return <MemoizedCssPropInputDisplay prop={prop} editable={false} onEdit={() => {}} />;
  }

  return isEditing ? (
    <MemoizedCssPropInputEdit
      localProp={localProp}
      setLocalProp={setLocalProp}
      inputRef={inputRef}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
    />
  ) : (
    <MemoizedCssPropInputDisplay prop={prop} editable={editable} onEdit={handleEdit} />
  );
};

const MemoizedCssPropInput = React.memo(CssPropInput);

export default MemoizedCssPropInput;
