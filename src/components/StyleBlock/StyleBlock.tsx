import React, { useState, useEffect, useCallback } from 'react';
import StyleBlockPropertyRow from './StyleBlockPropertyRow';
import StyleBlockAddRow from './StyleBlockAddRow';

interface StyleBlockProps {
  title: string;
  styles: Record<string, string>;
  onChange?: (styles: Record<string, string>) => void;
  editable?: boolean;
}

const StyleBlock: React.FC<StyleBlockProps> = ({
  title,
  styles: styleObj,
  onChange,
  editable,
}) => {
  const [newProp, setNewProp] = useState('');
  const [newValue, setNewValue] = useState('');

  const styleKeys = Object.keys(styleObj).join();
  useEffect(() => {
    setNewProp('');
    setNewValue('');
  }, [styleKeys]);

  const handleRemove = useCallback((prop: string) => {
    if (!onChange) return;
    const rest = Object.fromEntries(Object.entries(styleObj).filter(([k]) => k !== prop));
    onChange(rest);
  }, [onChange, styleObj]);

  const handlePropChange = useCallback((oldProp: string, newPropName: string) => {
    if (!onChange) return;
    const val = styleObj[oldProp];
    const rest = Object.fromEntries(Object.entries(styleObj).filter(([k]) => k !== oldProp));
    onChange({ ...rest, [newPropName]: val });
  }, [onChange, styleObj]);

  const handleValueChange = useCallback((prop: string, newValue: string) => {
    if (!onChange) return;
    onChange({ ...styleObj, [prop]: newValue });
  }, [onChange, styleObj]);

  const handleAdd = useCallback(() => {
    if (!onChange || !newProp.trim()) return;
    onChange({ ...styleObj, [newProp]: newValue });
    setNewProp('');
    setNewValue('');
  }, [onChange, styleObj, newProp, newValue]);

  return (
    <article className="relative mt-10 bg-white rounded-lg shadow p-6 w-full group">
      <h3 className="font-mono text-lg font-semibold mb-3 text-gray-900">{title}</h3>
      <article className="grid gap-1 ">
        {Object.entries(styleObj).map(([prop, value]) => (
          <StyleBlockPropertyRow
            key={prop}
            prop={prop}
            value={value}
            editable={editable}
            onRemove={handleRemove}
            onPropChange={handlePropChange}
            onValueChange={handleValueChange}
          />
        ))}
        {editable && (
          <StyleBlockAddRow
            newProp={newProp}
            setNewProp={setNewProp}
            newValue={newValue}
            setNewValue={setNewValue}
            handleAdd={handleAdd}
          />
        )}
      </article>
    </article>
  );
};

export default React.memo(StyleBlock);