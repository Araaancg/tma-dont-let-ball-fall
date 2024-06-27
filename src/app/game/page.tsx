"use client";
import { useState, useEffect } from "react";
import GameView from "@/components/gameVIew/GameView";
import StartView from "@/components/startView/StartView";
import EndView from "@/components/endView/EndView";
import { useUserData } from "@/hooks/useUserData";
import { initPopup, initBackButton, initMainButton, initMiniApp } from "@tma.js/sdk";
import { useRouter } from "next/navigation";
import "../main.css";

const GamePage = () => {
  // GAME
  const [touches, setTouches] = useState<number>(0);
  const [appState, setAppState] = useState<"start" | "game" | "end">("start");
  const [position, setPosition] = useState(95);
  const [falling, setFalling] = useState(false);

  const { userData } = useUserData();

  const popup = initPopup();
  const [backButton] = initBackButton();
  const [mainButton] = initMainButton();
  const [miniApp] = initMiniApp();

  const router = useRouter();

  useEffect(() => {
    backButton.show();
    // mainButton.enable();
    // mainButton.show();
    miniApp.setHeaderColor("#112daa");
    // miniApp.requestContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // When dismount the component, reset the values
    return () => {
      backButton.hide();
      miniApp.setHeaderColor("#212121");
    };
  }, []);

  useEffect(() => {
    if (falling) {
      const interval = setInterval(() => {
        setPosition((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            setAppState("end");
            return prev;
          }
          return prev + 0.5;
        });
      }, 10);

      return () => clearInterval(interval);
    }
  }, [falling]);

  const handleClick = () => {
    if (appState === "end") return;
    setFalling(false);
    setTouches((prev) => prev + 1);
    setPosition((prev) => Math.max(0, prev - 30));
    setTimeout(() => setFalling(true), 100);
  };

  const clickPlay = () => {
    setAppState("game");
  };

  const clickExit = () => {
    popup
      .open({
        title: "Are you sure?",
        message: "We don't want you to leave",
        buttons: [
          { id: "my-id", type: "default", text: "Yes, I want" },
          // { id: "my-id2", type: "cancel" },
          // { id: "my-id3", type: "ok" },
          { id: "my-id4", type: "close" },
        ],
      })
      .then((buttonId: any) => {
        if (buttonId === "my-id") {
          miniApp.close();
        }
      });
  };

  // Clicking the BackButton navigate to home
  backButton.on("click", () => {
    router.push("/");
  });

  return (
    <div className="main">
      {appState === "start" && (
        <StartView playerName={userData?.firstName ?? "player"} clickExit={clickExit} clickPlay={clickPlay} />
      )}
      {appState === "game" && <GameView touches={touches} position={position} onBallClick={handleClick} />}
      {appState === "end" && <EndView totalTouches={touches} clickPlay={clickPlay} clickExit={clickExit} />}
    </div>
  );
};

export default GamePage;
