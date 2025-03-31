import { useEffect, useState } from 'react';
// import { useWalletContext } from '../../context/useAccount/WalletContext';
// import { Log, parseAbiItem } from 'viem';
import {
    Config_FundManager,
} from '../../constants/abiAddress_v1_3';
import { useEventFetcher } from '../../hooks/useEventFetcher';

interface FundManagerEventType {
    contract: string;
    event: string;
    money?: string;
    owner?: string;
    blockNumber?: number;
}
export const useOrderAmountEvents = () => {
    const [events, setEvents] = useState<FundManagerEventType[]>([]);
    const { fetchEvents } = useEventFetcher();

    useEffect(() => {
        const getEvents = async () => {
            const fetchedEvents = await fetchEvents({
                address: Config_FundManager.address,
                eventSignature: 'event OrderAmount(uint256 indexed amount)',
            }, (e: any) => ({
                contract: 'FundManager',
                event: 'OrderAmount',
                money: e.args.money.toString(),
                blockNumber: Number(e.blockNumber)
            }));
            setEvents(fetchedEvents);
        };

        getEvents();
    }, [fetchEvents]);

    return events;
};
/*
export const useOrderAmountEvents = () => {
    const { publicClient } = useWalletContext();
    const [events, setEvents] = useState<FundManagerEventType[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!publicClient) return;

            const batchSize = 100000n;
            const latestBlock = await publicClient.getBlockNumber();
            let fromBlock = latestBlock;
            const deploymentBlock = 7200000n;
            let allEvents: FundManagerEventType[] = [];
            let counts = 1;

            while (fromBlock > deploymentBlock) {
                const toBlock = fromBlock;
                const tx = fromBlock - batchSize + 1n;
                fromBlock = tx > deploymentBlock ? tx : deploymentBlock;
                console.log(`get Receive event logs: ${counts} times`);
                try {
                    const receiveEvents = await publicClient.getLogs({
                        address: Config_FundManager.address,
                        event: parseAbiItem('event Receive(uint256 indexed money)'),
                        fromBlock,
                        toBlock
                    });

                    const formattedEvents = receiveEvents.map((e: any) => ({
                        contract: 'FundManager',
                        event: 'Receive',
                        money: e.args.money.toString(),
                        blockNumber: Number(e.blockNumber)
                    }));

                    allEvents = [...formattedEvents, ...allEvents];
                } catch (error) {
                    console.error('get Receive event error:', error);
                }
                counts++;
            }

            allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
            setEvents(allEvents);
        };

        fetchEvents();
    }, [publicClient]);

    return events;
};
*/

export const useWithdrawEvents = (address?: string) => {
    const [events, setEvents] = useState<FundManagerEventType[]>([]);
    const { fetchEvents } = useEventFetcher();

    useEffect(() => {
        const getEvents = async () => {
            const fetchedEvents = await fetchEvents({
                address: Config_FundManager.address,
                eventSignature: 'event Withdraw(address indexed owner, uint256 indexed amount)',
                args: {
                    owner: address as `0x${string}` | undefined
                }
            }, (e: any) => ({
                contract: 'FundManager',
                event: 'Withdraw',
                owner: e.args.owner,
                money: e.args.money.toString(),
                blockNumber: Number(e.blockNumber)
            }));
            setEvents(fetchedEvents);
        };

        getEvents();
    }, [fetchEvents, address]);

    return events;
};

/*
export const useWithdrawEvents = (address?: string) => {
    const { publicClient } = useWalletContext();
    const [events, setEvents] = useState<FundManagerEventType[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!publicClient) return;

            const batchSize = 100000n;
            const latestBlock = await publicClient.getBlockNumber();
            let fromBlock = latestBlock;
            const deploymentBlock = 7200000n;
            let allEvents: FundManagerEventType[] = [];
            let counts = 1;

            while (fromBlock > deploymentBlock) {
                const toBlock = fromBlock;
                const tx = fromBlock - batchSize + 1n;
                fromBlock = tx > deploymentBlock ? tx : deploymentBlock;
                console.log(`get Withdraw event logs: ${counts} times`);
                try {
                    const withdrawEvents = await publicClient.getLogs({
                        address: Config_FundManager.address,
                        event: parseAbiItem('event Withdraw(address indexed owner, uint256 indexed money)'),
                        fromBlock,
                        toBlock,
                        args: {
                            owner: address as `0x${string}` | undefined
                        }
                    });

                    const formattedEvents = withdrawEvents.map((e: any) => ({
                        contract: 'FundManager',
                        event: 'Withdraw',
                        owner: e.args.owner,
                        money: e.args.money.toString(),
                        blockNumber: Number(e.blockNumber)
                    }));

                    allEvents = [...formattedEvents, ...allEvents];
                } catch (error) {
                    console.error('get Withdraw event error:', error);
                }
                counts++;
            }

            allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
            setEvents(allEvents);
        };

        fetchEvents();
    }, [publicClient, address]);

    return events;
};
*/
// 组合所有事件的主 hook
export const useFundManagerEvents = (address?: string) => {
    const receiveEvents = useOrderAmountEvents();
    const withdrawEvents = useWithdrawEvents(address);

    return [...receiveEvents, ...withdrawEvents];
};
