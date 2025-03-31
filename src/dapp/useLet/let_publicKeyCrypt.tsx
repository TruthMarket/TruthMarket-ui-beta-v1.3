// import { useState, } from 'react';
// import { Uint256_bytes } from '../type/readContracts';
// import { ethers} from 'ethers';

// 在文件顶部定义自定义 hook
export interface ContractState {
    Implementation: string;
    Admin: string;
    isMintPaused: string;
    publicKey_office:string,
}

// 在文件顶部定义自定义 hook
export let state:ContractState = {
        Implementation: '',
        Admin: '',
        isMintPaused: '',
        publicKey_office:'',
    };


// export function useInputState() {
//     const [inputs, setInputs] = useState({});

//     const updateInput = (key: string, value: string) => {
//         setInputs(prev => ({ ...prev, [key]: value }));
//     };

//     return [inputs, updateInput] as const;
// }