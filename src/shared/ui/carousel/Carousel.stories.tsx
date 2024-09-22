import { CSSProperties, useEffect, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import s from './CarouselStories.module.scss'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel'

const meta = {
  args: {
    options: {
      align: 'center',
      loop: false,
    },
    style: {
      maxWidth: '36rem',
      width: '100%',
    },
  },
  component: Carousel,
  tags: ['autodocs'],
  title: 'shared/Carousel',
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const items = [1, 2, 3, 4, 5, 6, 7]

export const Default: Story = {
  args: {
    style: {
      border: '1px solid rgb(51 65 85)',
    },
  },
  render(args) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!api) {
        return
      }

      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)

      api.on('select', () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])

    return (
      <div className={'mx-auto max-w-2xl'}>
        <Carousel setApi={setApi} {...args}>
          <CarouselContent style={{ padding: '2rem' }}>
            {items.map(item => (
              <CarouselItem key={item} style={{ flexBasis: '33.33%' }}>
                <div
                  className={
                    'rounded-xl border border-solid border-slate-700 shadow-lg shadow-slate-400/50'
                  }
                >
                  <div className={'flex aspect-square items-center justify-center p-6'}>
                    <span className={'text-3xl'}>{item}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className={'mt-2 text-center text-lg font-semibold'}>
          Slide {current} of {count}
        </div>
      </div>
    )
  },
}

export const ResponsiveSizes: Story = {
  render(args) {
    return (
      <Carousel {...args}>
        <CarouselContent style={{ padding: '2rem' }}>
          {items.map(item => (
            <CarouselItem className={s.responsiveSlides} key={item}>
              <div
                className={
                  'rounded-xl border border-solid border-slate-700 shadow-lg shadow-slate-400/50'
                }
              >
                <div className={'flex aspect-square items-center justify-center p-6'}>
                  <span className={'text-3xl'}>{item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

export const WithSpacing: Story = {
  args: {
    style: {
      '--slide-spacing': '3rem',
    } as CSSProperties,
  },

  render({ style, ...args }) {
    return (
      <Carousel style={style} {...args}>
        <CarouselContent>
          {items.map(item => (
            <CarouselItem key={item} style={{ flexBasis: '33.33%' }}>
              <div
                className={
                  'rounded-xl border border-solid border-slate-700 shadow-lg shadow-slate-400/50'
                }
              >
                <div className={'flex aspect-square items-center justify-center p-6'}>
                  <span className={'text-3xl'}>{item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

export const OneItemPerSlideWithLoop: Story = {
  args: {
    options: {
      loop: true,
    },
    style: {
      maxWidth: '50vh',
    },
  },

  render(args) {
    return (
      <div className={'mx-auto max-w-[50vh]'}>
        <Carousel {...args}>
          <CarouselContent>
            {items.map(item => (
              <CarouselItem key={item}>
                <div className={'rounded-xl border border-solid border-slate-700'}>
                  <div className={'flex aspect-square h-full items-center justify-center p-6'}>
                    <span className={'text-3xl'}>{item}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
  },
}
