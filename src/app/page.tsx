"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useUserData } from "@/hooks/useUserData";
import { useInitData } from "@tma.js/sdk-react";
import { initPopup, initMiniApp } from "@tma.js/sdk";
import "./main.css";
import "../components/startView/startView.css";

const HomePage = () => {
  const initData = useInitData(true);

  const popup = initPopup();
  const [miniApp] = initMiniApp();

  const { userData, setUserData } = useUserData();

  useEffect(() => {
    setUserData(initData?.user);
  }, [initData]);

  const handleExit = () => {
    popup
      .open({
        title: "Are you sure?",
        message: "We don't want you to leave",
        buttons: [{ id: "exit-app", type: "default", text: "Yes" }],
      })
      .then((buttonId: any) => {
        buttonId === "exit-app" && miniApp.close();
      });
  };

  return (
    <div className="main">
      <div className="startView">
        <h1 className="title">Welcome, {userData?.firstName}!!</h1>
        <h4 style={{ color: "white" }}>Get ready for an exciting adventure in our epic game.</h4>
        <div>
          <Link href="/game" className="buttons play">
            Start Game!!
          </Link>
          <Link href="/wallet" className="buttons play">
            Connect Wallet
          </Link>
          <button className="buttons exit" onClick={handleExit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
