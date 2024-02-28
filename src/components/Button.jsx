import styles from "./Button.module.css";
import { useNavigate } from "react-router";


export default function Button({ children, onClick, type }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
