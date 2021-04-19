import Head from "next/head";
import React from "react";
import styles from "styles/Home.module.css";

export const PageContainer: React.FunctionComponent = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Swan Cloud</title>
        <link rel="icon" href="/swan.svg" />
      </Head>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/chiknas/SwanCloudServer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/swan.svg" alt="Swan Logo" className={styles.logo} />
          <b>SwanCloud</b>
        </a>
      </footer>
    </div>
  );
};
