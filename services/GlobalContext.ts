import React from "react";

export const GlobalContextDefaultValue = {
  serverUrl: "",
  setServerUrl: () => {},
  serverKey: "",
  setServerKey: () => {},
};

export type GlobalContextType = {
  serverUrl: string;
  setServerUrl: (value: string) => void;
  serverKey: string;
  setServerKey: (value: string) => void;
};

export const GlobalContext = React.createContext<GlobalContextType>(
  GlobalContextDefaultValue
);
