import { ByFlagIcon } from '@/shared/assets/icons/BY'
import { EsFlagIcon } from '@/shared/assets/icons/ES'
import { RuFlagIcon } from '@/shared/assets/icons/RU'
import { UaFlagIcon } from '@/shared/assets/icons/UA'
import { UsFlagIcon } from '@/shared/assets/icons/US'

const flags = {
  English: UsFlagIcon,
  Español: EsFlagIcon,
  Беларуская: ByFlagIcon,
  Русский: RuFlagIcon,
  Українська: UaFlagIcon,
}

export type Languages = 'English' | 'Español' | 'Беларуская' | 'Русский' | 'Українська'

export function renderCountryFlag(language: Languages) {
  return flags[language]
}
