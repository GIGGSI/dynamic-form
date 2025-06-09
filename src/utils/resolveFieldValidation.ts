import type { Field } from '../types/form';

export function resolveFieldValidation(
  field: Field,
  value: any,
  allValues: Record<string, any>,
  submitted: boolean,
  touched: boolean
) {
  // Narrow only to fields that support validation
  if (!('validation' in field)) {
    return {
      isRequired: false,
      pattern: undefined,
      helperText: '',
      isInvalidPattern: false,
      isEmpty: false,
      shouldShowError: false,
      showRequiredMark: false,
    };
  }

  let pattern = field.validation?.pattern;
  let helperText = field.validation?.message ?? '';
  let isRequired = field.validation?.required;

  if (field.validation?.dependsOn) {
    const depValue = allValues[field.validation.dependsOn.field];
    const rule = field.validation.dependsOn.rules?.[depValue];

    if (rule?.pattern) pattern = rule.pattern;
    if (rule?.message) helperText = rule.message;
    if (rule?.required !== undefined) isRequired = rule.required;
  }

  const isEmpty = value === '' || value === undefined || value === null;
  const isInvalidPattern = pattern ? !new RegExp(pattern).test(value) : false;

  const shouldShowError = (submitted || touched) && ((isRequired && isEmpty) || isInvalidPattern);
  const showRequiredMark =
    field.validation?.required ||
    (field.validation?.dependsOn &&
      field.validation.dependsOn.rules?.[allValues[field.validation.dependsOn.field]]?.required);

  return {
    isRequired,
    pattern,
    helperText,
    isInvalidPattern,
    isEmpty,
    shouldShowError,
    showRequiredMark,
  };
}
