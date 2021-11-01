// import { Icon } from './Icon'

import styles from "../styles/components/Input.module.css";
import { Icon } from "./Icon";

export interface InputProps {
  name: string;
  error: boolean;
  defaultValue?: string | string[];
}

export function Input(props: InputProps) {
  const { name, error, ...rest } = props;
  const errorStyle = error ? styles.error : "";

  return (
    <div className={styles.container}>
      <input id={name} type="text" className={errorStyle} {...rest} />
      <button type="submit">
        <Icon name="search" size="large" />
      </button>
    </div>
  );
}
