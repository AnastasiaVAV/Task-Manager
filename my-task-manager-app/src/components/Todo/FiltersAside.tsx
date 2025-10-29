import styles from '../../styles/components/FiltersAside.module.scss'

type Filter = 'all' | 'active' | 'completed'

interface Props {
  filter: Filter
  activeTodosCount: number
  setFilter: (key: Filter) => void
}

const filterButtons: { key: Filter, label: string, ariaLabel: string }[] = [
  { key: 'all', label: 'Все', ariaLabel: 'Показать все задачи' },
  { key: 'active', label: 'Активные', ariaLabel: 'Показать активные задачи' },
  { key: 'completed', label: 'Завершенные', ariaLabel: 'Показать завершенные задачи' },
]

const getTasksText = (count: number): string => {
  if (count === 0) return 'Нет активных задач'
  if (count === 1) return `Осталась ${count} задача`
  if (count >= 2 && count <= 4) return `Осталось ${count} задачи`
  return `Осталось ${count} задач`
}

const FiltersAside = ({ filter, setFilter, activeTodosCount }: Props) => {
  const buttonsClasses = (buttonFilter: Filter) => {
    return filter === buttonFilter
      ? `${styles.filterButton} ${styles.buttonActive}`
      : `${styles.filterButton} ${styles.buttonInactive}`
  }

  return (
    <aside className={styles.filtersAside}>
      <div className={styles.filtersButtons}>
        {filterButtons.map(({ key, label, ariaLabel }) => (
          <button
            key={key}
            type="button"
            className={buttonsClasses(key)}
            onClick={() => setFilter(key)}
            disabled={filter === key}
            aria-label={ariaLabel}
          >
            {label}
          </button>
        ))}
      </div>
      {filter === 'all' && <p className={styles.tasksCounter}>{getTasksText(activeTodosCount)}</p>}
    </aside>
  )
}

export default FiltersAside
