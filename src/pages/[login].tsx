import { useRouter } from "next/dist/client/router";
import React from "react";

import styles from "../styles/User.module.css";

function User() {
  const router = useRouter();

  console.log(router);

  return (
    <div className={styles.container}>
      <main className={styles.main}>oie</main>
    </div>
  );
}

export default User;
