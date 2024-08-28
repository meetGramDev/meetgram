import { FormEvent } from 'react'

import { Post, PublicPost } from '@/entities/post'
import { Button, Dialog } from '@/shared/ui'

import { useEditPostMutation } from '../model/services/editPostApiSlice'

type Props = {
  onOpenChange: (open: boolean) => void
  open: boolean
  post: PublicPost
}

export const EditPostDialog = ({ onOpenChange, open, post }: Props) => {
  const {} = useEditPostMutation()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open} title={'Edit Post'}>
      <form onSubmit={handleSubmit}>
        <Post alt={'post'} src={post.images[0].url} />
        Edit photo description here
        <Button>Save changes</Button>
      </form>
    </Dialog>
  )
}
