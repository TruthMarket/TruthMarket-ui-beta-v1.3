import { useState } from 'react';

// 返回单个数据的函数列表
export const functions_singleOutput = [
    'Implementation',
    'Admin',
    'logoURI',
    "balanceOf",
    "blackSupply",
    'totalSupply',
    'validSupply',
    'invalidSupply',
    "symbol",
]
// 返回一个数组的函数列表
export const functions_arrayOutput = [
    'tokenIdArray',
]

// 返回一个对象数组的函数列表
export const functions_return_Array_obj = [
    "getBoxInfo",
]

// export const all = [
//     "Admin",
//     "Implementation",
//     // "addBlackTokenId",
//     // "approve",
//     // "balanceOf",
//     "blackSupply",
//     // "burn",
//     // "changeAdmin",
//     // "getApproved",
//     // "getBoxInfo",
//     // "getDeadline",
//     // "getPrice",
//     // "getStatus",
//     // "inDeadline",
//     "invalidSupply",
//     // "isApprovedForAll",
//     // "isBlackTokenId",
//     "logoURI",
//     // "mint",
//     // "mintPublic",
//     // "minterOf",
//     "name",
//     // "ownerOf",
//     // "removeBlackTokenId",
//     // "safeTransferFrom",
//     // "safeTransferFrom",
//     // "setAddress",
//     // "setApprovalForAll",
//     // "setCidPassword",
//     // "setDeadline",
//     // "setInvalid",
//     // "setLogoURI",
//     // "setNetwork",
//     // "setPrice",
//     // "setPublic",
//     // "setStatus",
//     // "supportsInterface",
//     "symbol",
//     // "tokenURI",
//     "totalSupply",
//     // "transferFrom",
//     // "upgrade",
//     "validSupply",
// ]

// 在文件顶部定义自定义 hook
export interface StateType_nftBox {
    // Implementation: string;
    Admin: string;
    logoURI: string,
    balanceOf: number,
    blackSupply: number,
    totalSupply: number,
    // validSupply: number,
    invalidSupply: number,
    symbol: string,
    name: string,
}

export interface StateTypeList_nftBox {
    tokenIdArray: number[];
}

export let currentState: StateType_nftBox = {
    // Implementation: '',
    Admin: '',
    logoURI: '',
    balanceOf: 0,
    blackSupply: 0,
    totalSupply: 0,
    // validSupply: 0,
    invalidSupply: 0,
    symbol: '',
    name: '',
}

// 在文件顶部定义自定义 hook
export const useState_nftBox = () => {
    const [state, setState] = useState<StateType_nftBox>({
        // Implementation: '',
        Admin: '',
        logoURI: '',
        balanceOf: 0,
        blackSupply: 0,
        totalSupply: 0,
        // validSupply: 0,
        invalidSupply: 0,
        symbol: '',
        name: '',
    });

    const updateState = (key: keyof StateType_nftBox, value: string|number) => {
        // setState(prevState => ({ ...prevState, [key]: value }));
        setState(prevState => {
            const newState = { ...prevState, [key]: value };
            // 更新let变量
            currentState = newState;
            return newState;
        });
    };

    // 新增：返回状态对象的键
    // const stateKeys = Object.keys(state) as (keyof StateType_nftBox)[];

    const [stateList, setStateList] = useState<StateTypeList_nftBox>({
        tokenIdArray: [],
    });


    const updateStateList = (key: keyof StateTypeList_nftBox, value: any[]) => {
        setStateList(prevState => ({ ...prevState, [key]: value }));
    };

    return { state, updateState, stateList, updateStateList };
}
