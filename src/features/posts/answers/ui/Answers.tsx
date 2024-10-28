import { useState } from 'react'

import { AnswersType } from '@/entities/post/model/types/answersType'
import { Button } from '@/shared/ui'

import { Answer } from './Answer'

import s from './Answers.module.scss'

type Props = {
  answers: AnswersType
  onClick: () => void
  postId: number
}

export const Answers = ({ answers: answers, onClick, postId }: Props) => {
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
              <Answer answer={answer} key={answer.id} onClick={onClick} postId={postId} />
            ))}
        </div>
      )}
    </>
  )
}
