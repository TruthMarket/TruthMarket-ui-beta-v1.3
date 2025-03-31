import { useState, } from 'react';


// 返回单个数据的函数列表
export const functions_singleOutput = [
    'Implementation',
    'Admin',
    'officeKeyCounts',
    'TokenIdIndex',
]

// 在文件顶部定义自定义 hook
export interface StateType_EncryptionStorage{
    Implementation: string;
    Admin: string;
    officeKeyCounts: string;
    publicKey_office: string,
    TokenIdIndex:string,
}

export let encryptionState: StateType_EncryptionStorage= {
    Implementation: '',
    Admin: '',
    officeKeyCounts: '',
    publicKey_office: '0x3059301306072a8648ce3d020106082a8648ce3d0301070342000411f3c5238ed10f09b1ea2c24268ec9461fd72b8f042b57f5f498d27c4c66ca9b15f40b44f42c325d4894e6372895083902db7aa5faf416403d24517fb5cce2e3',
    TokenIdIndex:'',
}

// 在文件顶部定义自定义 hook
export const useState_EncryptionStorage= () => {
    const [state, setState] = useState<StateType_EncryptionStorage>(encryptionState);

    const updateState = (key: keyof StateType_EncryptionStorage, value: string) => {
        // setState(prevState => ({ ...prevState, [key]: value }));
        setState(prevState => {
            const newState = { ...prevState, [key]: value };
            // 更新let变量
            encryptionState = newState;
            return newState;
        });
    };

    // 新增：返回状态对象的键
    // const stateKeys = Object.keys(state) as (keyof StateType_publicKeyCrypt)[];


    return { state, updateState,};
}
