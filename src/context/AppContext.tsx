"use client";
import React, { createContext, useState, ReactNode } from "react";
import { SDKProvider, useInitData, type User } from "@tma.js/sdk-react";

interface AppContextProps {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}

const userDataInitialState = {
  firstName: "",
  lastName: "",
  userName: "",
  id: 0,
};

export const AppContext = createContext<AppContextProps>({
  userData: userDataInitialState,
  setUserData: () => {},
});

const AppContextInternalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initData = useInitData();
  const [userData, setUserData] = useState(initData?.user || userDataInitialState);

  return <AppContext.Provider value={{ userData, setUserData }}>{children}</AppContext.Provider>;
};

const SDKInitializer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SDKProvider acceptCustomStyles>
      <SDKInitializer>
        <AppContextInternalProvider>{children}</AppContextInternalProvider>
      </SDKInitializer>
    </SDKProvider>
  );
};
