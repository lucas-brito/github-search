import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";

import { Brand } from "../components/Brand";
import { Input } from "../components/Input";

import styles from "../styles/pages/Home.module.css";

function Home() {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);

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

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Brand />
        <form className="form" onSubmit={handleSumit}>
          <Input name="search" error={hasError} />
        </form>
      </main>
    </div>
  );
}

export default Home;
