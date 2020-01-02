import React from "react";
import ReactDOM from "react-dom";
import AudioPlayer from "./components/AudioPlayer.js";

function App() {
  const style = {
    h1: {
      fontSize: "14px"
    },
    center: {
      display: "grid",
      justifyContent: "center",
      textAlign: "center"
    }
  };
  return (
    <>
      <div style={style.center}>
        <AudioPlayer trackLink="https://www.free-stock-music.com/music/jay-someday-family-business.mp3" />
        <h1 style={style.h1}>
          Simple react audio player component + material ui.
          <br />
          <h3>
            Customize <strong>react audio player</strong> and enjoy
          </h3>
          <h4>
            <a href="https://github.com/GemsGame">
              https://github.com/GemsGame
            </a>
          </h4>
          <br />
        </h1>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
