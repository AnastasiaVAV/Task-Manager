import { useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import styles from '../../../styles/components/TodoItem.module.scss'

interface Props {
  id: string
  value: string
  isEditing: boolean
  onChange: (value: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const TodoTextEditor = ({ id, value, isEditing, onChange, onSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  if (!isEditing) return null

  return (
    <form
      className={styles.editForm}
      onSubmit={onSubmit}
      aria-label="Редактирование задачи"
    >
      <input
        type="text"
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.editInput}
        ref={inputRef}
      />
    </form>
  )
}

export default TodoTextEditor
