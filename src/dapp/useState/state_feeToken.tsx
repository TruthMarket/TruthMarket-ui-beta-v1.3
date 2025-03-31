import { useState, } from 'react';

// export const all = [
//     "allowance",
//     "approve",
//     "balanceOf",
//     "burn",
//     "decimals",
//     "mint",
//     "mintDate",
//     "mintDeadline",
//     "name",
//     "symbol",
//     "totalSupply",
//     "transfer",
//     "transferFrom",
// ]

// 在文件顶部定义自定义 hook
export interface StateType_feeToken {
    decimals:number,
    mintDeadline:number,
    name:string,
    symbol:string,
    totalSupply:number,
}

export interface StateTypeList_feeToken {
    tokenIdArray: number[];
}

export let feeToken_State: StateType_feeToken = {
    decimals:3,
    mintDeadline:3*24*60*60, // seconds
    name:'Truth Market Token',
    symbol:'TMT',
    totalSupply:0,
}

// 在文件顶部定义自定义 hook
export const useState_feeToken = () => {
    const [state, setState] = useState<StateType_feeToken>(feeToken_State);

    const updateState = (key: keyof StateType_feeToken, value: string|number) => {
        // setState(prevState => ({ ...prevState, [key]: value }));
        setState(prevState => {
            const newState = { ...prevState, [key]: value };
            // 更新let变量
            feeToken_State = newState;
            return newState;
        });
    };

    return { state, updateState };
}

// export function useInputState() {
//     const [inputs, setInputs] = useState({});

//     const updateInput = (key: string, value: string) => {
//         setInputs(prev => ({ ...prev, [key]: value }));
//     };

//     return [inputs, updateInput] as const;
// }