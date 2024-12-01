import React, { useEffect, useState } from 'react'

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
  currentPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (itemsPerPage: number) => void
  options: number[]
  pageCount: number
}

export const Pagination = ({
  currentPage,
  onPageChange,
  onPerPageChange,
  options,
  pageCount,
}: Props) => {
  const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([])
  const [page, setPage] = useState<number>(currentPage)
  const [perPage, setPerPage] = useState<number>(10)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  useEffect(() => {
    const pagesRow: (number | string)[] = []

    if (page <= 4) {
      for (let i = 1; i <= Math.min(5, pageCount); i++) {
        pagesRow.push(i)
      }
      if (pageCount > 5) {
        pagesRow.push('...')
        pagesRow.push(pageCount)
      }
    } else if (page >= pageCount - 3) {
      pagesRow.push(1)
      if (pageCount > 5) {
        pagesRow.push('...')
      }
      for (let i = Math.max(pageCount - 4, 1); i <= pageCount; i++) {
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

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  const handleChangePage = (selectedPage: number | string) => {
    if (typeof selectedPage === 'number') {
      setPage(selectedPage)
      onPageChange(selectedPage)
    }
  }

  const nextPage = () => {
    if (page < pageCount) {
      const newPage = page + 1

      setPage(newPage)
      onPageChange(newPage)
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
    onPerPageChange(itemsPerPage)
    setIsDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className={styles.paginationWrapper}>
      <Button
        className={`${styles.pageItem} ${styles.arrowBtnL}`}
        disabled={page === 1}
        onClick={prevPage}
      />

      {pageNumbers.map(pageNumber => (
        <div key={pageNumber} onClick={() => handleChangePage(pageNumber)}>
          <div className={`${pageNumber === page ? styles.selectedPage : styles.pageItem}`}>
            {pageNumber}
          </div>
        </div>
      ))}

      <Button
        className={`${styles.pageItem} ${styles.arrowBtnR}`}
        disabled={page === pageCount}
        onClick={nextPage}
      />

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
      <span className={styles.text}> on page</span>
    </div>
  )
}
