import React from "react";
import styles from './Button.module.scss';

interface Props {
    onClick: () => void
}

export default class Button extends React.Component<Props> {
    render() {
        return <button onClick={this.props.onClick} className={styles.Button}>{this.props.children}</button>
    }
}