// import React from 'react';
import { 
    useState 
} from 'react';
// import { useNftFormContext } from '../useState/nftForm';
import InputText from '@dapp/element/InputText';
// import { feeToken_State } from '../../../useState/state_feeToken';

export const InputPrice = () => {
    // const { updateNftForm } = useNftFormContext() || {};
    const [inputValue, setInputValue] = useState('');

    // token 小数点精度 feeToken_State.decimals

    const handlePriceChange = (value: string) => {
        // 允许清空输入框
        if (value === '') {
            setInputValue('');
            // updateNftForm?.('price', '');
            return;
        }
    
        // 处理数字和小数点的正则
        const decimalRegex = /^\d*\.?\d{0,3}$/;  // 允许小数点后最多3位
        const leadingZeroRegex = /^0\d+/;  // 检测0开头后面跟数字的情况
    
        // 处理0开头的情况
        if (leadingZeroRegex.test(value)) {
            value = value.replace(/^0+/, ''); // 去掉前导0
        }
    
        // 特殊处理"0."开头的情况
        if (value.startsWith('0.') || value === '0') {
            if (decimalRegex.test(value)) {
                setInputValue(value);
                // updateNftForm?.('price', value); // 不必考虑number类型，会在mintNFT组件中进行转换
            }
            return;
        }
    
        // 验证其他数字格式
        if (decimalRegex.test(value) && value.charAt(0) !== '.') {
            setInputValue(value);
            // updateNftForm?.('price', value);
        }
    };

    return (
        <>
            <InputText 
                onChange={handlePriceChange}
                value={inputValue}
            />
        </>
    );
}
