import { Nullable } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AddingPostStage } from '../types/addPostTypes'
import { ImageType, UpdateImagePayload } from '../types/slice'

export const addPostSlice = createSlice({
  initialState: {
    addingPostStage: AddingPostStage.ADD as AddingPostStage,
    currentIndex: null as Nullable<number>,
    filter: '' as string | undefined,
    images: [] as ImageType[],
    index: 0,
    isOpenModal: false,
  },
  name: 'addPost',
  reducers: {
    addImage: (state, { payload }: PayloadAction<ImageType>) => {
      state.images.push(payload)
    },
    changeCurrentIndex: (state, { payload }: PayloadAction<Nullable<number>>) => {
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
    removeImage: (state, { payload }: PayloadAction<{ index: number }>) => {
      state.images.splice(payload.index, 1)
    },
    setAddingPostStage: (state, { payload }: PayloadAction<AddingPostStage>) => {
      state.addingPostStage = payload
    },
    setFilterData: (state, { payload }: PayloadAction<{ filter?: string; index: number }>) => {
      state.filter = payload.filter
      state.index = payload.index
    },
    setOpenAddingPost: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpenModal = payload
    },
    startEditing: (state, { payload }: PayloadAction<ImageType[]>) => {
      state.images = payload
      state.currentIndex = 0
    },
    updateImage: (state, { payload: { image, index } }: PayloadAction<UpdateImagePayload>) => {
      Object.assign(state.images[index], image)
    },
  },
})

export const addPostActions = addPostSlice.actions
