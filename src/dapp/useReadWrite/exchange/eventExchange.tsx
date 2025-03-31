// import { useEffect, useState } from 'react';
import { useWalletContext } from '../../context/useAccount/WalletContext';
import { parseAbiItem } from 'viem';
import { Config_Exchange } from '../../constants/abiAddress_v1_3';
// import { useEventFetcher } from '../../hooks/useEventFetcher';

export interface EventType {
    contract: string;
    event: string;
    address: string;
    tokenId: number;
    price?: number;
    blockNumber: number;
}

export const useBidderEvents = () => {
    const { publicClient } = useWalletContext();

    const bidderEvents = async (fromBlock: any, address?: string): Promise<EventType[]> => {
        if (!publicClient) return [];

        const batchSize = 100000n;
        // const latestBlock = await publicClient.getBlockNumber();
        // let fromBlock = latestBlock;
        const deploymentBlock = 7200000n;
        let allEvents: EventType[] = [];
        let counts = 1;

        while (fromBlock > deploymentBlock) {
            const toBlock = fromBlock;
            const tx = fromBlock - batchSize + 1n;
            fromBlock = tx > deploymentBlock ? tx : deploymentBlock;
            console.log(`get Bidder event logs: ${counts} times`);
            try {
                const events = await publicClient.getLogs({
                    address: Config_Exchange.address,
                    event: parseAbiItem('event Bidder(address indexed buyer, uint256 indexed tokenId, uint256 indexed price)'),
                    fromBlock,
                    toBlock,
                    args: {
                        buyer: address as `0x${string}` | undefined,
                        // tokenId: tokenId ? BigInt(tokenId) : undefined
                    }
                });

                const formattedEvents = events.map((e: any) => ({
                    contract: 'Exchange',
                    event: 'Bidder',
                    address: e.args.buyer,
                    tokenId: parseInt(e.args.tokenId.toString()),
                    // tokenId: e.args?.tokenId ? Number(e.args.tokenId) : 0,
                    blockNumber: Number(e.blockNumber)
                }));

                allEvents = [...formattedEvents, ...allEvents];
            } catch (error) {
                console.error('get Bidder event error:', error);
            }
            counts++;
        }

        allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
        // setEvents(allEvents);
        return allEvents;
    };

    return bidderEvents;
};
/*
export const useSellerEvents = () => {
    const { publicClient } = useWalletContext();

        const sellerEvents = async (address?: string) : Promise<EventType[]>=> {
            if (!publicClient) return[];

            const batchSize = 100000n;
            const latestBlock = await publicClient.getBlockNumber();
            let fromBlock = latestBlock;
            const deploymentBlock = 7200000n;
            let allEvents: EventType[] = [];
            let counts = 1;

            while (fromBlock > deploymentBlock) {
                const toBlock = fromBlock;
                const tx = fromBlock - batchSize + 1n;
                fromBlock = tx > deploymentBlock ? tx : deploymentBlock;
                console.log(`get Seller event logs: ${counts} times`);
                try {
                    const events = await publicClient.getLogs({
                        address: Config_Exchange.address,
                        event: parseAbiItem('event Seller(address seller, uint256 indexed tokenId)'),
                        fromBlock,
                        toBlock,
                        args: {
                            seller: address as `0x${string}` | undefined,
                            // tokenId: tokenId ? BigInt(tokenId) : undefined
                        }
                    });

                    const formattedEvents = events.map((e: any) => ({
                        contract: 'Exchange',
                        event: 'Seller',
                        address: e.args.seller,
                        tokenId: parseInt(e.args.tokenId.toString()),
                        // tokenId: e.args?.tokenId ? Number(e.args.tokenId) : 0,
                        blockNumber: Number(e.blockNumber)
                    }));

                    allEvents = [...formattedEvents, ...allEvents];
                } catch (error) {
                    console.error('get Seller event error:', error);
                }
                counts++;
            }

            allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
            // setEvents(allEvents);
            return allEvents;
        };

    return sellerEvents;
};
*/

