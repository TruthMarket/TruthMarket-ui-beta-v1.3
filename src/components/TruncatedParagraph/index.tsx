import React from 'react';
import styles from './styles.module.scss';

interface TruncatedParagraphProps {
    text: string;
}

// interface TruncatedParagraphState {
//     text: string;
// }

const TruncatedParagraph: React.FC<TruncatedParagraphProps> = ({ text}) => {
    // 截断文本到100个汉字
    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <p className={styles.truncatedParagraph}>
            {truncateText(text, 180)}
        </p>
    );
};

export default TruncatedParagraph;