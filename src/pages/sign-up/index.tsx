import { SignUpForm } from '@/featuers/auth/signUp/ui'
import { SignUpFormData } from '@/featuers/auth/signUp/ui/useSignUp'

export default function SignUp() {
  const onSubmit = (data: SignUpFormData) => {
    alert(JSON.stringify(data))
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <SignUpForm onSubmit={onSubmit} />
    </div>
  )
}
