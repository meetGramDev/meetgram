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

import { cn } from '@/shared/lib/cn'
import { Nullable } from '@/shared/types'

export type UploadRef = {
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
export const Upload = forwardRef<UploadRef, Props>(
  ({ children, className, disabled, onFileSelect, overlay = true }, ref) => {
    const inputRef = useRef<Nullable<HTMLInputElement>>(null)
    const id = useId()
    const [dropping, setDropping] = useState(false)

    useImperativeHandle(ref, () => {
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
        className={cn('group relative z-10 text-[0]', className)}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {children}
        <label
          className={cn(
            'pointer-events-none invisible absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full cursor-pointer bg-dark-100 opacity-0 duration-300 group-hover:opacity-30',
            overlay && 'pointer-events-auto visible cursor-pointer',
            dropping && 'pointer-events-auto visible opacity-30'
          )}
          htmlFor={id}
        >
          <input
            accept={'.jpg,.png,.jpeg'}
            className={'hidden'}
            disabled={disabled}
            hidden
            id={id}
            onChange={handleFileChange}
            ref={inputRef}
            type={'file'}
          />
        </label>
      </div>
    )
  }
)
Upload.displayName = 'Upload'