export const useBuyerEvents = () => {
    const { publicClient } = useWalletContext();

    const buyerEvents = async (fromBlock: any, address?: string): Promise<EventType[]> => {
        if (!publicClient) return [];

        const batchSize = 100000n;
        // const latestBlock = await publicClient.getBlockNumber();
        // let fromBlock = latestBlock;
        const deploymentBlock = 7200000n;
        let allEvents: EventType[] = [];
        let counts = 1;

        while (fromBlock > deploymentBlock) {
            const toBlock = fromBlock;
            const tx = fromBlock - batchSize + 1n;
            fromBlock = tx > deploymentBlock ? tx : deploymentBlock;
            console.log(`get Buyer event logs: ${counts} times`);
            try {
                const events = await publicClient.getLogs({
                    address: Config_Exchange.address,
                    event: parseAbiItem('event Buyer(address buyer, uint256 indexed tokenId)'),
                    fromBlock,
                    toBlock,
                    args: {
                        buyer: address as `0x${string}` | undefined,
                        // tokenId: tokenId ? BigInt(tokenId) : undefined
                    }
                });

                const formattedEvents = events.map((e: any) => ({
                    contract: 'Exchange',
                    event: 'Buyer',
                    address: e.args.buyer,
                    tokenId: parseInt(e.args.tokenId.toString()),
                    // tokenId: e.args?.tokenId ? Number(e.args.tokenId) : 0,
                    blockNumber: Number(e.blockNumber)
                }));

                allEvents = [...formattedEvents, ...allEvents];
            } catch (error) {
                console.error('get Buyer event error:', error);
            }
            counts++;
        }

        allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
        // setEvents(allEvents);
        return allEvents;
    };

    return buyerEvents;
};


export const useCompleterEvents = () => {
    const { publicClient } = useWalletContext();

    const completerEvents = async (fromBlock: any, address?: string): Promise<EventType[]> => {
        if (!publicClient) return [];

        const batchSize = 100000n;
        // const latestBlock = await publicClient.getBlockNumber();
        // let fromBlock = latestBlock;
        const deploymentBlock = 7200000n;
        let allEvents: EventType[] = [];
        let counts = 1;

        while (fromBlock > deploymentBlock) {
            const toBlock = fromBlock;
            const tx = fromBlock - batchSize + 1n;
            fromBlock = tx > deploymentBlock ? tx : deploymentBlock;
            console.log(`get Completer event logs: ${counts} times`);
            try {
                const events = await publicClient.getLogs({
                    address: Config_Exchange.address,
                    event: parseAbiItem('event Completer(address sender, uint256 indexed tokenId)'),
                    fromBlock,
                    toBlock,
                    args: {
                        sender: address as `0x${string}` | undefined,
                        // tokenId: tokenId ? BigInt(tokenId) : undefined
                    }
                });

                const formattedEvents = events.map((e: any) => ({
                    contract: 'Exchange',
                    event: 'Completer',
                    address: e.args.sender,
                    tokenId: parseInt(e.args.tokenId.toString()),
                    // tokenId: e.args?.tokenId ? Number(e.args.tokenId) : 0,
                    blockNumber: Number(e.blockNumber)
                }));

                allEvents = [...formattedEvents, ...allEvents];
            } catch (error) {
                console.error('get Completer event error:', error);
            }
            counts++;
        }

        allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
        // setEvents(allEvents);
        return allEvents;
    };


    return completerEvents;
};

// 组合所有事件的主 hook
// export const useExchangeEvents = (address?: string, tokenId?: number) => {
//     const bidderEvents = useBidderEvents(address, tokenId);
//     const sellerEvents = useSellerEvents(address, tokenId);
//     const buyerEvents = useBuyerEvents(address, tokenId);
//     const completerEvents = useCompleterEvents(address, tokenId);

//     return [...bidderEvents, ...sellerEvents, ...buyerEvents, ...completerEvents];
// };
