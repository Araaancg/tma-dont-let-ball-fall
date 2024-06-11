"use client";
import { useState, useEffect } from "react";
import GameView from "@/components/gameVIew/GameView";
import StartView from "@/components/startView/StartView";
import EndView from "@/components/endView/EndView";
import WebApp from "@twa-dev/sdk";
import "./main.css";

const GameMain = () => {
  const [touches, setTouches] = useState<number>(0);
  const [appState, setAppState] = useState<"start" | "game" | "end">("start");
  const [position, setPosition] = useState(95);
  const [falling, setFalling] = useState(false);

  useEffect(() => {
    const initializeBot = async () => {
      if (WebApp.initDataUnsafe?.query_id) {
        try {
          const response = await fetch("/api/sendMessage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              queryId: WebApp.initDataUnsafe.query_id,
              message: "Hi! Welcome to the game! The only rule: You can NOT let the ball fall",
              buttonUrl: "t.me/AranchasBot/aransFootballGame", // Replace with actual URL
            }),
          });
          const data = await response.json();
          console.log("Bot response:", data);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    };
    initializeBot();
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
  const clickExit = () => {};

  return (
    <div className="main">
      {appState === "start" && (
        <StartView clickExit={clickExit} clickPlay={clickPlay} />
      )}
      {appState === "game" && (
        <GameView touches={touches} position={position} onBallClick={handleClick} />
      )}
      {appState === "end" && (
        <EndView
          totalTouches={touches}
          clickPlay={clickPlay}
          clickExit={clickExit}
        />
      )}
    </div>
  );
};

export default GameMain;
