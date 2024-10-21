import { useState } from 'react'

import { Button } from '@/shared/ui'

import s from './Answers.module.scss'

import { AnswersType } from '../../comments/model/types/answersType'
import { Answer } from './Answer'

type Props = {
  answers: AnswersType
  onClick: () => void
}

export const Answers = ({ answers: answers, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const setOpenHandle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {answers.items.length > 0 && (
        <Button className={s.answersHide} onClick={setOpenHandle} variant={'text'}>
          <hr className={s.line} />
          View answers ({answers.items.length})
        </Button>
      )}
      {isOpen && (
        <div className={s.answersContainer}>
          {answers &&
            answers.items.map(answer => (
              <Answer answer={answer} key={answer.id} onClick={onClick} />
            ))}
        </div>
      )}
    </>
  )
}
