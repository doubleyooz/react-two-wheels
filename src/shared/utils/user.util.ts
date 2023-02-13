import * as yup from 'yup';
export type UserLogin = {
    email: string;
    password: string;
};

export type UserSignUp = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
};

export const userRules = {
    email: yup.string().email(),
    password: yup
        .string()
        .matches(/^(?=.*[a-z])/, 'Must contain at least 1 lowercase letter')
        .matches(/^(?=.*[A-Z])/, 'Must contain at least 1 uppercase letter')
        .matches(/^(?=.*\d)/, 'Must contain at least a number')
        .matches(
            /(?=.*[^a-zA-Z0-9])/,
            'Must contain at least 1 special character'
        )
        .min(8),
    name: yup
        .string()
        .min(3)
        .max(20)
        .trim()
        .matches(/^([^0-9]*)$/, 'no numbers allowed'),
};
