export type FieldBase = {
    type: string;
    label: string;
    name: string;
};

export type FormSchema = {
    fields: Field[];
};

export type TextFieldType = FieldBase & {
    type: 'text';
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