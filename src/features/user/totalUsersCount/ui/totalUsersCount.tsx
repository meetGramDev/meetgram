type PropsType = {
  usersCount: number
}

export const TotalUsersCount = ({ usersCount }: PropsType) => {
  const arrayOfCount = usersCount.toString().split('')

  return (
    <div className={'mb-9 flex justify-between bg-dark-500 px-6 py-3'}>
      <div className={'flex justify-center self-center text-[18px] font-bold leading-6'}>
        <h2>Registered users:</h2>
      </div>
      <div className={'flex rounded-sm border-2 border-dark-300 bg-dark-700 p-2'}>
        {arrayOfCount.map((num, count, array) => {
          if (count === array.length - 1) {
            return (
              <div className={'px-[9px] py-[5px] text-center font-bold'} key={count}>
                {num}
              </div>
            )
          }

          return (
            <div
              className={'border-r-2 border-dark-300 px-[9px] py-[5px] text-center font-bold'}
              key={count}
            >
              {num}
            </div>
          )
        })}
      </div>
    </div>
  )
}
