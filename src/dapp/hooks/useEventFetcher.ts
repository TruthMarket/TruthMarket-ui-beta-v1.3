// import { useCallback } from 'react';
import { useWalletContext } from '../context/useAccount/WalletContext';
import { Log, parseAbiItem } from 'viem';

interface EventFetcherOptions {
    address: `0x${string}`;
    eventSignature: string;
    fromBlock?: bigint;
    args?: any;
}


export const useEventFetcher = () => {
    const { publicClient } = useWalletContext();

    const fetchEvents =async <T>({
        address,
        eventSignature,
        fromBlock,
        args
    }: EventFetcherOptions, formatEvent: (e: Log) => T) => {
        if (!publicClient) return [];
        console.log('fetchEvents args:',address, eventSignature, args)
        const batchSize = 100000n;
        const latestBlock = await publicClient.getBlockNumber();
        let FromBlock = fromBlock || latestBlock;
        const deploymentBlock = 7000000n;
        let allEvents: T[] = [];
        let counts = 1;

        while (FromBlock > deploymentBlock) {
            const ToBlock = FromBlock;
            const tx = FromBlock - batchSize + 1n;
            FromBlock = tx > deploymentBlock ? tx : deploymentBlock;
            console.log(`Get event logs: ${counts} times`);
            try {
                const events = await publicClient.getLogs({
                    address,
                    event: parseAbiItem(eventSignature),
                    fromBlock: FromBlock,
                    toBlock: ToBlock,
                    ...(args ? { args } : {}) // 只在 args 存在时才添加到请求中
                });

                const formattedEvents = events.map(formatEvent);
                allEvents = [...formattedEvents, ...allEvents];
            } catch (error) {
                console.error('Get event logs error:', error);
            }
            counts++;
        }

        return allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
    }

    return { fetchEvents };
};
