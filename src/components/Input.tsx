// import { Icon } from './Icon'

import styles from "../styles/components/Input.module.css";

export interface InputProps {
  name: string;
  error: boolean;
}

export function Input(props: InputProps) {
  const { name, error } = props;
  const errorStyle = error ? styles.error : "";

  return (
    <div className={styles.container}>
      <input id={name} type="text" className={errorStyle} />
      <button type="submit">SEARCH</button>
    </div>
  );
}
