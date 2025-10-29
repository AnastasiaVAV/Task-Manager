import type { Dispatch, SetStateAction } from 'react'
import type Task from './Task'

export interface BaseTodoProps {
  todos: Task[]
  setTodos: Dispatch<SetStateAction<Task[]>>
}

export interface TodoItemProps extends BaseTodoProps {
  currentTask: Task
}
