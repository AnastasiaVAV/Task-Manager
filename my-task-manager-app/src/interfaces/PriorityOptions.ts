import Task from './Task'

interface PriorityOption {
  value: Task['priority']
  label: string
}

const priorityOptions: PriorityOption[] = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
]

export default priorityOptions
