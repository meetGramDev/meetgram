import { createSlice } from '@reduxjs/toolkit'

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

export const addPostSlice = createSlice({
  initialState,
  name: 'addPost',
  reducers: {
    addImage: (state, { payload }) => {
      state.images.push(payload)
    },
    clearImagesState: state => {
      state.images = []
    },
    setOpenModal: (state, { payload }) => {
      state.isOpenModal = payload
    },
    setPostView: (state, { payload }) => {
      state.postView = payload
    },
  },
})

export const { addImage, clearImagesState, setOpenModal, setPostView } = addPostSlice.actions
