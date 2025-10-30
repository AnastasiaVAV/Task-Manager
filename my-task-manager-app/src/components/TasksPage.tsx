import TodoForm from './Todo/TodoForm'
import TodoList from './Todo/TodoList'

import useAuth from '../hooks/useAuth'
import { useGetTasksQuery } from '../api/supabaseApi'
import styles from '../styles/components/TasksPage.module.scss'

const TasksPage = () => {
  const { getUserId } = useAuth()
  const userId = getUserId()

  const { data, isLoading, error } = useGetTasksQuery({ userId })
  
  return (
    <>
      {isLoading || error
        ? (
          <div className={styles.error}>
            <p>
              {isLoading 
                ? 'Загрузка задач...' 
                : 'Ошибка при загрузке задач. Перезагрузите страницу'
              }
            </p>
          </div>
        )
        : (
          <div className={styles.TasksPage}>
            <TodoForm />
            <TodoList todos={data || []} />
          </div>
        )

      }
    </>
    
  )
}

export default TasksPage