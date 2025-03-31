export const NotificationsCount = (count: number) => {
  return (
    <div
      className={
        'absolute left-[10px] top-[-5px] flex aspect-square h-[13px] items-center justify-center rounded-full bg-danger-500 px-1 text-[0.625rem] text-light-100'
      }
    >
      {count}
    </div>
  )
}
