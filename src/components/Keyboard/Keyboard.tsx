import React from 'react';
import { IKey } from '../../definitions/Key';
import Key from '../Key/Key';
import Tone from 'tone';
import { KeyCodes } from '../../enums/KeyCodes.enum';

type Props = typeof defaultProps;

const defaultProps = {
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
}

export default class KeyBoard extends React.Component<Props> {
    sharedSynth: any
    static defaultProps = defaultProps;
    getKeys = () => {
        const {transposition} = this.props;
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
        return keyConfigs.map((key: IKey) => {
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
                    playOnHover={this.props.playOnHover}
                    playOnKeydown={this.props.playOnKeypress}
                    synth={synth}
                    keyType={keyType}
                />
            )
        });
    }

    render() {
        return this.getKeys();
    }
}
