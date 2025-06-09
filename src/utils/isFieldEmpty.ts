import type { Field } from '../types/form';

export function isFieldEmpty(field: Field, value: any): boolean {
  if (!('validation' in field)) return false;

  const isRequired = field.validation?.required ?? false;

  return isRequired && (value === undefined || value === '' || value === null);
}