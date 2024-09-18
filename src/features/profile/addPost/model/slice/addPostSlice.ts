import { createSlice } from '@reduxjs/toolkit'

import { AddPostStage } from '../types/addPostTypes'

export type ImageType = {
  data: string
  image: string
}

export const addPostSlice = createSlice({
  initialState: {
    addPostStage: AddPostStage.ADD as AddPostStage,
    images: [] as ImageType[],
    isOpenModal: false,
  },
  name: 'addPost',
  reducers: {
    addImage: (state, { payload }) => {
      state.images.push(payload)
    },
    setAddPostStage: (state, { payload }) => {
      state.addPostStage = payload
    },
    setOpenAddingPost: (state, { payload }) => {
      state.isOpenModal = payload
    },
  },
})

export const { addImage, setAddPostStage, setOpenAddingPost } = addPostSlice.actions
export const addPostActions = addPostSlice.actions
