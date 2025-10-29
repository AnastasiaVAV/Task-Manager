import { useEffect } from 'react'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import type Priority from '../../types/Priority'

import TodoPriorityOption from './TodoItem/TodoPriorityOption'

import { useAddTaskMutation } from '../../api/supabaseApi'

import styles from '../../styles/components/TodoForm.module.scss'
import radioStyles from '../../styles/components/PriorityRadio.module.scss'
import useAuth from '../../hooks/useAuth'

interface TodoFormData {
  text: string
  priority: Priority
}

const schema = yup.object({
  text: yup.string().trim().required('Задача обязательна для заполнения').min(1, 'Задача не может быть пустой'),
  priority: yup.string().oneOf(['low', 'medium', 'high']).required('Выберите приоритет'),
})

const priorityOptions = [
  { value: 'low' as Priority, label: 'Низкий', color: '#5ac79a' },
  { value: 'medium' as Priority, label: 'Средний', color: '#4753bb' },
  { value: 'high' as Priority, label: 'Высокий', color: '#eb766d' },
]

const TodoForm = () => {
  const { getUserId } = useAuth()
  const userId = getUserId()
  const [addTask] = useAddTaskMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setFocus,
    watch,
  } = useForm<TodoFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      priority: 'low',
    },
  })

  const selectedPriority = watch('priority')

  useEffect(() => {
    setFocus('text')
  }, [setFocus])

  const onSubmit = (data: TodoFormData) => {
    const trimmedTask = data.text.trim()

    if (!trimmedTask) return

    console.log('submit', {
      text: trimmedTask,
      priority: data.priority,
    })

    const newTask: TodoFormData = {
      text: trimmedTask,
      priority: data.priority,
    }

    addTask({ userId, newTask })
    reset()
    setFocus('text')
  }

  return (
    <div className={styles.todoForm}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Добавление задачи"
      >
        <div className={styles.inputGroup}>
          <input
            type="text"
            {...register('text')}
            className={`${styles.input} ${errors.text ? styles.inputError : ''}`}
            placeholder="Новая задача"
            id="textInput"
          />
          {errors.text && (
            <p className={styles.error}>
              {errors.text.message}
            </p>
          )}
        </div>
    
        <div className={styles.priority}>
          <span className={styles.priorityLabel}>Приоритет</span>
          <div className={`${radioStyles.priorityRadioGroup} ${radioStyles.priorityRadioGroupHorizontal}`}>
            {priorityOptions.map((option) => (
              <div className={styles.priorityOption} key={option.value}>
                <TodoPriorityOption
                  key={option.value}
                  {...register('priority')}
                  value={option.value}
                  label={option.label}
                  color={option.color}
                  checked={selectedPriority === option.value}
                />
                <span className={styles.priorityText}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
          {errors.priority && (
            <p className={styles.error}>
              {errors.priority.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="button button-secondary"
          disabled={!isValid}
          aria-label="Добавить новую задачу"
        >
          Добавить
        </button>
      </form>
    </div>
  )
}

export default TodoForm