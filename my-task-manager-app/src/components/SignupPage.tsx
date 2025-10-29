import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from './Todo/Auth/FormInput'

import useAuth from '../hooks/useAuth'
import { useAddUserMutation } from '../api/supabaseApi'
import styles from '../styles/components/Auth.module.scss'

interface SignupFormData {
  login: string
  password: string
  confirmPassword: string
  username: string
}

const schema = yup.object({
  login: yup.string().required('Обязательное поле'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
  username: yup.string().required('Обязательное поле'),
})

const SignupPage = () => {
  const [submitError, setSubmitError] = useState('')
  
  const [addUser] = useAddUserMutation()
  const { logIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: SignupFormData) => {
    setSubmitError('')
    
    const result = await addUser({
      login: data.login,
      password: data.password,
      username: data.username,
    })

    if (result.error) {
      setSubmitError('Ошибка регистрации. Возможно, такой пользователь уже существует.')
      return
    }

    if (result.data) {
      logIn({ id: result.data.id, username: result.data.username })
      navigate('/tasks')
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authPage__container}>
        <h2 className={styles.authPage__title}>Зарегистрироваться</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            register={register('login')}
            error={errors.login?.message}
            placeholder="Логин"
          />

          <FormInput
            register={register('username')}
            error={errors.username?.message}
            placeholder="Имя пользователя"
          />

          <FormInput
            register={register('password')}
            error={errors.password?.message}
            type="password"
            placeholder="Пароль"
          />

          <FormInput
            register={register('confirmPassword')}
            error={errors.confirmPassword?.message}
            type="password"
            placeholder="Подтвердите пароль"
          />

          {submitError && (
            <p className={styles.form__submitError}>
              {submitError}
            </p>
          )
          }

          <button
            className={`button button-primary ${styles.form__button}`}
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>

          <div className={styles.form__link}>
            <span>
              Уже есть профиль?
            </span>
            <NavLink
              to="/"
              className={styles.form__link__NavLink}
            >
              Войти
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage