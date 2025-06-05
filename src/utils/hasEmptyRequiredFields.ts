import type { FormSchema } from '../types/form';

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
            const validation = field.validation;

            if (validation?.dependsOn) {
                const fieldToWatch = validation.dependsOn.field;
                const fieldValue = values[fieldToWatch];
                const rules = validation.dependsOn.rules?.[fieldValue];

                if (rules?.required && (value === '' || value === undefined || value === null)) {
                    return true;
                }

                if (rules?.pattern) {
                    const regex = new RegExp(rules.pattern);
                    if (value && !regex.test(value)) {
                        return true;
                    }
                }
            }

            if (validation?.required && (value === '' || value === undefined || value === null)) {
                return true;
            }

            if (validation?.pattern) {
                const regex = new RegExp(validation.pattern);
                if (value && !regex.test(value)) {
                    return true;
                }
            }
        }

        return false;
    });
};
