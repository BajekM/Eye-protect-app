import React from 'react';
import { render } from 'react-dom';


class App extends React.Component {
  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  formatTime = (seconds) => {
    if (!seconds) {
      return null;
    }else if (isNaN(seconds)) {
      return null;
    }else if (seconds < 0 ) {
      return null;
    } else {
  
      const zeroPadded = function zeroPadding(number, length) {
        return (Array(length).join('0') + number).slice(-length);
      };
  
      let secs = Math.floor(seconds % 60);
      secs < 10 ? secs = zeroPadded(secs, 2) : '';
      let mins = Math.floor((seconds/60) % 60);
      mins < 10 ? mins = zeroPadded(mins, 2) : '';
      
      return (mins + ':' + secs);
    }
  };

  step = () => {
    const { status, time } = this.state;
    this.setState({
      time: time-1,
    });
    if (this.state.time == 0) {
      switch (status) {
        case 'work' :
          this.setState({
            status: 'rest',
            time: 20,
          })
          this.playBell();
          break;
        case 'rest' :
          this.setState({
            status: 'work',
            time: 1200,
          })
          this.playBell();
          break;
        default :
        console.log('Something went wrong');
      }
    }
  };

  startTimer = () => {

    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work',
    });
  }

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: 'off',
    })
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  closeApp = () => {
    window.close();
  }

  render() {

    const { status, time } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && 
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={() => {this.startTimer()}}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={() => {this.stopTimer()}}>Stop</button>}
        <button className="btn btn-close" onClick={() => {this.closeApp()}}>X</button>
      </div>
    );
  }
};

render(<App />, document.querySelector('#app'));
