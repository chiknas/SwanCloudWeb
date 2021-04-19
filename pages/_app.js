import React, { useState } from "react";
import "styles/globals.css";
import { GlobalContext } from "services/GlobalContext";

function MyApp({ Component, pageProps }) {
  const [serverUrl, setServerUrl] = useState("");
  const [serverKey, setServerKey] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        serverKey: serverKey,
        setServerKey: setServerKey,
        serverUrl: serverUrl,
        setServerUrl: setServerUrl,
      }}
    >
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

export default MyApp;
