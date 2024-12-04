import React, { useEffect, useState } from 'react'

import { clsx } from 'clsx'

import styles from './styles.module.scss'

import { Button } from '../button/button'

/**
 * Props для компонента Pagination
 * @typedef {Object} Props
 * @property {number} currentPage - Текущая страница
 * @property {function} onPageChange - Функция, вызываемая при изменении страницы (принимает номер новой страницы)
 * @property {function} onPerPageChange - Функция, вызываемая при изменении количества элементов на странице (принимает новое значение)
 * @property {number} pageCount - Общее количество страниц
 */
type Props = {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (itemsPerPage: number) => void
  pageCount: number
}

export const Pagination = ({
  className,
  currentPage,
  onPageChange,
  onPerPageChange,
  pageCount = 100,
}: Props) => {
  const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([])
  const [page, setPage] = useState<number>(currentPage)
  const [perPage, setPerPage] = useState<number>(10)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  // Варианты для количества элементов на странице
  const options = [10, 20, 30, 50, 100]

  /**
   * useEffect для создания массива номеров страниц в зависимости от текущей страницы и общего количества страниц.
   * Создаёт сокращённый ряд страниц с '...' при необходимости.
   */
  useEffect(() => {
    const pagesRow: (number | string)[] = []

    if (page <= 4) {
      for (let i = 1; i <= 5; i++) {
        pagesRow.push(i)
      }
      pagesRow.push('...')
      pagesRow.push(pageCount)
    } else if (page >= pageCount - 3) {
      pagesRow.push(1)
      pagesRow.push('...')
      for (let i = pageCount - 4; i <= pageCount; i++) {
        pagesRow.push(i)
      }
    } else {
      pagesRow.push(1)
      pagesRow.push('...')
      for (let i = page - 1; i <= page + 1; i++) {
        pagesRow.push(i)
      }
      pagesRow.push('...')
      pagesRow.push(pageCount)
    }

    setPageNumbers(pagesRow)
  }, [page, pageCount])

  /**
   * useEffect для синхронизации локального состояния `page` с внешним `currentPage`.
   * Обновляет `page`, если `currentPage` изменился извне.
   */
  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  const handleChangePage = (selectedPage: number | string) => {
    console.log('typeof selectedPage : ', typeof selectedPage)
    if (typeof selectedPage === 'number') {
      setPage(selectedPage)
      onPageChange(selectedPage) // Вызов функции из props для информирования родительского компонента
    }
  }

  const nextPage = () => {
    if (page < pageCount) {
      const newPage = page + 1

      setPage(newPage)
      onPageChange(newPage) // Вызов функции из props для информирования родительского компонента
    }
  }

  const prevPage = () => {
    if (page > 1) {
      const newPage = page - 1

      setPage(newPage)
      onPageChange(newPage)
    }
  }

  const handlePerPageChange = (itemsPerPage: number) => {
    setPerPage(itemsPerPage)
    onPerPageChange(itemsPerPage) // Вызов функции из props для информирования родительского компонента
    setIsDropdownOpen(false)
  }

  /**
   * Переключение состояния выпадающего списка для выбора количества элементов на странице
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className={clsx(styles.paginationWrapper, className)}>
      {/* Кнопка для перехода на предыдущую страницу */}
      <Button
        className={`${styles.pageItem} ${styles.arrowBtnL}`}
        disabled={page === 1}
        onClick={prevPage}
      />

      {/* Отображение номеров страниц */}
      {pageNumbers.map(pageNumber => (
        <div key={pageNumber} onClick={() => handleChangePage(pageNumber)}>
          <div className={`${pageNumber === page ? styles.selectedPage : styles.pageItem}`}>
            {pageNumber}
          </div>
        </div>
      ))}

      {/* Кнопка для перехода на следующую страницу */}
      <Button
        className={`${styles.pageItem} ${styles.arrowBtnR}`}
        disabled={page === pageCount}
        onClick={nextPage}
      />

      {/* Выпадающий список для выбора количества элементов на странице */}
      <span className={styles.text}>Show</span>
      <div>
        <div className={styles.customSelectWrapper}>
          <div className={styles.customSelect} onClick={toggleDropdown}>
            <span>{perPage}</span>
            <span className={`${styles.arrow} ${isDropdownOpen ? styles.open : ''}`} />
          </div>
          {isDropdownOpen && (
            <div className={styles.options}>
              {options.map(option => (
                <div
                  className={`${styles.option} ${option === perPage ? styles.selectedOption : ''}`}
                  key={option}
                  onClick={() => handlePerPageChange(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* todo class text isn't in style*/}
      <span className={styles.text}> on page</span>
    </div>
  )
}
