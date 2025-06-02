export type FieldBase = {
    type: string;
    label: string;
    name: string;
};

export type TextFieldType = FieldBase & {
    type: 'text';
};

export type Field = TextFieldType;

export type FormSchema = {
    fields: Field[];
};
