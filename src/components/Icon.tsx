import styles from "../styles/components/Icon.module.css";

interface IconProps {
  name: string;
  size?: "normal" | "large";
}

export function Icon(props: IconProps) {
  const { name, size, ...rest } = props;
  const sizeStyles = !size ? "" : styles[size];

  return (
    <img
      className={`${styles.icon} ${sizeStyles}`}
      src={`/icons/${name}.png`}
      alt={name}
      {...rest}
    />
  );
}
