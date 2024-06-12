import { Button } from '@/shared/ui/button/button'
import { useRouter } from 'next/router'

type Props = {
  label: string
}

export const BackButton = ({ label }: Props) => {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      style={{ color: 'var(--light-color-100)', fontWeight: 400 }}
      variant={'text'}
    >
      {label}
    </Button>
  )
}
