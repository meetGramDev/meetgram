import { RootState } from '@/app/lib'

export const selectIsDialogOpen = (state: RootState) => state.addPost.isOpenModal
export const selectAddingPostStage = (state: RootState) => state.addPost.addingPostStage
export const selectImages = (state: RootState) => state.addPost.images
export const selectIsAddedImages = (state: RootState) => !!state.addPost.images.length
export const selectCurrentIndex = (state: RootState) => state.addPost.currentIndex
export const selectNumberOfImages = (state: RootState) => state.addPost.images.length
