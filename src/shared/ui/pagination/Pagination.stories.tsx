import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './Pagination'

const meta = {
  args: {
    currentPage: 1,
    onPageChange: (page: number) => {
      console.log(`Page changed to: ${page}`)
    },
    onPerPageChange: (perPage: number) => {
      console.log(`Items per page changed to: ${perPage}`)
    },
    options: [5, 10, 20, 100],
    pageCount: 10,
  },
  component: Pagination,
  tags: ['autodocs'],
  title: 'shared/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// Основной шаблон компонента Pagination
export const DefaultPagination: Story = {}

export const CustomPagination: Story = {
  args: {
    currentPage: 5,
    pageCount: 20,
  },
}

// Пример с кастомным обработчиком onPageChange
export const PaginationWithCustomHandler: Story = {
  args: {
    onPageChange: (page: number) => alert(`New page is: ${page}`),
  },
}
