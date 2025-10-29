import { useState, useEffect } from 'react'

import FiltersAside from './FiltersAside'
import Task from '../../interfaces/Task'

import TodoItem from './TodoItem'

import styles from '../../styles/components/TodoList.module.scss'

interface TodoListProps {
  todos: Task[]
}

type Filter = 'all' | 'active' | 'completed'


const TodoList = ({ todos }: TodoListProps) => {
  const [filteredTodos, setFilteredTodos] = useState(todos)
  const [filter, setFilter] = useState<Filter>('all')
  const [activeTodosCount, setActiveTodosCount] = useState(0)

  useEffect(() => {
    const activeTodosCount = todos.filter(task => !task.completed).length
    setActiveTodosCount(activeTodosCount)

    switch (filter) {
    case 'active':
      setFilteredTodos(todos.filter(todo => !todo.completed))
      return
    case 'completed':
      setFilteredTodos(todos.filter(todo => todo.completed))
      return
    default:
      setFilteredTodos(todos)
      return
    }
  }, [todos, filter])

  return (
    <div className={styles.todoContainer}>
      <ul className="todo-list__list">
        {filteredTodos.map((task) => {
          return (
            <TodoItem
              key={task.id}
              task={task}
            />
          )
        })}
      </ul>
      <FiltersAside 
        filter={filter} 
        setFilter={setFilter} 
        activeTodosCount={activeTodosCount} 
      />
    </div>
  )
}

export default TodoList
