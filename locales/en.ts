export const en = {
  button: {
    Button: 'Button',
    Link: 'Link that looks like a button',
  },
  errorsTr: {
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
      wrongUsername: 'Wrong username',
    },
  },
  header: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
  },
  language: 'English',
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
const { errorsTr } = en
const { errorSignUp, errorValidationFields } = errorsTr

export type ErrorsTr = typeof errorsTr
export type ErrorSineUp = typeof errorSignUp
export type ErrorValidationFields = typeof errorValidationFields
