// import { useEffect, useState } from 'react';
import { useWalletContext } from '../../context/useAccount/WalletContext';
import { parseAbiItem } from 'viem';
import {
    Config_TruthBox,
} from '../../constants/abiAddress_v1_3';

export interface TruthBoxEventType {
    contract: string;
    event: string;
    tokenId: number;
    from?: string;
    to?: string;
}


export const useTransferEvents = () => {
    const { publicClient } = useWalletContext();
    // const [events, setEvents] = useState<TruthBoxEventType[]>([]);

    const transferEvents = async (fromBlock: any, fromAddr?: string, toAddr?: string,): Promise<TruthBoxEventType[]> => {
        if (!publicClient) return [];

        const batchSize = 100000n; // 每次查询10000个区块
        // const latestBlock = await publicClient.getBlockNumber();
        // let fromBlock = latestBlock; // 6840000高度
        const deploymentBlock = 7200000n;
        let allEvents: TruthBoxEventType[] = [];
        let counts = 1;

        while (fromBlock > deploymentBlock) {
            const toBlock = fromBlock; // 当前开始区块
            const tx = fromBlock - batchSize + 1n
            fromBlock = tx > deploymentBlock ? tx : deploymentBlock;
            console.log(`get Transfer event logs: ${counts} times`)
            try {
                const events = await publicClient.getLogs({
                    address: Config_TruthBox.address,
                    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'),
                    fromBlock,
                    toBlock,
                    args: {
                        from: fromAddr as `0x${string}` | undefined,
                        to: toAddr as `0x${string}` | undefined,
                        // tokenId: tokenId ? BigInt(tokenId) : undefined
                    }
                });

                // console.log('before:', events);

                const formattedEvents = events.map((e: any) => ({
                    contract: 'TruthBox',
                    event: 'Transfer',
                    from: e.args.from,
                    to: e.args.to,
                    tokenId: parseInt(e.args.tokenId.toString()),
                    blockNumber: Number(e.blockNumber)
                }));

                allEvents = [...formattedEvents, ...allEvents];

            } catch (error) {
                console.error('get Transfer event error:', error);
                // 可以在这里添加重试逻辑
            }
            counts++;

        }
        // 按区块号升序排序
        allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);


        console.log('after:', allEvents);
        // setEvents(allEvents);

        return allEvents;
    };

    return transferEvents;
};

/*
export const useInvalidEvents = () => {
    const { publicClient } = useWalletContext();
    // const [events, setEvents] = useState<TruthBoxEventType[]>([]);

    const invalidEvents = async (tokenId?: number): Promise<TruthBoxEventType[]> => {
        if (!publicClient) return [];

        const batchSize = 100000n;
        const latestBlock = await publicClient.getBlockNumber();
        let fromBlock = latestBlock;
        const deploymentBlock = 7200000n;
        let allEvents: TruthBoxEventType[] = [];
        let counts = 1;

        while (fromBlock > deploymentBlock) {
            const toBlock = fromBlock;
            const tx = fromBlock - batchSize + 1n;
            fromBlock = tx > deploymentBlock ? tx : deploymentBlock;
            console.log(`get Invalid event logs: ${counts} times`);
            try {
                const invalidEvents = await publicClient.getLogs({
                    address: Config_TruthBox.address,
                    event: parseAbiItem('event Invalid(uint256 tokenId_)'),
                    fromBlock,
                    toBlock,
                    args: {
                        tokenId_: tokenId ? BigInt(tokenId) : undefined
                    }
                });

                const formattedEvents = invalidEvents.map((e: any) => ({
                    contract: 'TruthBox',
                    event: 'Invalid',
                    tokenId: parseInt(e.args.tokenId_.toString()),
                    blockNumber: Number(e.blockNumber)
                }));

                allEvents = [...formattedEvents, ...allEvents];
            } catch (error) {
                console.error('get Invalid event error:', error);
            }
            counts++;
        }

        allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
        // setEvents(allEvents);

        return allEvents;
    };

    return invalidEvents;
};
*/
export const usePublicEvents = () => {
    const { publicClient } = useWalletContext();
    // const [events, setEvents] = useState<TruthBoxEventType[]>([]);

    const publicEvents = async (fromBlock: any, tokenId?: number): Promise<TruthBoxEventType[]> => {
        if (!publicClient) return [];

        const batchSize = 100000n;
        // const latestBlock = await publicClient.getBlockNumber();
        // let fromBlock = latestBlock;
        const deploymentBlock = 7200000n;
        let allEvents: TruthBoxEventType[] = [];
        let counts = 1;

        while (fromBlock > deploymentBlock) {
            const toBlock = fromBlock;
            const tx = fromBlock - batchSize + 1n;
            fromBlock = tx > deploymentBlock ? tx : deploymentBlock;
            console.log(`get Public event logs: ${counts} times`);
            try {
                const publicEvents = await publicClient.getLogs({
                    address: Config_TruthBox.address,
                    event: parseAbiItem('event Public(uint256 tokenId_)'),
                    fromBlock,
                    toBlock,
                    args: {
                        tokenId_: tokenId ? BigInt(tokenId) : undefined
                    }
                });

                const formattedEvents = publicEvents.map((e: any) => ({
                    contract: 'TruthBox',
                    event: 'Public',
                    tokenId: parseInt(e.args.tokenId_.toString()),
                    blockNumber: Number(e.blockNumber)
                }));

                allEvents = [...formattedEvents, ...allEvents];
            } catch (error) {
                console.error('get Public event error:', error);
            }
            counts++;
        }

        allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
        // setEvents(allEvents);
        return allEvents;
    };

    return publicEvents;
};
