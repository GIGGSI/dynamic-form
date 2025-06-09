import type { FormSchema } from '../types/form';
import { isFieldEmpty } from './isFieldEmpty';

function hasValidation(field: any): field is { validation?: any } {
  return 'validation' in field;
}

export const hasValidationErrors = (
  schema: FormSchema,
  values: Record<string, any>
): boolean => {
  return schema.fields.some((field) => {
    const isVisible = !field.visibleIf || values[field.visibleIf.field] === field.visibleIf.equals;
    if (!isVisible) return false;

    const value = values[field.name];

    if (field.type === 'group') {
      const groupValues = value || {};
      return hasValidationErrors({ fields: field.fields }, groupValues);
    }

    if (hasValidation(field)) {
      if (isFieldEmpty(field, value)) {
        return true;
      }

      if (field.validation?.pattern) {
        const regex = new RegExp(field.validation.pattern);
        if (value && !regex.test(value)) {
          return true;
        }
      }
    }

    return false;
  });
};
