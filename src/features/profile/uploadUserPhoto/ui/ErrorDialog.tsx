type Props = {
  message?: string
}

export const ErrorDialog = ({ message }: Props) => {
  return (
    <p
      className={
        'border border-danger-500 bg-danger-900 px-6 py-1 text-center text-regular14 text-light-100 md:text-regular16'
      }
    >
      {message || 'No error ;)'}
    </p>
  )
}
