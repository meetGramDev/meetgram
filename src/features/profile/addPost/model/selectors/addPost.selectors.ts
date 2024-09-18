import { RootState } from '@/app/lib'

export const selectIsDialogOpen = (state: RootState) => state.addPost.isOpenModal
export const selectAddPostStage = (state: RootState) => state.addPost.addPostStage
