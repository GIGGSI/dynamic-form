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
};

export type TextAreaFieldType = FieldBase & {
    type: 'textarea';
};

export type RadioFieldType = FieldBase & {
    type: 'radio';
    options: string[];
};

export type CheckboxFieldType = FieldBase & {
    type: 'checkbox';
};

export type Field =
    | TextFieldType
    | DropdownFieldType
    | TextAreaFieldType
    | RadioFieldType
    | CheckboxFieldType;