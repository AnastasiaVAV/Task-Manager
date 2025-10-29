import { useState } from 'react'
import { Pencil, Trash2, Save, X } from 'lucide-react'

import type Task from '../../interfaces/Task'
import priorityOptions from '../../interfaces/PriorityOptions'

import TodoButtons from './TodoItem/TodoButtons'
import TodoTextEditor from './TodoItem/TodoTextEditor'
import TodoPriorityOption from './TodoItem/TodoPriorityOption'
import DeleteConfirmModal from './TodoItem/DeleteConfirmModal'

import { 
  useEditTextTaskMutation, 
  useToggleCompletedTaskMutation, 
  useEditPriorityTaskMutation,
  useRemoveTaskMutation,
} from '../../api/supabaseApi'
import styles from '../../styles/components/TodoItem.module.scss'

interface Props {
  task: Task
}

const TodoItem = ({ task }: Props) => {
  const { id, text, completed, priority } = task

  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(text)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [toggleCompletedTask] = useToggleCompletedTaskMutation()
  const [editTask] = useEditTextTaskMutation()
  const [editPriorityTask] = useEditPriorityTaskMutation()
  const [removeTask] = useRemoveTaskMutation()

  const handleSaveEdit = async () => {
    if (!editedTask.trim()) return
    await editTask({ id, text: editedTask.trim() }).unwrap()
    setIsEditing(false)
  }

  const handleChangePriority = async (p: Task['priority']) => {
    await editPriorityTask({ id, priority: p }).unwrap()
  }

  const handleToggleCompleted = () => toggleCompletedTask({ id, completed })

  const handleRemoveTask = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    console.log('remove task')
    setIsDeleteModalOpen(true)
  }

  const cancelDelete = () => {
    setIsDeleteModalOpen(false)
  }

  const confirmDelete = async () => {
    try {
      await removeTask({ id }).unwrap()
      console.log(`Удалена задача с id: ${id}`)
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error)
    } finally {
      setIsDeleteModalOpen(false)
    }
  }

  const buttons = isEditing
    ? [
      { key: 'save', label: <Save size={16} />, onClick: handleSaveEdit, ariaLabel: 'Сохранить' },
      { key: 'cancel', label: <X size={16} />, onClick: () => setIsEditing(false), ariaLabel: 'Отмена' },
    ]
    : [
      { key: 'edit', label: <Pencil size={16} />, onClick: () => setIsEditing(true), ariaLabel: 'Редактировать' },
      { key: 'delete', label: <Trash2 size={16} />, onClick: handleRemoveTask, ariaLabel: 'Удалить' },
    ]

  return (
    <li className={styles.todoItem}>
      {isEditing ? (
        <TodoTextEditor
          id={id}
          value={editedTask}
          isEditing={isEditing}
          onChange={setEditedTask}
          onSubmit={e => {
            e.preventDefault()
            handleSaveEdit()
          }}
        />
      ) : (
        <div className={styles.view}>
          <input
            type="checkbox"
            id={id}
            checked={completed}
            onChange={handleToggleCompleted}
            className={styles.checkbox}
          />
          <label
            htmlFor={id}
            className={`${styles.label} ${completed ? styles.labelCompleted : ''}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {text}
          </label>
        </div>
      )}
      <div className={styles.priority}>
        <div className={styles.priorityOptions}>
          {priorityOptions.map(option => (
            <TodoPriorityOption
              key={option.value}
              id={id}
              value={option.value}
              label={option.label}
              checked={priority === option.value}
              onChange={handleChangePriority}
            />
          ))}
        </div>
      </div>
      <TodoButtons buttons={buttons} />
      {isDeleteModalOpen && (
        <DeleteConfirmModal onCancel={cancelDelete} onConfirm={confirmDelete} seconds={10} />
      )}
    </li>
  )
}

export default TodoItem
