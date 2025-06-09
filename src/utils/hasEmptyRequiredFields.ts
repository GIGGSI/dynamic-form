import type { FormSchema } from '../types/form';
import { isFieldEmpty } from './isFieldEmpty';

function hasValidation(field: any): field is { validation?: any } {
  return 'validation' in field;
}

export default function hasEmptyRequiredFields(
  schema: FormSchema,
  values: Record<string, any>
): boolean {
  return schema.fields.some((field) => {
    const isVisible = !field.visibleIf || values[field.visibleIf.field] === field.visibleIf.equals;
    if (!isVisible) return false;

    const value = values[field.name];

    if (field.type === 'group') {
      const groupValues = value || {};
      return hasEmptyRequiredFields({ fields: field.fields }, groupValues);
    }

    if (hasValidation(field)) {
      const dependsOn = field.validation?.dependsOn;
      if (dependsOn) {
        const depField = dependsOn.field;
        const depValue = values[depField];
        const rule = dependsOn.rules?.[depValue];

        if (rule?.required && (value === '' || value === undefined || value === null)) {
          return true;
        }

        if (rule?.pattern) {
          const regex = new RegExp(rule.pattern);
          if (value && !regex.test(value)) {
            return true;
          }
        }
      }

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
}
