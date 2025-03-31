

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useBoxInfoContext } from '../../useState/boxInfo';
import InputText from '@dapp/element/InputText';

export const InputTypeOfCrime: React.FC = () => {
    // const timeoutRef = useRef<number>();
    const { boxInfoState, updateBoxInfo } = useBoxInfoContext() || {};
    const [inputValue, setInputValue] = useState('');
    // const [currentTitle,setCurrentTitle] = useState('');

    const handleTypeChange = (value: string) => {
        if (value.length <= 20) {
            setInputValue(value);
        }
    };

    useEffect(() => {
        // Check text length
        if (inputValue.length >= 1 && inputValue.length <= 20) {
            updateBoxInfo?.('typeOfCrime', inputValue);
        } else if (inputValue.length < 1) {
            updateBoxInfo?.('typeOfCrime', '');
        }
    }, [inputValue])

    useEffect(() => {
        if (boxInfoState?.typeOfCrime === '' && inputValue.length > 1) {
            setInputValue('');
        }
    }, [boxInfoState?.typeOfCrime]);

    return (
        <>
            <InputText
                onChange={handleTypeChange}
                value={inputValue}
                placeholder="Please input..."
                minLength={1}
                maxLength={20}
            />
        </>
    );
}
