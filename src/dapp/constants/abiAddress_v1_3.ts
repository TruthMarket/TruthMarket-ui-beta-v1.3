import { Abi } from 'viem'
// import { useNetwork } from 'wagmi'

import feeToken_Json from '../artifacts/FeeToken/FeeToken.json';
export const ABI_feeToken:any[] = feeToken_Json.abi;

import TruthBox_Json from '../artifacts/contracts_v1_3/TruthBox.json';
export const ABI_TruthBox:any[] = TruthBox_Json.abi;

import BoxStatus_Json from '../artifacts/contracts_v1_3/BoxStatus.json';
export const ABI_BoxStatus:any[] = BoxStatus_Json.abi;

import Exchange_Json from '../artifacts/contracts_v1_3/Exchange.json';
export const ABI_Exchange:any[] = Exchange_Json.abi;

import FundManager_Json from '../artifacts/contracts_v1_3/FundManager.json';
export const ABI_FundManager:any[] = FundManager_Json.abi;

import ConfidentialityFee_Json from '../artifacts/contracts_v1_3/ConfidentialityFee.json';
export const ABI_ConfidentialityFee:any[] = ConfidentialityFee_Json.abi;

import EncryptionStorage_Json from '../artifacts/contracts_v1_3/EncryptionStorage.json';
export const ABI_EncryptionStorage:any[] = EncryptionStorage_Json.abi;

// 合约地址
export const feeToken = '0xC4A9335a5B4b3BD2f6f1959B2B50AB548a22e162'
export const Address_0 = '0x0000000000000000000000000000000000000000';

export const Proxy_BoxStatus = '0x14aBD38477FF15879867685f40aD3F1F3B2e08b6';
export const Proxy_Exchange = '0xAb70E6b2c8ecCf731635a36526Ddc91910305320';
export const Proxy_FundManager = '0x2BeA40F9bb9C7F487F1fd0C94F2B0a679cAd9F20';
export const Proxy_TruthBox = '0x2da71D9537D67620FC56260dD46E80C2B01e9e05';
export const Proxy_ConfidentialityFee = '0x241d4788120a5A190412A18bEaE816939823c425';
export const Proxy_EncryptionStorage = '0x2E49cEb1272bE5977E5A07D289117D483183C202';


// 定义合约接口类型
export interface ContractConfigType {
    address: `0x${string}`;
    abi: Abi;
    chainId: number;
};

// 定义合约函数配置
export const Config_feeToken: ContractConfigType ={
    address: feeToken as `0x${string}`,
    abi: ABI_feeToken,
    chainId: 11155111
};

export const Config_TruthBox : ContractConfigType ={
    address: Proxy_TruthBox as `0x${string}`,
    abi: ABI_TruthBox,
    chainId: 11155111
};

export const Config_BoxStatus : ContractConfigType ={
    address: Proxy_BoxStatus as `0x${string}`,
    abi: ABI_BoxStatus,
    chainId: 11155111
};

export const Config_Exchange : ContractConfigType ={
    address: Proxy_Exchange as `0x${string}`,
    abi: ABI_Exchange,
    chainId: 11155111
};

export const Config_FundManager : ContractConfigType ={
    address: Proxy_FundManager as `0x${string}`,
    abi: ABI_FundManager,
    chainId: 11155111
};

export const Config_ConfidentialityFee : ContractConfigType ={
    address: Proxy_ConfidentialityFee as `0x${string}`,
    abi: ABI_ConfidentialityFee,
    chainId: 11155111
};

export const Config_EncryptionStorage : ContractConfigType ={
    address: Proxy_EncryptionStorage,
    abi: ABI_EncryptionStorage,
    chainId: 11155111
};



// 定义不同网络的合约配置
// const contractConfigs: Record<number, typeConfig> = {
//     1: {
//         address: '0x1234...', // 以太坊主网地址
//         abi: [...],  // 主网 ABI
//         chainId: 1
//     },
//     5: {
//         address: '0x5678...', // Goerli 测试网地址
//         abi: [...],  // 测试网 ABI
//         chainId: 5
//     },
//     // 添加其他网络的配置...
// };


// 自定义 hook 来获取当前网络的合约配置
// export function useContractConfig(): typeConfig | undefined {
//     const { chain } = useNetwork();
    
//     if (chain && chain.id in contractConfigs) {
//         return contractConfigs[chain.id];
//     }
    
//     return undefined;
// }

// // 自定义 hook 来获取当前网络的合约配置
// export const useContractConfig_AB : ContractConfigType | undefined => {
//     const { chain } = useNetwork();

//     if (!chain) return undefined;

//     const address = CONTRACT_ADDRESSES[chain.id];
    
//     if (!address) {
//         console.warn(`未找到链ID为 ${chain.id} 的合约地址配置。`);
//         return undefined;
//     }

//     return {
//         address,
//         abi: ABI_B,
//         chainId: chain.id
//     };
// }

// const contractConfig = useContractConfig_AB()