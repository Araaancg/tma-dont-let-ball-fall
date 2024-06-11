import "./gameView.css";

const GameView = ({
  position,
  onBallClick,
  touches,
}: {
  position: number;
  onBallClick: () => void;
  touches: number;
}) => {

  return (
    <div className="gameArea" onClick={onBallClick}>
      <span className="touches">touches: {touches}</span>
      <div className="ball" style={{ top: `${position}%` }} />
      <div className="line" />
    </div>
  );
};

export default GameView;
