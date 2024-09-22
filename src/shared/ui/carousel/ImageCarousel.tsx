import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './Carousel'

export const ImageCarousel = () => {
  return (
    <Carousel
      options={{ align: 'center' }}
      style={{
        maxWidth: '24rem',
        width: '100%',
      }}
    >
      <CarouselContent>
        {/* {items.map(item => (
          <CarouselItem key={item}>
            <div className={'border border-solid border-slate-700 shadow-lg shadow-slate-200'}>
              <div className={'flex aspect-square items-center justify-center p-6'}>
                <span className={'text-3xl'}>{item}</span>
              </div>
            </div>
          </CarouselItem>
        ))} */}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
