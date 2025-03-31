import React, { useEffect } from 'react';
import { useState } from 'react';
import { useBoxInfoContext } from '../../useState/boxInfo';
import InputText from '@dapp/element/InputText';

export const InputTitle: React.FC = () => {
    // const timeoutRef = useRef<number>();
    const { boxInfoState, updateBoxInfo } = useBoxInfoContext() || {};
    const [inputValue, setInputValue] = useState('');
    // const [currentTitle,setCurrentTitle] = useState('');

    const handleTitleChange = (value: string) => {
        if (value.length <= 150) {
            setInputValue(value);
        }
    };

    useEffect(() => {
        // Check text length
        if (inputValue.length >= 40 && inputValue.length <= 150) {
            updateBoxInfo?.('title', inputValue);
        } else if (inputValue.length < 40) {
            updateBoxInfo?.('title', '');
        }
    }, [inputValue])

    useEffect(() => {
        if (boxInfoState?.title === '' && inputValue.length > 40) {
            setInputValue('');
        }
    }, [boxInfoState?.title]);

    return (
        <>
            <InputText
                onChange={handleTitleChange}
                value={inputValue}
                minLength={40}
                maxLength={150}
            />
        </>
    );
}
