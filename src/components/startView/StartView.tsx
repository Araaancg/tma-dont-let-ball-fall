import "./startView.css";

const StartView = ({
  playerName,
  clickPlay,
  clickExit,
}: {
  playerName: string;
  clickPlay: () => void;
  clickExit: () => void;
}) => {
  return (
    <div className="startView">
      <h1 className="title">Lets play {playerName}!</h1>
      <h1 className="title">Don&apos;t let the ball fall!</h1>
      <div>
        <button className="buttons play" type="button" onClick={clickPlay}>
          Play
        </button>
        <button className="buttons exit" type="button" onClick={clickExit}>
          Back
        </button>
      </div>
    </div>
  );
};

export default StartView;
