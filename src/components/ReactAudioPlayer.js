import React, { Component } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

class ReactAudioPlayer extends Component {

  state = {
    audioElement: new Audio(),
    timelineElement: Object,
    playTime: 0,
    playButton: false,
    timeline: Number,
    timer: 0
  }

  playMusic = () => {
    if (this.state.playTime === 0) {
      this.setState({ playTime: this.state.audioElement.duration });
    }
    this.state.audioElement.play();
    this.setState({ playButton: true });
    this.musicTimer();
  }

  musicTimer = () => {
    this.setState({
      timer: setInterval(() => {
        this.setState({ playTime: this.state.playTime -= 0.10 });
        this.timelineUpdate();
        this.stopTimer();
      }, 100)
    })


  }

  stopTimer = () => {
    if (this.state.playButton === false) {
      clearInterval(this.state.timer);
    }
    if (this.state.playTime <= 0) {
      clearInterval(this.state.timer);
      this.setState({ playTime: this.state.playTime = 0 });
    }
  }
  pauseMusic = () => {
    this.state.audioElement.pause();
    this.setState({ playButton: false });
  }
  timelineUpdate = () => {
    this.setState({ timeline: this.state.playTime * 100 / this.state.audioElement.duration });
  }

  clickOnTimeLine = (event) => {
    this.state.audioElement.currentTime = this.state.audioElement.duration * this.clickPercent(event);


    this.setState({ playTime: this.state.audioElement.duration - this.state.audioElement.currentTime })
  }
  clickPercent = (event) => {
    return (event.clientX - this.getPosition()) / this.state.timelineElement.offsetWidth;
  }

  getPosition = () => {

    return this.state.timelineElement.getBoundingClientRect().left;
  }


  componentDidMount() {
    this.state.audioElement.src = this.props.trackLink;
    this.setState({ timelineElement: document.getElementById('timeline') });
  }


  render() {

    const { trackLink } = this.props;
    let button;
    let duration;
    if (this.state.playButton === false) {
      button = <PlayArrowIcon style={{ color: 'white', backgroundColor: '#536DFE' }} onClick={() => this.playMusic()} />
    }
    if (this.state.playButton === true) {
      button = <PauseIcon style={{ color: 'white', backgroundColor: '#536DFE' }} onClick={() => this.pauseMusic()} />
    }
    if (this.state.audioElement.duration) {
      duration = this.state.playTime.toFixed(2);
    } else {
      duration = "0:00";
    }
    const style = {
      player: {
        padding: "10px",
        display: "grid",
        gridGap: "5px",
        alignContent: "center",
        textAlign: "center",
        gridTemplateColumns: "0.1fr 0.7fr 0.2fr",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#536DFE",
        minHeight: "35px",
        borderRadius: "4px",
        width: "400px",
        minWidth: "300px",
        height: "40px",
        boxShadow:
          "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A"
      },

      timeline: {
        height: "100%",
        display: "grid",
        alignContent: "center",
        gridTemplateColumns: "1fr",
        gridAutoRows: "0.3fr"
      },

      timelineVision: {
        backgroundColor: "white",
        marginRight: `${this.state.timeline}%`
      },
      timer: {
        color: "white"
      },
      controller: {
        display: "grid",
        justifyContent: "center"
      }
    };
    return (

      <div style={style.player}>

        <audio id='player' src={trackLink}></audio>
        <div style={style.controller}>
          {button}
        </div>
        <div id='timeline' style={style.timeline} onClick={event => this.clickOnTimeLine(event)}>
          <div style={style.timelineVision}></div>
        </div>
        <div style={style.timer}>
          {duration}
        </div>
      </div>
    )
  }
}


export default ReactAudioPlayer;
