export const filters = [
  'Normal',
  'Clarendon',
  'Lark',
  'Grayscale',
  'Moon',
  'Sepia',
  'Gingham',
  'Juno',
  'Ludwig',
]

export const filterMap: { [key: string]: string } = {
  Clarendon: 'contrast(1.2) brightness(1.1) saturate(1.35)',
  Gingham: 'sepia(0.1) contrast(1.1) brightness(1.1)',
  Grayscale: 'grayscale(1)',
  Juno: 'contrast(1.15) saturate(1.5)',
  Lark: 'brightness(1.1) contrast(0.9) saturate(1.25)',
  Ludwig: 'brightness(1.05) contrast(1.1) saturate(1.25)',
  Moon: 'grayscale(1) brightness(1.1) contrast(1.2)',
  Normal: 'none',
  Sepia: 'sepia(1)',
}
