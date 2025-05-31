import React, { useState, useEffect, useRef, useCallback } from 'react';

interface CssValueInputProps {
  value: string;
  editable?: boolean;
  onCommit: (newValue: string) => void;
}

export const CssValueInput: React.FC<CssValueInputProps> =({ value, editable, onCommit }) => {
  const [localValue, setLocalValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (localValue !== value) {
      onCommit(localValue);
    }
  }, [localValue, value, onCommit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  const handleEdit = useCallback(() => setIsEditing(true), []);

  if (!editable) {
    return <span className="css-inspector-value">{value}</span>;
  }

  return isEditing ? (
    <input
      ref={inputRef}
      className="flex-1"
      value={localValue}
      spellCheck={false}
      onChange={e => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      className="flex-1 pointer"
      tabIndex={0}
      onClick={handleEdit}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') handleEdit();
      }}
    >
      {value}
    </span>
  );
}; 

const MemoizedCssValueInput = React.memo(CssValueInput);

export default MemoizedCssValueInput;