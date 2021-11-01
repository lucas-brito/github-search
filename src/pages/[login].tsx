import React, { useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

import styles from "../styles/pages/User.module.css";
import { Brand } from "../components/Brand";
import { Input } from "../components/Input";
import {
  RepositoryItem,
  RepositoryItemProps,
  REPOSITORY_ITEM_FRAGMENT,
} from "../components/RepositoryItem";
import { Icon } from "../components/Icon";

const GET_USER = gql`
  query UserQuery($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      location
      starredRepositories {
        totalCount
      }
      followers {
        totalCount
      }
      organizations(first: 1) {
        nodes {
          name
        }
      }
      repositories(first: 20) {
        nodes {
          id
          ...RepositoryItemFields
        }
        totalCount
      }
    }
  }
  ${REPOSITORY_ITEM_FRAGMENT}
`;

function User() {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { login: router.query.login },
  });

  function handleSumit(e: React.FormEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    if (!target.search.value) {
      setHasError(true);
      return;
    }

    router.push("/" + target.search.value);
  }

  const userNotFound = !loading && error;

  let content;

  if (userNotFound) {
    content = <p className={styles.error}>{"User not found :("}</p>;
  } else if (loading) {
    content = <div>Loading...</div>;
  } else {
    content = data.user.repositories.nodes.map(
      (
        repo: RepositoryItemProps & {
          id: string;
        }
      ) => <RepositoryItem key={repo.id} {...repo} />
    );
  }

  let info;

  if (data) {
    const { user } = data;

    info = (
      <div>
        <img className={styles.avatar} src={user.avatarUrl} alt="User avatar" />
        <p className={styles.name}>{user.name}</p>
        <p className={styles.login}>{router.query.login}</p>
        {!!user.organizations.nodes.length && (
          <p>
            <Icon name="organization" />
            {user.organizations.nodes[0].name}
          </p>
        )}
        {!!user.location && (
          <p>
            <Icon name="location" />
            {user.location}
          </p>
        )}
        <p>
          <Icon name="star" />
          {user.starredRepositories.totalCount}
        </p>
        <p>
          <Icon name="repositorie" />
          {user.repositories.totalCount}
        </p>
        <p>
          <Icon name="followers" />
          {user.followers.totalCount}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header>
        <Brand size="small" />
        <div />
        <form className="form" onSubmit={handleSumit}>
          <Input
            name="search"
            error={hasError}
            defaultValue={router.query.login || ""}
          />
        </form>
      </header>

      <main className={userNotFound || loading ? styles.simple : ""}>
        <section className={styles.info}>{info}</section>
        <div className={styles.empty} />
        <section className={styles.content}>{content}</section>
      </main>
    </div>
  );
}

export default User;
