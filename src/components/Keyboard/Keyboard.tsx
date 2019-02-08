import React from 'react';
import styles from './Keyboard.module.scss';
import { IKey } from '../../definitions/Key';
import Key from '../Key/Key';
import Tone, {Envelope, Instrument} from 'tone';
import Switch from '../Switch/Switch';
import { KeyCodes } from '../../enums/KeyCodes.enum';
import Button from '../Button/Button';

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

export default class Keyboard extends React.Component<Props, State> {

    readonly state = initialState;
    static readonly defaultProps = defaultProps;
    sharedSynth: any

    componentDidMount() {
        
    }

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
        const {transposition} = this.state;
        const keyConfigs: IKey[] = [
            {label: `C${transposition}`, keyCode: KeyCodes.A},
            {label: `C#${transposition}`, keyCode: KeyCodes.W},
            {label: `D${transposition}`, keyCode: KeyCodes.S},
            {label: `D#${transposition}`, keyCode: KeyCodes.E},
            {label: `E${transposition}`, keyCode: KeyCodes.D},
            {label: `F${transposition}`, keyCode: KeyCodes.F},
            {label: `F#${transposition}`, keyCode: KeyCodes.T},
            {label: `G${transposition}`, keyCode: KeyCodes.G},
            {label: `G#${transposition}`, keyCode: KeyCodes.Y},
            {label: `A${transposition}`, keyCode: KeyCodes.H},
            {label: `A#${transposition}`, keyCode: KeyCodes.U},
            {label: `B${transposition}`, keyCode: KeyCodes.J},
            {label: `C${transposition + 1}`, keyCode: KeyCodes.K}
        ]

        var vol = new Tone.Volume(this.props.volume);
        if (!this.props.playMultipleTonesAtOnce) {
            this.sharedSynth = new this.props.synth()
                .chain(vol, Tone.Master);
        }

        const renderedKeys = keyConfigs.map((key: IKey) => {
            // display black Key for sharp notes
            const keyType = key.label.includes('#') ?
                Key.KeyTypes.PianoShort
                : Key.KeyTypes.PianoLong;


            const synth = this.props.playMultipleTonesAtOnce ?
                new this.props.synth()
                    .chain(vol, Tone.Master)
                : this.sharedSynth;

            return (
                <Key
                    keyDetails={key}
                    key={key.label}
                    playOnHover={this.state.playOnHover}
                    playOnKeydown={this.state.playOnKeypress}
                    synth={synth}
                    keyType={keyType}
                />
            )
        });
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
                    {renderedKeys}
                </div>
            </section>
        );
    }
}