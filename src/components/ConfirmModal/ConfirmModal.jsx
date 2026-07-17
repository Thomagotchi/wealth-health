import Modal from 'react-modal';
import styles from './ConfirmModal.module.scss';

/**
 * ConfirmModal — a lightweight confirmation dialog built on top of `react-modal`.
 *
 * Props:
 *   @prop {boolean} isOpen      — controls whether the modal is visible
 *   @prop {Function} onClose    — callback fired when the user closes the modal
 *   @prop {string} [title]      — optional heading shown at the top of the modal
 *   @prop {React.ReactNode} children — body content rendered inside the modal
 *
 * Usage:
 *   <ConfirmModal isOpen={showModal} onClose={() => setShowModal(false)} title="Success">
 *     Employee has been created!
 *   </ConfirmModal>
 *
 * Accessibility:
 *   Call Modal.setAppElement('#root') once at app startup (done in main.jsx)
 *   so screen readers correctly hide background content when the modal is open.
 */
function ConfirmModal({ isOpen, onClose, title = 'Confirmation', children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      /* Overlay and content class names pointing to our SCSS module */
      overlayClassName={styles.overlay}
      className={styles.modal}
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      <div className={styles.body}>{children}</div>

      <div className={styles.footer}>
        <button className={styles.okBtn} onClick={onClose}>
          OK
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
