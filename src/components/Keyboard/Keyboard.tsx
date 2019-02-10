import React from 'react';
import { IKey } from '../../definitions/Key';
import Key from '../Key/Key';
import Tone from 'tone';
import { KeyCodes } from '../../enums/KeyCodes.enum';
import { Size } from '../../definitions/Size';
import styles from './Keyboard.module.scss';

type Props = typeof defaultProps;

const defaultProps = {
    displayNotes: true,
    /**
     * this flag enalbles the synth to play multiple sounds at once
     * which will be achived by initialising a synth for each Key so it can start and stop individually.
     * This has a huge hit on performance so the Keyboard will share a synth when this flag is disabled.
     */
    playMultipleTonesAtOnce: false,
    playOnHover: false,
    playOnKeypress: false,
    synth: Tone.MonoSynth,
    transposition: 3,
    volume: 0,
    /**
     * array of keys that define what note to play and on which key pressed
     */
    keyConfigs: [
        {label: `C${3}`, keyCode: KeyCodes.A},
        {label: `C#${3}`, keyCode: KeyCodes.W},
        {label: `D${3}`, keyCode: KeyCodes.S},
        {label: `D#${3}`, keyCode: KeyCodes.E},
        {label: `E${3}`, keyCode: KeyCodes.D},
        {label: `F${3}`, keyCode: KeyCodes.F},
        {label: `F#${3}`, keyCode: KeyCodes.T},
        {label: `G${3}`, keyCode: KeyCodes.G},
        {label: `G#${3}`, keyCode: KeyCodes.Y},
        {label: `A${3}`, keyCode: KeyCodes.H},
        {label: `A#${3}`, keyCode: KeyCodes.U},
        {label: `B${3}`, keyCode: KeyCodes.J}
    ] as IKey[],
    size: 'm' as Size
}

export default class KeyBoard extends React.Component<Props> {
    sharedSynth: any
    static defaultProps = defaultProps;
    getKeys = () => {

        var vol = new Tone.Volume(this.props.volume);
        if (!this.props.playMultipleTonesAtOnce) {
            this.sharedSynth = new this.props.synth()
                .chain(vol, Tone.Master);
        }
        return this.props.keyConfigs.map((key: IKey) => {
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
                    displayNote={this.props.displayNotes}
                    keyDetails={key}
                    key={key.label}
                    playOnHover={this.props.playOnHover}
                    playOnKeydown={this.props.playOnKeypress}
                    synth={synth}
                    keyType={keyType}
                    size={this.props.size}
                />
            )
        });
    }

    render() {
        return (
            <div className={styles.keys}>
                {this.getKeys()}
            </div>
        )
    }
}
