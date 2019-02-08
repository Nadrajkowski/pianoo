import React, { Fragment, ReactNode } from "react";
import styles from './Key.module.scss';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import { IKey } from "../../definitions/Key";

enum KeyTypes {
    PianoLong,
    PianoShort,
    Pad
}

type Props = {
    keyDetails: IKey,
    synth: any
} & typeof defaultProps;

type State = typeof initialState;

const defaultProps = {
    keyType: KeyTypes.PianoLong,
    playOnHover: false,
    playOnKeydown: false
}

const initialState = {
    isDown: false
}

export default class Key extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps;
    readonly state = initialState;
    static KeyTypes = KeyTypes;

    triggerStart = () => {
        this.setState({isDown: true});
        this.props.synth.triggerAttack(this.props.keyDetails.label);
    }

    triggerStop = () => {
        this.setState({isDown: false});
        this.props.synth.triggerRelease();
    }

    mouseDown = () => {
       this.triggerStart();
    }

    mouseUp = () => {
        this.triggerStop();
    }

    mouseEnter = () => {
        if (this.props.playOnHover) {
           this.triggerStart();
        }
    }

    mouseLeave = () => {
        if (this.props.playOnHover) {
            this.triggerStop();
        }
    }

    renderKeyHandler = (): ReactNode => {
        if (this.props.playOnKeydown) {
            return (
                <Fragment>
                    <KeyHandler
                        keyEventName={KEYDOWN}
                        keyCode={this.props.keyDetails.keyCode}
                        onKeyHandle={this.triggerStart}
                    />
                    <KeyHandler
                        keyEventName={KEYUP}
                        keyCode={this.props.keyDetails.keyCode}
                        onKeyHandle={this.triggerStop}
                    />
                </Fragment>
            );
        }
    }

    renderKey = (additionlClassName : string = ''): ReactNode => {
        const className = `
            ${styles.Key}
            ${this.state.isDown && styles.active}
            ${additionlClassName}
        `;
        return (
            <div
                className={className}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onTouchStart={this.mouseDown}
                onTouchEnd={this.mouseUp}
            >
                <label>
                    {this.props.keyDetails.label}
                </label>
            </div>
        );
    }

    renderShortKey = (): ReactNode => {
        return (
            <div className={styles.blackKeyWrapper}>
                {this.renderKey(styles.shortBlack)}
            </div>
        );
    }

    
    render() {
        return(
            <Fragment>
                {this.renderKeyHandler()}
                {this.props.keyType === KeyTypes.PianoShort ?
                    this.renderShortKey()
                    : this.renderKey()
                }
            </Fragment>
        );
    }
}