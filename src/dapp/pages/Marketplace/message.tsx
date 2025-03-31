import React from 'react';
import styles from './styles.module.scss';
import { useStepStatusContext } from './useState/stepStatusContext';

const Message: React.FC = () => {
    const {loadingMessage}=useStepStatusContext()

    return (
        <>
            {loadingMessage && <p className={styles.message}>{loadingMessage}</p>}

        </>
    )
}

export default Message;