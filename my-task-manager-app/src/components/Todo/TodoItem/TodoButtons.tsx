import styles from '../../../styles/components/TodoItem.module.scss'

interface Button {
  key: string
  label: React.ReactNode
  onClick: () => void
  ariaLabel: string
}

interface Props {
  buttons: Button[]
}

const TodoButtons = ({ buttons }: Props) => (
  <div className={styles.todoItemButtons}>
    {buttons.map(({ key, label, onClick, ariaLabel }) => (
      <button
        key={key}
        type="button"
        onClick={onClick}
        className={styles.todoItemButton}
        aria-label={ariaLabel}
      >
        {label}
      </button>
    ))}
  </div>
)

export default TodoButtons
