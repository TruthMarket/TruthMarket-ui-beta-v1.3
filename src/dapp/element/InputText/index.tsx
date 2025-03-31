import React from 'react';
import styles from './styles.module.scss';

interface InputProps {
    onChange: (value: string) => void;
    value: string | number;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
}

const InputText: React.FC<InputProps> = ({ onChange, value, minLength, maxLength, placeholder }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            className={styles.inputText}
            onChange={handleInputChange}
            value={value}
            type="text"
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
        />
    );
}

export { InputText };

export default InputText;