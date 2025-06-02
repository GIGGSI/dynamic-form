export type FieldBase = {
    type: string;
    label: string;
    name: string;
};

export type TextFieldType = FieldBase & {
    type: 'text';
};


export type FormSchema = {
    fields: Field[];
};
export type DropdownFieldType = FieldBase & {
    type: 'dropdown';
    options: string[];
};

export type Field = TextFieldType | DropdownFieldType;