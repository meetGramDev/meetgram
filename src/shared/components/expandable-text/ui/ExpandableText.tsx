import { Button } from '@/shared/ui'
import clsx from 'clsx'

import s from './Expandable.module.scss'

import {
  type GetPostMessageTruncatedArgs,
  getPostMessageTruncated,
} from '../lib/getPostMessageTruncated'

type Props = {
  className?: string
  onExpand: () => void
} & GetPostMessageTruncatedArgs

export const ExpandableText = ({
  className,
  cutTextEnd,
  hideCount = 77,
  isExpanded,
  message,
  onExpand,
  showedCount = 237,
}: Props) => {
  return (
    <div className={clsx(s.container, isExpanded && s.textExpanded, className)}>
      <>{getPostMessageTruncated({ cutTextEnd, hideCount, isExpanded, message, showedCount })}</>
      {message.length > hideCount && (
        <Button className={'text-[14px]'} onClick={onExpand} variant={'link'}>
          {isExpanded ? 'Hide' : 'Show more'}
        </Button>
      )}
    </div>
  )
}
