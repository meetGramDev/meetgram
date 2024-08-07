import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { PostView } from '../types/addPostTypes'

export type ImageType = {
  data: string
  image: string
}

const initialState = {
  images: [] as ImageType[],
  isOpenModal: false,
  postView: PostView.IMAGE,
}

const addPostSlice = createSlice({
  initialState,
  name: 'addPost',
  reducers: {
    addImage: (state, { payload }) => {
      state.images.push(payload)
    },
    setOpenModal: (state, { payload }) => {
      state.isOpenModal = payload
    },
    setPostView: (state, { payload }) => {
      state.postView = payload
    },
  },
})

export const { addImage, setOpenModal, setPostView } = addPostSlice.actions
export const addPostReducer = addPostSlice.reducer