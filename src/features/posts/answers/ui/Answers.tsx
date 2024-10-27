import { useState } from 'react'

import s from './Answers.module.scss'

import { AnswersType } from '../../comments/model/types/answersType'
import { Answer } from './Answer'
type Props = {
  answers: AnswersType
  onClick: () => void
  postId: number
}

export const Answers = ({ answers: answers, onClick, postId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const setOpenHandle = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      {answers.items.length > 0 && (
        <div className={`${s.answersHide} `} onClick={setOpenHandle}>
          Hide answers ({answers.items.length})
        </div>
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
