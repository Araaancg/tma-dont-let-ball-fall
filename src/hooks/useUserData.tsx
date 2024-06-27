import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useUserData() {
  const { userData, setUserData } = useContext(AppContext);
  return { userData, setUserData };
}
