// import { useEffect, useState } from 'react';
// import { useWalletContext } from '../../context/useAccount/WalletContext';
// import { Log, parseAbiItem } from 'viem';
import { Config_Exchange } from '../../constants/abiAddress_v1_3';
import { useEventFetcher } from '../../hooks/useEventFetcher';

export interface EventType {
    contract: string;
    event: string;
    address: string;
    tokenId: number;
    price?: number;
    blockNumber: number;
}

export const useBidderEvents = () => {
    // const [events, setEvents] = useState<EventType[]>([]);
    const { fetchEvents } = useEventFetcher();

    const bidderEvents = async (address?: string): Promise<EventType[]> => {
        const fetchedEvents = await fetchEvents({
            address: Config_Exchange.address,
            eventSignature: 'event Bidder(address indexed buyer, uint256 indexed tokenId_, uint256 indexed price_)',
            args: {
                buyer: address as `0x${string}` | undefined,
                // tokenId_: tokenId ? BigInt(tokenId) : undefined
            }
        }, (e: any) => ({
            contract: 'Exchange',
            event: 'Bidder',
            address: e.args.buyer,
            tokenId: parseInt(e.args.tokenId.toString()),
            price: parseInt(e.args.price.toString()),
            blockNumber: Number(e.blockNumber)
        }));
        // setEvents(fetchedEvents);
        return fetchedEvents;
    };

    return bidderEvents;
};


export const useSellerEvents = () => {
    // const [events, setEvents] = useState<EventType[]>([]);
    const { fetchEvents } = useEventFetcher();

    const sellerEvents = async (address?: string, tokenId?: number): Promise<EventType[]> => {
        const fetchedEvents = await fetchEvents({
            address: Config_Exchange.address,
            eventSignature: 'event Seller(address seller, uint256 indexed tokenId_)',
            args: {
                seller: address as `0x${string}` | undefined,
                tokenId_: tokenId ? BigInt(tokenId) : undefined
            }
        }, (e: any) => ({
            contract: 'Exchange',
            event: 'Seller',
            address: e.args.seller,
            tokenId: parseInt(e.args.tokenId.toString()),
            blockNumber: Number(e.blockNumber)
        }));
        // setEvents(fetchedEvents);
        return fetchedEvents;
    };

    return sellerEvents;
};

export const useBuyerEvents = () => {
    // const [events, setEvents] = useState<EventType[]>([]);
    const { fetchEvents } = useEventFetcher();

    const buyerEvents = async (address?: string, tokenId?: number): Promise<EventType[]> => {
        // console.log('fetch address:', address);

        const fetchedEvents = await fetchEvents({
            address: Config_Exchange.address,
            eventSignature: 'event Buyer(address buyer, uint256 indexed tokenId_)',
            args: {
                buyer: address as `0x${string}` | undefined,
                tokenId_: tokenId ? BigInt(tokenId) : undefined
            }
        }, (e: any) => ({
            contract: 'Exchange',
            event: 'Buyer',
            address: e.args.buyer,
            tokenId: parseInt(e.args.tokenId.toString()),
            blockNumber: Number(e.blockNumber)
        }));
        // setEvents(fetchedEvents);
        return fetchedEvents;
    };

    return buyerEvents;
};

/*
export const useBuyerEvents = (address?: string, tokenId?: number) => {
    const { publicClient } = useWalletContext();
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!publicClient) return;

            const batchSize = 100000n;
            const latestBlock = await publicClient.getBlockNumber();
            let fromBlock = latestBlock;
            const deploymentBlock = 7000000n;
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
                            tokenId: tokenId ? BigInt(tokenId) : undefined
                        }
                    });

                    const formattedEvents = events.map((e: any) => ({
                        contract: 'Exchange',
                        event: 'Buyer',
                        address: e.args.buyer,
                        tokenId: parseInt(e.args.tokenId.toString()),
                        blockNumber: Number(e.blockNumber)
                    }));

                    allEvents = [...formattedEvents, ...allEvents];
                } catch (error) {
                    console.error('get Buyer event error:', error);
                }
                counts++;
            }

            allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
            setEvents(allEvents);
        };

        fetchEvents();
    }, [publicClient, address, tokenId]);

    return events;
};
*/

export const useCompleterEvents = () => {
    // const [events, setEvents] = useState<EventType[]>([]);
    const { fetchEvents } = useEventFetcher();


    const completerEvents = async (address?: string, tokenId?: number): Promise<EventType[]> => {
        
        const fetchedEvents = await fetchEvents({
            address: Config_Exchange.address,
            eventSignature: 'event Completer(address sender, uint256 indexed tokenId_)',
            args: {
                sender: address as `0x${string}` | undefined,
                tokenId_: tokenId ? BigInt(tokenId) : undefined
            }
        }, (e: any) => ({
            contract: 'Exchange',
            event: 'Completer',
            address: e.args.sender,
            tokenId: parseInt(e.args.tokenId.toString()),
            blockNumber: Number(e.blockNumber)
        }));
        // setEvents(fetchedEvents);
        return fetchedEvents;
    };

    return completerEvents;
};

/*
export const useCompleterEvents = (address?: string, tokenId?: number) => {
    const { publicClient } = useWalletContext();
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!publicClient) return;

            const batchSize = 100000n;
            const latestBlock = await publicClient.getBlockNumber();
            let fromBlock = latestBlock;
            const deploymentBlock = 7000000n;
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
                            tokenId: tokenId ? BigInt(tokenId) : undefined
                        }
                    });

                    const formattedEvents = events.map((e: any) => ({
                        contract: 'Exchange',
                        event: 'Completer',
                        address: e.args.sender,
                        tokenId: parseInt(e.args.tokenId.toString()),
                        blockNumber: Number(e.blockNumber)
                    }));

                    allEvents = [...formattedEvents, ...allEvents];
                } catch (error) {
                    console.error('get Completer event error:', error);
                }
                counts++;
            }

            allEvents.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
            setEvents(allEvents);
        };

        fetchEvents();
    }, [publicClient, address, tokenId]);

    return events;
};
*/
// 组合所有事件的主 hook
// export const useExchangeEvents = (address?: string, tokenId?: number) => {
//     const bidderEvents = useBidderEvents(address, tokenId);
//     const sellerEvents = useSellerEvents(address, tokenId);
//     const buyerEvents = useBuyerEvents(address, tokenId);
//     const completerEvents = useCompleterEvents(address, tokenId);

//     return [...bidderEvents, ...sellerEvents, ...buyerEvents, ...completerEvents];
// };
