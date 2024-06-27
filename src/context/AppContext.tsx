"use client";
import React, { createContext, useState, ReactNode } from "react";
import { SDKProvider, type User, type Chat } from "@tma.js/sdk-react";

interface AppContextProps {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  chatData: Chat;
  setChatData: React.Dispatch<React.SetStateAction<any>>;
}

const initDataInitialState = {
  user: {
    firstName: "",
    lastName: "",
    userName: "",
    id: 0,
    languageCode: "en",
  },
  chat: {
    id: 0,
    type: "",
    title: "",
  },
};

export const AppContext = createContext<AppContextProps>({
  userData: initDataInitialState.user,
  setUserData: () => {},
  chatData: initDataInitialState.chat,
  setChatData: () => {},
});

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState(initDataInitialState.user);
  const [chatData, setChatData] = useState(initDataInitialState.chat);

  return (
    <SDKProvider acceptCustomStyles debug>
      <AppContext.Provider value={{ userData, setUserData, chatData, setChatData }}>{children}</AppContext.Provider>
    </SDKProvider>
  );
};
