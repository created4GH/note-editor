const defUserFormInitVals = {
    username: '',
    password: '',
};

export const LoginFormInitVals = defUserFormInitVals;
export const SignUpFormInitVals = {
    ...defUserFormInitVals,
    passwordConfirmation: ''
};