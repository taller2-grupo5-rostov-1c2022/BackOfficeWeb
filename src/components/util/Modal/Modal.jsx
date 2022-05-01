import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

const Modal = ({ children, open, onBlur, className }) => {
  if (!open) return null;

  const handleBlur = (e) => e.target === e.currentTarget && onBlur?.();

  return createPortal(
    <div className={styles.ModalContainer} onClick={handleBlur}>
      <div className={styles.Modal + " " + className}>{children}</div>
    </div>,
    document.getElementById("modal") // #modal should be in index.html
  );
};

export const ModalHeader = ({ title, onClose }) => {
  return (
    <div className={styles.ModalHeader}>
      <h2>{title}</h2>
      <span className={"material-icons " + styles.Close} onClick={onClose}>
        close
      </span>
    </div>
  );
};

export default Modal;
