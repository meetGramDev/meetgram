export const en = {
    button: {
        Button: 'Button',
        Link: 'Link that looks like a button',
    },
    createNewPasswordForm: {
        createNewPassword: 'Create New Password',
        newPassword: 'New password',
        passwordConfirmation: 'Password confirmation',
        passwordTerm: 'Your password must be between 6 and 20 characters',
    },
    errorsTr: {
        errorEmail: {InvalidEmail: 'Invalid email'},
        errorNewPassword: {
            refineMessage: 'Passwords must match',
        },
        errorSignUp: {
            isApprovedMassage: 'Please read and accept the terms and conditions',
            refineMessage: "Passwords don't match",
        },
        errorValidationFields: {
            maxChar: 'Maximum number of characters',
            minChar: 'Minimum number of characters',
            passContain: 'Password must contain',
            requiredFields: 'Please fill in required fields',
            wrongDateOfBirth: 'A user under 13 cannot create a profile.',
            wrongFirstName: 'Wrong First Name',
            wrongLastName: 'Wrong Last Name',
            wrongUsername: 'Wrong username'
        },
    },
    forgoPasswordForm: {
        again: ' Again',
        backSignIn: 'Back to Sign In',
        email: 'Email',
        enterEmail: 'Enter your email and we will send you further instruction',
        forgotPassword: 'Forgot Password',
        linkSent: 'The link has been sent by email.',
        sendAgain: 'If you do not receive an email send link again.',
        sendLink: 'Send Link'
    },
    header: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
    },
    language: 'English',
    sidebarTr: {
        create: 'Create',
        favorites: 'Favorites',
        home: 'Home',
        logOut: 'Log Out',
        messenger: 'Messenger',
        myProfile: 'My Profile',
        search: 'Search',
        statistics: 'Statistics',
    },
    signInLang: {
        anAccount: "Don't have an account?",
        email: 'Email',
        forgoPassword: 'Forgot password',
        password: 'Password',
        signIn: 'Sign In',
        signUp: 'Sign Up',
    },
    signUpLang: {
        IAgree: 'I agree to the',
        aler: 'We have sent a link to confirm your email to ',
        anAccount: 'Do you have an account?',
        and: 'and',
        email: 'Email',
        message: 'Please read and accept the terms and conditions',
        password: 'Password',
        passwordConf: 'Password confirmation',
        privPolicy: 'Privacy Policy',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        termServ: 'Terms of Service',
        username: 'Username',
    },
    test: 'Lorem Ipsum is simply dummy text of the printing',
}

export type LenType = typeof en
const {errorsTr, sidebarTr} = en
const {errorEmail, errorSignUp, errorValidationFields} = errorsTr

export type ErrorsTr = typeof errorsTr
export type ErrorSineUp = typeof errorSignUp
export type ErrorValidationFields = typeof errorValidationFields
export type ErrorEmail = typeof errorEmail
export type SidebarTr = typeof sidebarTr
