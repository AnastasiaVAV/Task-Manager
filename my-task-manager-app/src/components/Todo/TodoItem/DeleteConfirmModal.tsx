import Portal from '../../Portal'
import useCountdown from '../../../hooks/useCountdown'
import styles from '../../../styles/components/DeleteConfirmModal.module.scss'

interface Props {
  onCancel: () => void
  onConfirm: () => void
  seconds?: number
}

const DeleteConfirmModal = ({ onCancel, onConfirm, seconds = 5 }: Props) => {
  const { countdown } = useCountdown(seconds, onConfirm)

  return (
    <Portal>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Удалить задачу?</h3>
          <p className={styles.modalText}>
            Задача будет удалена через <strong>{countdown}</strong> секунд
          </p>
          <div className={styles.modalActions}>
            <button className={styles.closeButton} onClick={onCancel}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default DeleteConfirmModal
