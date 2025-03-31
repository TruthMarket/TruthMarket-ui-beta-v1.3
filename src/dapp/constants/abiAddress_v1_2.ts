import { Abi } from 'viem'
// import { useNetwork } from 'wagmi'

import feeToken_Json from '../artifacts/FeeToken/FeeToken.json';
export const ABI_feeToken:any[] = feeToken_Json.abi;
/*
import NFTBox_Json from '../artifacts/contracts_v1_2/NFTBox.json';
export const ABI_NFTBox:any[] = NFTBox_Json.abi;

import BoxStatus_Json from '../artifacts/contracts_v1_2/BoxStatus.json';
export const ABI_BoxStatus:any[] = BoxStatus_Json.abi;

import BoxPublic_Json from '../artifacts/contracts_v1_2/BoxPublic.json';
export const ABI_BoxPublic:any[] = BoxPublic_Json.abi;

import Exchange_Json from '../artifacts/contracts_v1_2/Exchange.json';
export const ABI_Exchange:any[] = Exchange_Json.abi;

import FundManager_Json from '../artifacts/contracts_v1_2/FundManager.json';
export const ABI_FundManager:any[] = FundManager_Json.abi;

import ConfidentialityFee_Json from '../artifacts/contracts_v1_2/ConfidentialityFee.json';
export const ABI_ConfidentialityFee:any[] = ConfidentialityFee_Json.abi;

import PublicKeyCrypt_Json from '../artifacts/contracts_v1_2/PublicKeyCrypt.json';
export const ABI_PublicKeyCrypt:any[] = PublicKeyCrypt_Json.abi;
*/
// 合约地址
export const feeToken = '0xC4A9335a5B4b3BD2f6f1959B2B50AB548a22e162'

export const Proxy_BoxPublic = '0xcD97fe02C82A336def5Cb7b94c78Ed39d98ED49b';
export const Proxy_BoxStatus = '0xBc76908e16263E3B6E67e43eB5BE1f728a42A834';
export const Proxy_Exchange = '0xf03bF8e8caD03e8258B80F255F47e33fdB55146f';
export const Proxy_FundManager = '0xFA6105eF639B1d2DD28E80b2F4608144863E2F55';
export const Proxy_NFTBox = '0xe773484D3d374332E6e0DC0B348F18ac7f13816c';
export const Proxy_ConfidentialityFee = '0x759DaC5F794fAF572DeeB4f5584892ceF02b1e3D';
export const Proxy_PublicKeyCrypt = '0x5E6ee01a3E2a41bd6385874304F5433Db9eD8523';
export const Address_0 = '0x0000000000000000000000000000000000000000';


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
/*
export const Config_NFTBox : ContractConfigType ={
    address: Proxy_NFTBox as `0x${string}`,
    abi: ABI_NFTBox,
    chainId: 11155111
};

export const Config_BoxStatus : ContractConfigType ={
    address: Proxy_BoxStatus as `0x${string}`,
    abi: ABI_BoxStatus,
    chainId: 11155111
};

export const Config_BoxPublic : ContractConfigType ={
    address: Proxy_BoxPublic as `0x${string}`,
    abi: ABI_BoxPublic,
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

export const Config_PublicKeyCrypt : ContractConfigType ={
    address: Proxy_PublicKeyCrypt,
    abi: ABI_PublicKeyCrypt,
    chainId: 11155111
};
*/


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