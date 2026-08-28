import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ConfirmModal.module.scss';

/**
 * ConfirmModal — a fully custom React modal, rendered via a Portal into document.body.
 * No third-party plugin — built with createPortal, useEffect, and native DOM events.
 *
 * Props:
 *   @prop {boolean} isOpen      — controls whether the modal is visible
 *   @prop {Function} onClose    — callback fired when the user closes the modal
 *   @prop {string} [title]      — heading shown at the top of the modal
 *   @prop {React.ReactNode} children — body content rendered inside the modal
 *
 * Usage:
 *   <ConfirmModal isOpen={showModal} onClose={() => setShowModal(false)} title="Success">
 *     Employee has been created!
 *   </ConfirmModal>
 */
function ConfirmModal({ isOpen, onClose, title = 'Confirmation', children }) {
  /* Close on Escape key press */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  /* Prevent background scroll while modal is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    /* Clicking the overlay backdrop closes the modal */
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      {/* Stop clicks inside the panel from bubbling up to the overlay */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>{title}</h2>
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
      </div>
    </div>,
    document.body
  );
}

export default ConfirmModal;
