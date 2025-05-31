import React from 'react';

export interface CssPropInputEditProps {
  localProp: string;
  setLocalProp: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleBlur: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CssPropInputEdit: React.FC<CssPropInputEditProps> = ({ localProp, setLocalProp, inputRef, handleBlur, handleKeyDown }) => (
  <input
    ref={inputRef}
    className="text-blue-700 flex-1"
    value={localProp}
    spellCheck={false}
    onChange={e => setLocalProp(e.target.value)}
    onBlur={handleBlur}
    onKeyDown={handleKeyDown}
  />
);

export default React.memo(CssPropInputEdit); 