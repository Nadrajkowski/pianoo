import React from "react";
import styles from './Switch.module.scss';

interface Props {
    value: boolean
    label: string
    onChange: () => void
}

export default class Switch extends React.Component<Props> {
    render() {
        const {onChange, value, label} = this.props;
        const className = `
            ${styles.Switch}
            ${value && styles.checked}
        `
        return (
            <div className={className} onClick={onChange}>
                <label>{label}</label>
            </div>
        );
    }
}