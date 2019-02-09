import * as React from 'react';
import styles from './App.module.scss';
import Keyboard from './components/MyKeyboard/MyKeyboard';
import Tone from 'tone';
import MyKeyboard from './components/MyKeyboard/MyKeyboard';
import KeyBoard from '../components/Keyboard/Keyboard';

class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <header>
          <h1>Pianoo</h1>
        </header>
        <main>
          <MyKeyboard name='AM Synth' synth={Tone.AMSynth} playMultipleTonesAtOnce/>
          <MyKeyboard name='Duo Synth' synth={Tone.DuoSynth} volume={0}/>
          <MyKeyboard name='Solo Synth' synth={Tone.MonoSynth} volume={-20}/>
          <KeyBoard />
        </main>
        <footer>
          <a target='#' href='https://github.com/nadrajkowski'>Kasper Nadrajkowki</a>
        </footer>
      </div>
    );
  }
}

export default App;
