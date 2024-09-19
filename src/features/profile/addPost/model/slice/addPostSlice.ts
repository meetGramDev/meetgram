import { Nullable } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'

import { AddingPostStage } from '../types/addPostTypes'

export type ImageType = {
  data: string
  image: string
}

export const addPostSlice = createSlice({
  initialState: {
    addingPostStage: AddingPostStage.ADD as AddingPostStage,
    currentIndex: null as Nullable<number>,
    images: [] as ImageType[],
    isOpenModal: false,
  },
  name: 'addPost',
  reducers: {
    addImage: (state, { payload }) => {
      state.images.push(payload)
      state.currentIndex = 0
    },
    changeCurrentIndex: (state, { payload }) => {
      state.currentIndex = payload
    },
    clearEditedImages: state => {
      state.images = []
      state.currentIndex = null
    },
    closeAddingPost: state => {
      state.images = []
      state.addingPostStage = AddingPostStage.ADD
      state.isOpenModal = false
      state.currentIndex = 0
    },
    setAddingPostStage: (state, { payload }) => {
      state.addingPostStage = payload
    },
    setOpenAddingPost: (state, { payload }) => {
      state.isOpenModal = payload
    },
  },
})

export const addPostActions = addPostSlice.actions
