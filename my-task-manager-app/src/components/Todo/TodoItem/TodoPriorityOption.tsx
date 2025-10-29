import type { InputHTMLAttributes, ChangeEvent } from 'react'
import type Priority from '../../../types/Priority'
import styles from '../../../styles/components/PriorityRadio.module.scss'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  id?: string
  value: Priority
  label: string
  checked?: boolean
  onChange?: ((value: Priority) => void) | ((e: ChangeEvent<HTMLInputElement>) => void)
}

const TodoPriorityOption = ({
  id,
  value,
  label,
  checked,
  onChange,
  ...rest
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') {
      if (onChange.length === 1 && typeof e.target.value === 'string') {
        (onChange as (v: Priority) => void)(e.target.value as Priority)
      } else {
        (onChange as (e: ChangeEvent<HTMLInputElement>) => void)(e)
      }
    }
  }

  return (
    <label 
      className={styles.priorityRadio} 
      title={label}
      data-priority={value}
    >
      <input
        type="radio"
        id={id ? `${id}-${value}` : undefined}
        value={value}
        checked={checked}
        onChange={handleChange}
        className={styles.input}
        {...rest}
      />
      <span
        className={`${styles.circle} ${
          checked ? styles.circleSelected : ''
        }`}
      >
        {checked && <span className={styles.dot} />}
      </span>
    </label>
  )
}

export default TodoPriorityOption
