import React from 'react';
import './App.css';

const data = [
  {
    id: "chord 1",
    key: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  
  {
    id: "chord 2",
    key: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },

  {
    id: "chord 3",
    key: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },

  {
    id: "give_us_a_light",
    key: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },

  {
    id: "dry_Ohh",
    key: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },

  {
    id: "bld_h1",
    key: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },

  {
    id: "punchy_kick_1",
    key: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },

  {
    id: "side_stick_1",
    key: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },

  {
    id: "Brk_Snr",
    key: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  }
]

const inactiveStyle = {
  width: 80,
  height: 80,
  fontSize: 20,
  backgroundColor: "white",
  color: "black",
  border: "2px solid black",
  borderRadius: 10
}
class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="display">

      </div>
    )
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  handleKeyPress(e) {
    if (e.key.toUpperCase() === this.props.getKey) {
      this.playSound();
    }
  }

  playSound() {
    let sound = document.getElementById(this.props.getKey);
    sound.currentTime = 0;
    sound.play()
  }

  render() {
    return (
      <button
        style={this.props.getStyle}
        className="drum-pad"
        id={this.props.getId}
        onClick={this.playSound}
      >
        {this.props.getKey}
        <audio 
          id={this.props.getKey}
          className="clip"
        >
          <source src={this.props.getSrc} type="audio/mp3" />
        </audio>
      </button>
    )
  }
}
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: inactiveStyle,
    }
  }

  renderDrumPad(i) {
    return (
      <DrumPad
        getId={data[i].id}
        getKey={data[i].key}
        getStyle={this.state.style}
        getSrc={data[i].url}
      />
    )
  }

  render() {
    return (
      <div id="drum-machine">
        <Display />
        <div className="row">
          {this.renderDrumPad(0)}
          {this.renderDrumPad(1)}
          {this.renderDrumPad(2)}
        </div>
        <div className="row">
          {this.renderDrumPad(3)}
          {this.renderDrumPad(4)}
          {this.renderDrumPad(5)}
        </div>
        <div className="row">
          {this.renderDrumPad(6)}
          {this.renderDrumPad(7)}
          {this.renderDrumPad(8)}
        </div>
      </div>
    )
  }
}
function App() {
  return (
    <DrumMachine />
  )
}

export default App;
