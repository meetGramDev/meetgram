import { cn } from '@/shared/lib/cn'

type Props = {
  message?: string
  type?: 'error' | 'success'
}

export const UploadMessage = ({ message, type = 'error' }: Props) => {
  return (
    <p
      className={cn(
        'border px-6 py-1 text-center text-regular14 text-light-100 md:text-regular16',
        type === 'error' && 'border-danger-500 bg-danger-900',
        type === 'success' && 'border-success-500 bg-success-900'
      )}
    >
      {message || 'No message ;)'}
    </p>
  )
}
