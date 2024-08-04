import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Image = {
  alt: string
  height?: number
  id: string
  src: StaticImport | string
  width?: number
}

export type List = {
  images: Image[]
}
