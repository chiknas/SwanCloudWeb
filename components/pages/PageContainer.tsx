import Head from "next/head";
import React, { useContext, useState } from "react";
import styles from "styles/Home.module.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, InputBase } from "@material-ui/core";
import { GlobalContextType, GlobalContext } from "services/GlobalContext";
import { sha256 } from "js-sha256";
import IconButton from "@material-ui/core/IconButton";
import HttpsRoundedIcon from "@material-ui/icons/HttpsRounded";

export const PageContainer: React.FunctionComponent = ({ children }) => {
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  const { setServerUrl, setServerKey } = useContext<GlobalContextType>(
    GlobalContext
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Swan Cloud</Typography>
          <div className={styles.search}>
            <InputBase
              autoFocus={true}
              placeholder="Server URL"
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <div className={styles.search}>
            <InputBase
              type="password"
              placeholder="Password"
              onChange={(event) => setKey(sha256(event.target.value))}
            />
          </div>
          <IconButton
            onClick={() => {
              setServerUrl(url);
              setServerKey(key);
            }}
          >
            <HttpsRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

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
            <Typography variant="subtitle1">
              Powered by{" "}
              <img src="/swan.svg" alt="Swan Logo" className={styles.logo} />{" "}
              <b>SwanCloud</b>
            </Typography>
          </a>
          <a
            href="https://github.com/chiknas/SwanCloudWeb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography variant="subtitle2">
              Source code: github.com/chiknas/SwanCloudWeb
            </Typography>
          </a>
        </footer>
      </div>
    </>
  );
};
