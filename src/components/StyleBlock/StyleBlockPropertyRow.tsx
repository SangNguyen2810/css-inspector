import React, { useCallback } from 'react';
import CssPropInput from '@/components/CSSPropInput';
import CssValueInput from '@/components/CSSValueInput';
import { isValidCssProperty } from '@/utils/isValidCssProperty';

export interface StyleBlockPropertyRowProps {
  prop: string;
  value: string;
  editable?: boolean;
  onRemove: (prop: string) => void;
  onPropChange?: (oldProp: string, newProp: string) => void;
  onValueChange?: (prop: string, newValue: string) => void;
}

const StyleBlockPropertyRow: React.FC<StyleBlockPropertyRowProps> = ({
  prop,
  value,
  editable,
  onRemove,
  onPropChange,
  onValueChange,
}) => {
  const isValid = isValidCssProperty(prop);

  const handlePropChange = useCallback(
    (newPropName: string) => {
      if (newPropName !== prop && onPropChange) {
        onPropChange(prop, newPropName);
      }
    },
    [onPropChange, prop],
  );
  const handleValueChange = useCallback(
    (newValue: string) => {
      if (newValue !== value && onValueChange) {
        onValueChange(prop, newValue);
      }
    },
    [onValueChange, prop, value],
  );

  if (!isValid) {
    return (
      <section
        className="grid grid-cols-2 gap-x-2 bg-red-50 rounded px-2 py-2 mb-1 transition-colors hover:bg-red-100 items-center"
        key={prop}
      >
        <section className="flex items-center">
          <span className="text-red-500 line-through font-mono flex items-center">
            <span className="mr-1" title="Invalid CSS property">
              ⚠️
            </span>
            {prop}
          </span>
        </section>

      </section>
    );
  }

  return (
    <section
      className="grid grid-cols-2 gap-x-2 bg-gray-100 rounded px-2 py-2 mb-1 transition-colors hover:bg-gray-200 "
      key={prop}
    >
      <section className="flex gap-x-2 items-center">
        {editable && (
          <button
            className="text-red-600 text-lg px-1 py-0.5 rounded hover:bg-red-200 transition-colors"
            type="button"
            title="Remove property"
            onClick={() => onRemove(prop)}
          >
            ×
          </button>
        )}
        <CssPropInput prop={prop} editable={editable} onCommit={handlePropChange} />
        <span className="mx-1 text-gray-400 select-none">:</span>
      </section>
      <section className="flex items-center">
        <CssValueInput value={value} editable={editable} onCommit={handleValueChange} />
      </section>
    </section>
  );
};

export default React.memo(StyleBlockPropertyRow);
