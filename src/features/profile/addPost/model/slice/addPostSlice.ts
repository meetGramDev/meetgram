import { createSlice } from '@reduxjs/toolkit'

import { AddingPostStage } from '../types/addPostTypes'

export type ImageType = {
  data: string
  image: string
}

export const addPostSlice = createSlice({
  initialState: {
    addingPostStage: AddingPostStage.ADD as AddingPostStage,
    images: [] as ImageType[],
    isOpenModal: false,
  },
  name: 'addPost',
  reducers: {
    addImage: (state, { payload }) => {
      state.images.push(payload)
    },
    closeAddingPost: state => {
      state.images = []
      state.addingPostStage = AddingPostStage.ADD
      state.isOpenModal = false
    },
    setAddingPostStage: (state, { payload }) => {
      state.addingPostStage = payload
    },
    setOpenAddingPost: (state, { payload }) => {
      state.isOpenModal = payload
    },
  },
})

export const { addImage, setAddingPostStage, setOpenAddingPost } = addPostSlice.actions
export const addPostActions = addPostSlice.actions
