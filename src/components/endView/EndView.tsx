import "./endView.css";

const EndView = ({
  totalTouches,
  clickPlay,
  clickExit,
}: {
  totalTouches: number;
  clickPlay: () => void;
  clickExit: () => void;
}) => {
  return (
    <div className="gameOver">
      <h1 className="title">Game Over!</h1>
      <h2 className="subtitle">Total touches: {totalTouches}</h2>
      <div>
        <button
          className="buttons play"
          type="button"
          onClick={clickPlay}
        >
          Play Again
        </button>
        <button
          className="buttons exit"
          type="button"
          onClick={clickExit}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default EndView;
