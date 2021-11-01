import { gql } from "@apollo/client";

import styles from "../styles/components/RepositoryItem.module.css";
import { Icon } from "./Icon";

export interface RepositoryItemProps {
  name: string;
  description?: string;
  stargazerCount: number;
  url: string;
}

export const REPOSITORY_ITEM_FRAGMENT = gql`
  fragment RepositoryItemFields on Repository {
    name
    description
    stargazerCount
    url
  }
`;

export function RepositoryItem(props: RepositoryItemProps) {
  const { name, description, stargazerCount, url } = props;

  return (
    <div className={styles.container}>
      <a href={url} target="_blank" rel="noreferrer noopener">
        <p className={styles.name}>{name}</p>
        {description && <p className={styles.description}>{description}</p>}
        <p className={styles.stars}>
          <Icon name="star" />
          {stargazerCount}
        </p>
      </a>
    </div>
  );
}
