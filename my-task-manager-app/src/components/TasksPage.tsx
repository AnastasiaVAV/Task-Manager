import TodoForm from './Todo/TodoForm'
import TodoList from './Todo/TodoList'

import useAuth from '../hooks/useAuth'
import { useGetTasksQuery } from '../api/supabaseApi'
import styles from '../styles/components/TasksPage.module.scss'

const TasksPage = () => {
  const { getUserId } = useAuth()
  const userId = getUserId()

  const { data, isLoading, error } = useGetTasksQuery({ userId })
  
  console.log('Tasks data:', data)

  return (
    <div className={styles.TasksPage}>
      <TodoForm />
      {!isLoading && !error
        ? <TodoList todos={data || []} />
        : (
          <div className={styles.error}>
            <p>
              {isLoading 
                ? 'Загрузка задач...' 
                : 'Ошибка при загрузке задач. Перезагрузите страницу'
              }
            </p>
          </div>
        )
      }
      
    </div>
  )
}

export default TasksPage