export const en = {
    "About me": "About me",
    "Account Management": "Account Management",
    'Add Photo': 'Add Photo',
    "Add a Profile Photo": "Add a Profile Photo",
    "Add a profile photo": "Add a profile photo",
    "April": "April",
    "Are you sure you want to delete the photo?": "Are you sure you want to delete the photo?",
    "August": "August",
    "Avatar": "Avatar",
    "Change profile photo": "Change profile photo",
    "City": "City",
    'Close': 'Close',
    "Congratulations!": "Congratulations!",
    "Country": "Country",
    "Date of birth": "Date of birth",
    "December": "December",
    "Delete photo": "Delete photo",
    "Devices": "Devices",
    "Do you really want to close the creation of a publication? If you close everything will be deleted": "Do you really want to close the creation of a publication? If you close everything will be deleted",
    "Email sent": "Email sent",
    "Email verification link expired": "Email verification link expired",
    "February": "February",
    "First Name": "First Name",
    "General Information": "General Information",
    "January": "January",
    'July': "July",
    "June": "June",
    "Last Name": "Last Name",
    "Looks like the verification link has expired. Not to worry, we can send the link again": "Looks like the verification link has expired. Not to worry, we can send the link again",
    "March": "March",
    "May": "May",
    "My Payments": "My Payments",
    "Next": "Next",
    "No": "No",
    "November": "November",
    "October": "October",
    "Ok": "Ok",
    "Resend verification link": "Resend verification link",
    "Save changes": "Save changes",
    'Select from computer': "Select from computer",
    "Select your city": "Select your city",

    "Select your country": "Select your country",
    "September": "September",
    "Sign In": "Sign In",
    "Sign Up": "Sign Up",
    "We have sent a link to confirm your email to": "We have sent a link to confirm your email to ",
    "Yes": "Yes",
    "Your email has been confirmed": "Your email has been confirmed",
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
        emailSent: 'Email sent',
        enterEmail: 'Enter your email address and we will send you further instruction',
        forgotPassword: 'Forgot Password',
        linkSent: 'The link has been sent by email.',
        sendAgain: 'If you do not receive an email send link again.',
        sendLink: 'Send Link',
        sendLinkDialog: 'We have sent a link to confirm your email to',
    },
    language: 'English',
    policies: {
        "Privacy Policy": "Privacy Policy",
        "Terms Of Service": "Terms Of Service",
    },
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
    "text area": "text area"
}

const {errorsTr, sidebarTr} = en
const {errorEmail, errorSignUp, errorValidationFields} = errorsTr


export type ErrorsTr = typeof errorsTr
export type ErrorValidationFields = typeof errorValidationFields
export type ErrorEmail = typeof errorEmail

export type LenType = typeof en


