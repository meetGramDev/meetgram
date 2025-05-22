export const EmptyDialog = ({
  text = 'Choose who you would like to talk to',
}: {
  text?: string
}) => {
  return (
    <div className={'flex h-full w-full flex-col items-center justify-center'}>
      <div className={'rounded-lg bg-dark-300 px-6 py-3'}>
        <p className={'text-regular14'}>{text}</p>
      </div>
    </div>
  )
}
