import Priority from '../types/Priority'

interface Task {
  id: string
  text: string
  completed: boolean
  priority: Priority
  created_at: string
  userId: string
}

export default Task
