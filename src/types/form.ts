export type FieldBase = {
    type: string;
    label: string;
    name: string;
    visibleIf?: {
        field: string;
        equals: string;
    };
};

export type FormSchema = {
    fields: Field[];
};

export type TextFieldType = FieldBase & {
    type: 'text';
    validation?: {
        required?: boolean;
        pattern?: string;
        message?: string;
        dependsOn?: {
            field: string;
            rules: {
                [value: string]: {
                    required?: boolean;
                    pattern?: string;
                    message?: string;
                };
            };
        };
    };
};

export type DropdownFieldType = FieldBase & {
    type: 'dropdown';
    options: string[];
    validation?: {
        required?: boolean;
        pattern?: string;
        message?: string;
        dependsOn?: {
            field: string;
            rules: {
                [value: string]: {
                    required?: boolean;
                    pattern?: string;
                    message?: string;
                };
            };
        };
    };
};

export type TextAreaFieldType = FieldBase & {
    type: 'textarea';
    validation?: {
        required?: boolean;
        pattern?: string;
        message?: string;
        dependsOn?: {
            field: string;
            rules: {
                [value: string]: {
                    required?: boolean;
                    pattern?: string;
                    message?: string;
                };
            };
        };
    };
};

export type RadioFieldType = FieldBase & {
    type: 'radio';
    options: string[];
    validation?: {
        required?: boolean;
        pattern?: string;
        message?: string;
        dependsOn?: {
            field: string;
            rules: {
                [value: string]: {
                    required?: boolean;
                    pattern?: string;
                    message?: string;
                };
            };
        };
    };
};

export type CheckboxFieldType = FieldBase & {
    type: 'checkbox';
    validation?: {
        required?: boolean;
        pattern?: string;
        message?: string;
        dependsOn?: {
            field: string;
            rules: {
                [value: string]: {
                    required?: boolean;
                    pattern?: string;
                    message?: string;
                };
            };
        };
    }
};

export type GroupFieldType = FieldBase & {
    type: 'group';
    fields: Field[];
};

export type Field =
    | TextFieldType
    | DropdownFieldType
    | TextAreaFieldType
    | RadioFieldType
    | CheckboxFieldType
    | GroupFieldType;