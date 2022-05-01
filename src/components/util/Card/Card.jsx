import styles from "./Card.module.css";

const Card = ({ children, className }) => {
  return (
    <div className={styles.Card + " " + (className ?? "")}>{children}</div>
  );
};

export const CardContainer = ({ children, className }) => {
  return (
    <div className={styles.CardContainer + " " + (className ?? "")}>
      {children}
    </div>
  );
};

export default Card;
