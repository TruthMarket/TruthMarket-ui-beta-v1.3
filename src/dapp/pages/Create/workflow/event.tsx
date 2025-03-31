
/*
// import { useEffect } from 'react';
import { useJsonContext } from '../useState/json';
import { useWalletContext } from '@context/useAccount/WalletContext';
import {
    // useWaitForTransactionReceipt,
    // useWriteContract,
    useWatchContractEvent
} from 'wagmi';
import { Config_TruthBox } from '@constants/abiAddress_v1_3';
import { Address } from 'viem';

export const useMintEvent = () => {
    const { address: userAddress } = useWalletContext();
    const { abi, address } = Config_TruthBox;
    const { updateJsonState } = useJsonContext() || {};

    // 监听 Transfer 事件
    useWatchContractEvent({
        address,
        abi,
        eventName: 'Transfer',
        onLogs(logs) {
            logs.forEach((log) => {
                const [from, to, tokenId] = log.args;

                // 检查是否是铸造事件（from 为零地址）且接收者是当前用户
                if (from === '0x0000000000000000000000000000000000000000' as Address && 
                    to === userAddress) {
                    console.log('NFT Minted:', {
                        tokenId: tokenId,
                        to: to
                    });
                    
                    // 更新 JsonState
                    updateJsonState?.('tokenId', Number(tokenId));
                }
            });
        },
    });
};

// 使用示例：
/*
import { useMintEvent } from './event';

const YourComponent = () => {
    // 在组件中使用
    useMintEvent();

    return (
        // 你的组件内容
    );
};
*/