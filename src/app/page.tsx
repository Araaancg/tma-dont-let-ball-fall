"use client";
import { useState, useEffect } from "react";
import GameView from "@/components/gameVIew/GameView";
import StartView from "@/components/startView/StartView";
import EndView from "@/components/endView/EndView";
import { useUserData } from "@/hooks/useUserData";
import "./main.css";
import { useInitData } from "@tma.js/sdk-react";

const GameMain = () => {
  // GAME
  const [touches, setTouches] = useState<number>(0);
  const [appState, setAppState] = useState<"start" | "game" | "end">("start");
  const [position, setPosition] = useState(95);
  const [falling, setFalling] = useState(false);

  const initData = useInitData(true);

  const { userData, setUserData } = useUserData();

  useEffect(() => {
    setUserData(initData?.user);
  }, [initData, setUserData]);

  console.log(userData);

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

  const clickExit = () => {};

  return (
    <div className="main">
      {appState === "start" && (
        <StartView playerName={userData?.firstName} clickExit={clickExit} clickPlay={clickPlay} />
      )}
      {appState === "game" && <GameView touches={touches} position={position} onBallClick={handleClick} />}
      {appState === "end" && <EndView totalTouches={touches} clickPlay={clickPlay} clickExit={clickExit} />}
    </div>
  );
};

export default GameMain;
