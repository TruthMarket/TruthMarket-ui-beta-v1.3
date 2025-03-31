
import React from 'react';

import styles from './styles.module.scss';

interface ButtonConProps {
    text: string;
    onClick: () => void;
    isLoading: boolean;
}

const ButtonCust: React.FC<ButtonConProps> = ({ text, onClick, isLoading }) => {
    return (
        <>
            <button 
                className={styles.buttonCon}
                onClick={onClick}
                disabled={ isLoading}
            >
                {isLoading ? 'wait...' : text}
            </button>
        </>
    );
}

export default ButtonCust;
