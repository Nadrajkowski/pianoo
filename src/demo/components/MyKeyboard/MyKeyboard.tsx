import React from 'react';
import styles from './MyKeyboard.module.scss';
import Button from '../Button/Button';
import Switch from '../Switch/Switch';
import Keyboard from '../../../components/Keyboard/Keyboard';


type Props = {
    name: string
    synth: any
} & typeof defaultProps;

type State = typeof initialState;

const defaultProps = {
    /**
     * this flag enalbles the synth to play multiple sounds at once
     * which will be achived by initialising a synth for each Key so it can start and stop individually.
     * This has a huge hit on performance so the Keyboard will share a synth when this flag is disabled.
     */
    playMultipleTonesAtOnce: false,
    volume: 0
}

const initialState = {
    /** lets the Keyboard play when hovering above Keys*/
    playOnHover: false,
    /** 
     * enables playing by typing on phisical keyboard.
     * The Keyboard will listen for keypresses globally which
     * makes playing multiple Keyboards possible.
     */
    playOnKeypress: false,
    /** sets the base transposition of the Keyboard */
    transposition: 3
}

export default class MyKeyboard extends React.Component<Props, State> {

    readonly state = initialState;
    static readonly defaultProps = defaultProps;
    sharedSynth: any

    togglePlayOnHover = () => {
        this.setState((prevState: State) => {
            return {playOnHover: !prevState.playOnHover};
        })
    }

    togglePlayOnKeypress = () => {
        this.setState((prevState: State) => {
            return {playOnKeypress: !prevState.playOnKeypress};
        })
    }

    increaseTransposition = () => {
        this.setState((prevState: State) => {
            return {transposition: prevState.transposition + 1}
        })
    }

    decreaseTransposition = () => {
        this.setState((prevState: State) => {
            return {transposition: prevState.transposition - 1}
        })
    }

    render() {
        return (
            <section className={styles.Keyboard}>
                <h3>{this.props.name}</h3>

                <div className={styles.switches}>
                    <Button onClick={this.decreaseTransposition}>-</Button>
                    <Button onClick={this.increaseTransposition}>+</Button>
                    <Switch
                        label='Play on Hover'
                        onChange={this.togglePlayOnHover}
                        value={this.state.playOnHover}
                    />
                    <Switch
                        label='Play on Keypress'
                        onChange={this.togglePlayOnKeypress}
                        value={this.state.playOnKeypress}
                    />    
                </div>
                
                <div className={styles.keys}>
                    <Keyboard
                        playMultipleTonesAtOnce={this.props.playMultipleTonesAtOnce}
                        playOnHover={this.state.playOnHover}
                        playOnKeypress={this.state.playOnKeypress}
                        volume={this.props.volume}
                        transposition={this.state.transposition}
                        synth={this.props.synth}
                    />
                </div>
            </section>
        );
    }
}