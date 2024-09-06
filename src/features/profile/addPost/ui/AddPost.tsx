import { useMemo } from 'react'

import { AddScropping } from '@/features/profile/addPost/ui/addScropping/AddScropping'
import { useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { Dialog } from '@/shared/ui'

import { setOpenModal } from '../model/slice/addPostSlice'
import { PostView } from '../model/types/addPostTypes'
import { AddDescription } from './addDescription/AddDescription'
import { AddImages } from './addImages/AddImages'

export const AddPost = () => {
  const open = useAppSelector(state => state.addPost.isOpenModal)
  const postView = useAppSelector(state => state.addPost.postView)
  const dispatch = useAppDispatch()

  const setOpen = (value: boolean) => {
    dispatch(setOpenModal(value))
  }

  const content = useMemo(() => {
    switch (postView) {
      case PostView.IMAGE: {
        return <AddImages />
      }
      case PostView.DESCRIPTION: {
        return <AddDescription />
      }
      case PostView.CROPPING: {
        return <AddScropping />
      }
    }
  }, [postView])

  return (
    <Dialog
      onOpenChange={setOpen}
      open={open}
      title={postView === PostView.IMAGE ? 'Add Photo' : ''}
    >
      {content}
    </Dialog>
  )
}
