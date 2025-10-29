import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import styles from '../../../styles/components/Auth.module.scss'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn
  error?: string
  label?: string
}

const FormInput = ({ 
  register, 
  error, 
  label,
  type = 'text',
  className = '',
  ...props 
}: FormInputProps) => {
  const inputClass = `${styles.form__input} ${
    error ? styles.form__inputError : styles.form__inputValid
  } ${className}`

  const messageClass = `${styles.form__inputMessage} ${
    error && styles.form__inputMessageError
  }`

  return (
    <div className={styles.form__inputGroup}>
      {label && <label className={styles.form__label}>{label}</label>}
      <input
        type={type}
        className={inputClass}
        {...register}
        {...props}
      />
      <p className={messageClass}>
        {error || ''}
      </p>
    </div>
  )
}

export default FormInput