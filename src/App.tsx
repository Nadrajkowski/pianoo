import * as React from 'react';
import styles from './App.module.scss';
import Keyboard from './components/Keyboard/Keyboard';
import Tone from 'tone';

class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <header>
          <h1>Pianoo</h1>
        </header>
        <main>
          <Keyboard name='AM Synth' synth={Tone.AMSynth} playMultipleTonesAtOnce/>
          <Keyboard name='Duo Synth' synth={Tone.DuoSynth}/>
        </main>
        <footer>
          <a target='#' href='https://github.com/nadrajkowski'>Kasper Nadrajkowki</a>
        </footer>
      </div>
    );
  }
}

export default App;
