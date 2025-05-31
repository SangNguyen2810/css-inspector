import { camelToKebab } from './camelToKebab';

export function isValidCssProperty(prop: string): boolean {
  if (prop.startsWith('--')) return true;
  return (
    CSS.supports(prop, 'initial') ||
    CSS.supports(camelToKebab(prop), 'initial')
  );
} 