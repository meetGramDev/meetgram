import { IsKeyString } from '@/shared/types'

import { locales } from './languages'

export type LocalesType = (typeof locales)[number]

export type TranslationNode = { [name: string]: TranslationNode | string }

export type TranslationPhraseType<TrNode extends TranslationNode, ParentKey extends string = ''> = {
  [Key in keyof TrNode]: TrNode[Key] extends string
    ? `${ParentKey}${IsKeyString<Key>}`
    : TrNode[Key] extends TranslationNode
      ? TranslationPhraseType<TrNode[Key], `${ParentKey}${IsKeyString<Key>}.`> | never
      : never
}[keyof TrNode]
