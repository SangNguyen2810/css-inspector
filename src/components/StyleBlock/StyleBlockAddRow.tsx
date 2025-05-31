import React from 'react';

export interface StyleBlockAddRowProps {
  newProp: string;
  setNewProp: (v: string) => void;
  newValue: string;
  setNewValue: (v: string) => void;
  handleAdd: () => void;
}

const StyleBlockAddRow: React.FC<StyleBlockAddRowProps> = ({ newProp, setNewProp, newValue, setNewValue, handleAdd }) => (
  <section className="grid grid-cols-2 gap-x-2 items-center bg-gray-50 rounded mt-1 px-2 py-2">
    <section className="flex items-center">
      <input
        className="truncate text-blue-700 bg-transparent outline-none px-1 py-0.5 flex-1"
        value={newProp}
        spellCheck={false}
        placeholder="property"
        onChange={e => setNewProp(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') handleAdd();
        }}
      />
      <span className="mx-1 text-gray-400 select-none">:</span>
    </section>
    <section className="flex items-center">
      <input
        className="truncate text-gray-800 bg-transparent outline-none px-1 py-0.5 flex-1"
        value={newValue}
        spellCheck={false}
        placeholder="value"
        onChange={e => setNewValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') handleAdd();
        }}
      />
      <button
        className="ml-1 text-green-700 text-lg px-1 py-0.5 rounded hover:bg-green-100 transition-colors"
        type="button"
        title="Add property"
        onClick={handleAdd}
        disabled={!newProp.trim()}
      >
        +
      </button>
    </section>
  </section>
);

export default React.memo(StyleBlockAddRow); 