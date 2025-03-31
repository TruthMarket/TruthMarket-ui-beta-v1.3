import { useState, } from 'react';

// 返回单个数据的函数列表
export const functions_singleOutput = [
    // 'Implementation',
    'Admin',
    "incrementRate",
    "storageFee",
]
// 返回一个数组的函数列表
export const functions_arrayOutput = [
    'tokenIdArray',
]

// export const all = [
//     "Admin",
//     // "ExtendStoringTime",
//     // "Implementation",
//     // "PaySecretMoney",
//     // "changeAdmin",
//     "incrementRate",
//     // "setAddress",
//     // "setSecretGain",
//     // "setStoringFee",
//     "storageFee",
//     // "upgrade",
// ]

// 在文件顶部定义自定义 hook
export interface StateType_confidentialityFee {
    // Implementation: string;
    Admin: string;
    incrementRate: number;
    storageFee: number,
}

// export interface StateTypeList_paySecretFee {
//     tokenIdArray: number[];
// }

export let currentState: StateType_confidentialityFee = {
    // Implementation: '',
    Admin: '',
    incrementRate: 0,
    storageFee: 0,
}

// 在文件顶部定义自定义 hook
export const useState_paySecretFee = () => {
    const [state, setState] = useState<StateType_confidentialityFee>({
        // Implementation: '',
        Admin: '',
        incrementRate: 0,
        storageFee: 0,
    });

    const updateState = (key: keyof StateType_confidentialityFee, value: string|number) => {
        // setState(prevState => ({ ...prevState, [key]: value }));
        setState(prevState => {
            const newState = { ...prevState, [key]: value };
            // 更新let变量
            currentState = newState;
            return newState;
        });
    };

    // 新增：返回状态对象的键
    // const stateKeys = Object.keys(state) as (keyof StateType_ConfidentialityFee)[];

    // const [stateList, setStateList] = useState<StateTypeList_paySecretFee>({
    //     tokenIdArray: [],
    // });


    // const updateStateList = (key: keyof StateTypeList_paySecretFee, value: any[]) => {
    //     setStateList(prevState => ({ ...prevState, [key]: value }));
    // };

    return { state, updateState, };
}
