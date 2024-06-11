// "use client";
// import { useEffect, useRef, useState } from "react";
// import WebApp from '@twa-dev/sdk'
// import "./game.css";

// export default function Home() {
//   const [isGreen, setIsGreen] = useState<boolean>(false)
//   const [total, setTotal] = useState<number>(0);
//   const [ballY, setBallY] = useState(0);
//   const [isFalling, setIsFalling] = useState<boolean>(false);

//   const ballRef = useRef(null);

//   const jumpHeight = 250;
//   const fallTimeout = 100; // time before ball starts to fall

//   const onClick = () => {
//     setIsFalling(false);
//     setBallY(ballY + jumpHeight);
//     setTotal((prevState) => prevState + 1);

//     setTimeout(() => setIsFalling(true), fallTimeout); // Start falling after timeout
//   };

//   useEffect(() => console.log(`falling: ${isFalling}`), [isFalling])

//   useEffect(() => {
//     let animationFrameId: number;

//     const animateFall = () => {
//       if (isFalling && ballY > 0) {
//         const newBallY = Math.max(ballY - 5, 0); // Fall 5px per frame, but not below 0
//         setBallY(newBallY);
//         animationFrameId = requestAnimationFrame(animateFall);
//       }
//     };

//     if (isFalling) {
//       animationFrameId = requestAnimationFrame(animateFall);
//     }

//     return () => {
//       cancelAnimationFrame(animationFrameId); // Clean up animation on component unmount
//     };
//   }, [isFalling, ballY]);

//   return (
//     <main onClick={() => setIsGreen(!isGreen)}>
//       <h1 className="gluten-800">Touch the ball to change color!</h1>
//       <p>total {total}</p>
//       <div
//         className={`ball ${isGreen ? "green":"purple"}`}
//         ref={ballRef}
//         style={{ bottom: ballY }}
//       />
//       <div className="line"></div>
//     </main>
//   );
// }

"use client";
import { useEffect, useRef, useState } from "react";
import WebApp from "@twa-dev/sdk";
import "./game.css";

export default function Home() {
  const [isGreen, setIsGreen] = useState<boolean>(false);

  useEffect(() => {
    WebApp.ready();
  }, []);

  const handleTouch = () => setIsGreen(!isGreen);

  return (
    <main onClick={handleTouch}>
      <h1 className="gluten-800">Touch the ball to change color!</h1>
      <div className={`ball ${isGreen ? "green" : "purple"}`} />
    </main>
  );
}
