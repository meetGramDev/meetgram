import {
  ChangeEventHandler,
  DragEventHandler,
  ReactNode,
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { LogOutIcon } from '@/shared/assets/icons/LogOut'
import { cn } from '@/shared/lib/cn'
import { Nullable } from '@/shared/types'

export type DropzoneRef = {
  onSelectFile: () => void
}

type Props = {
  children?: ReactNode
  className?: string
  disabled?: boolean
  /**
   * Passes selected file
   * @param {File} file
   */
  onFileSelect?: (file: File) => void
  /**
   * Toggle overlay on hover. Default `true`
   */
  overlay?: boolean
}

/**
 * A file upload wrapper
 */
export const Dropzone = forwardRef<DropzoneRef, Props>(
  ({ children, className, disabled, onFileSelect, overlay = true }, innerRef) => {
    const inputRef = useRef<Nullable<HTMLInputElement>>(null)
    const id = useId()
    const [dropping, setDropping] = useState(false)

    useImperativeHandle(innerRef, () => {
      return {
        // expose click event to the parent element
        onSelectFile() {
          inputRef.current?.click()
        },
      }
    })

    const handleFile = (file: File | undefined) => {
      if (!file) {
        return
      }

      onFileSelect?.(file)
    }

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = e => {
      handleFile(e.currentTarget.files?.[0])
    }

    const handleDrop: DragEventHandler<HTMLDivElement> = e => {
      if (disabled) {
        return
      }
      e.preventDefault()

      const droppedFile = e.dataTransfer.files[0]

      setDropping(false)

      handleFile(droppedFile)
    }
    const handleDragOver: DragEventHandler<HTMLDivElement> = e => {
      if (disabled) {
        return
      }
      e.preventDefault()

      setDropping(true)
    }
    const handleDragLeave: DragEventHandler<HTMLDivElement> = e => {
      if (disabled) {
        return
      }
      e.preventDefault()

      setDropping(false)
    }

    return (
      <div
        className={cn('group relative z-10 flex h-max w-max', className)}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {children}
        <label
          className={cn(
            'pointer-events-none invisible absolute inset-0 z-0 flex h-full w-full cursor-pointer items-center justify-center rounded-[3px] bg-dark-500 opacity-0 duration-300 group-hover:opacity-100',
            overlay && 'pointer-events-auto visible cursor-pointer',
            dropping && 'pointer-events-auto visible opacity-100'
          )}
          htmlFor={id}
        >
          <input
            accept={'image/jpg,image/png,image/jpeg,image/heic,image/heif'}
            className={'hidden'}
            disabled={disabled}
            hidden
            id={id}
            onChange={handleFileChange}
            ref={inputRef}
            type={'file'}
          />

          <LogOutIcon
            className={cn('h-12 w-12 -rotate-90', dropping && 'animate-pulse')}
            viewBox={'0 0 24 24'}
          />
        </label>
      </div>
    )
  }
)
Dropzone.displayName = 'Dropzone'
