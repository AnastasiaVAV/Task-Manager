import type { InputHTMLAttributes } from 'react'
import type Priority from '../../../types/Priority'
import styles from '../../../styles/components/PriorityRadio.module.scss'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  id?: string
  value: Priority
  label: string
  checked?: boolean
  onChange?: (value: Priority) => void
}

const TodoPriorityOption = ({
  id,
  value,
  label,
  checked,
  onChange,
  ...rest
}: Props) => {
  const handleChange = () => {
    if (onChange) {
      onChange(value)
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