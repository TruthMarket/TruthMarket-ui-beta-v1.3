import React from 'react';
import styles from './styles.module.scss';


interface TextLengthProps {
    length: number;
    text: string;
}

const TextLength: React.FC<TextLengthProps> = ({ text,length}) => {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <p className={styles.pLength}>
            {truncateText(text, length)}
        </p>
    );
};

export default TextLength;