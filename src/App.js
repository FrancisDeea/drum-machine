import React from 'react';
import './App.scss';

const data = [
  {
    id: "chord_1",
    key: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  
  {
    id: "chord_2",
    key: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },

  {
    id: "chord_3",
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
  width: 100,
  height: 100,
  backgroundColor: "white",
  color: "black",
  border: "2px solid black",
  boxShadow: "2px 2px 0px gray",
  borderRadius: 10
};

const activeStyle = {
  width: 100,
  height: 100,
  backgroundColor: "orange",
  position: "relative",
  top: 5,
  color: "black",
  borderRadius: 10
}
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activateStyle = this.activateStyle.bind(this);
    this.state = {
      style: inactiveStyle,
    }
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

  activateStyle() {
    if (this.state.style.backgroundColor === "white") {
      this.setState({
        style: activeStyle,
      })
    } else {
      this.setState({
        style: inactiveStyle,
      })
    }
  }

  playSound() {
    let sound = document.getElementById(this.props.getKey);
    sound.currentTime = 0;
    sound.play();
    this.props.display(this.props.getId.replace(/_|-/g, " "));
    this.activateStyle();
    setTimeout(() => this.activateStyle(), 100)
  }

  render() {
    return (
      <button
        style={this.state.style}
        className="drum-pad"
        id={this.props.getId}
        onClick={this.playSound}
      >
        {this.props.getKey}
        <audio 
          id={this.props.getKey}
          className="clip"
          src={this.props.getSrc}
        >
        </audio>
      </button>
    )
  }
}
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.getDisplay = this.getDisplay.bind(this);
    this.state = {
      display: ""
    }
  }

  getDisplay(name) {
    this.setState({
      display: name
    })
  }

  renderDrumPad(i) {
    return (
      <DrumPad
        getId={data[i].id}
        getKey={data[i].key}
        getSrc={data[i].url}
        display={this.getDisplay}
      />
    )
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display">
          <p>{this.state.display}</p>
        </div>
        <div className="container">
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
