export const HeaderInfo = {
    signUp: {
        title: 'Account registration',
        btnText: 'Log in?'
    },
    login: {
        title: 'Account Login',
        btnText: 'Sign up?'
    }
};

const defInputsInfo = [
    {
        title: 'Username',
        name: 'username',
        type: 'text',
        placeholder: 'Enter your username'
    },
    {
        title: 'Password',
        name: 'password',
        type: 'text',
        placeholder: 'Enter your password'
    }
]

export const InputsInfo = {
    signUp: [...defInputsInfo,
    {
        title: 'Confirm Password',
        name: 'passwordConfirmation',
        type: 'text',
        placeholder: 'Confirm your password'
    }
    ],
    login: [...defInputsInfo]
};
