import * as Yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

type SchemaType = { [key: string]: RequiredStringSchema<string | undefined, AnyObject> };

const setLength = (length: string): string => `Must be ${length} chars`;
const createSchema = (schema: SchemaType) => Yup.object().shape(schema);

const defEntryFormValidSchema = {
    username: Yup.string()
        .matches(/[a-zA-Z0-9]/, 'Should contain alphanumeric chars only')
        .min(3, setLength('3-10'))
        .max(10, setLength('3-10'))
        .required("Username is required!"),
    password: Yup.string()
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])./,
            'At least 1 number, letters of different cases')
        .min(6, setLength('6-15'))
        .max(15, setLength('6-15'))
        .required("Password is required!"),
};

export const LoginFormValidSchema = createSchema(defEntryFormValidSchema);

export const SignUpFormValidSchema = createSchema({
    ...defEntryFormValidSchema,
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Passwords must match')
});

export const fullNoteValidSchema = createSchema({
    title: Yup.string()
        .min(3, setLength("3-50"))
        .max(50, setLength("3-50"))
        .matches(/(\S){3,50}/, 'Spaces are not chars')
        .required("Required!"),
    description: Yup.string()
        .min(5, setLength("5-300"))
        .max(300, setLength("5-300"))
        .matches(/(\S){5,300}/, 'Spaces are not chars')
        .required("Required!")
})

export type EntryFormValidSchemaType = typeof SignUpFormValidSchema;