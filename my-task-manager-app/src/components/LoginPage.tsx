import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from './Todo/Auth/FormInput'

import { useLazyGetUserQuery } from '../api/supabaseApi'
// import { actions as authActions } from '../slices/authSlice'
import styles from '../styles/components/Auth.module.scss'
import useAuth from '../hooks/useAuth'

interface LoginFormData {
  login: string
  password: string
}

const schema = yup.object({
  login: yup.string().required('Обязательное поле'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
})

const LoginPage = () => {
  const [submitError, setSubmitError] = useState('')
  const [getUser] = useLazyGetUserQuery()
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const { logIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError('')
    const { data: user, error } = await getUser({
      login: data.login,
      password: data.password,
    })

    if (error) {
      setSubmitError('Неверный логин или пароль')
      return
    }

    if (user) {
      // dispatch(authActions.logIn({ id: user.id, username: user.username }))
      logIn({ id: user.id, username: user.username })
      navigate('/tasks')
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authPage__container}>
        <h3 className={styles.authPage__title}>Войти</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            register={register('login')}
            error={errors.login?.message}
            placeholder="Логин"
          />

          <FormInput
            register={register('password')}
            error={errors.password?.message}
            type="password"
            placeholder="Пароль"
          />

          {submitError && (
            <p className={styles.form__submitError}>
              {submitError}
            </p>
          )}

          <button
            className={`button button-primary ${styles.form__button}`}
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
          <div className={styles.form__link}>
            <span>
              Нет профиля?
            </span>
            <NavLink
              to='/signup'
              className={styles.form__link__NavLink}
            >
              Зарегистрироваться
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage