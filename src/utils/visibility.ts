import type { Field } from '../types/form';

export function isFieldVisible(field: Field, formValues: Record<string, any>): boolean {
    if (!field.visibleIf) return true;

    const { field: dependsOn, equals } = field.visibleIf;
    return formValues[dependsOn] === equals;
}
