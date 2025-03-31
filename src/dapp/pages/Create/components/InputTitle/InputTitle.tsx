/*
import React, { ChangeEvent } from 'react';
import { useNftForm } from '../../useState/nftForm';
import styles from './styles.module.scss';

export const InputTitle: React.FC = () => {
    const { nftForm, setNftForm } = useNftForm();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNftForm({
            ...nftForm,
            title: value
        });
    };

    return (
        <input
            type="text"
            className={styles.inputTitle}
            value={nftForm.title || ''}
            onChange={handleChange}
            placeholder="Enter a title (40-150 characters)"
            maxLength={150}
        />
    );
}; 
*/