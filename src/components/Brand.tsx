import styles from "../styles/components/Brand.module.css";

export interface BrandProps {
  size?: "small" | "normal";
}

export function Brand(props: BrandProps) {
  const { size } = props;

  return (
    <div className={`${styles.container} ${size ? styles[size] : ""}`}>
      <span>Github</span> Search
    </div>
  );
}
