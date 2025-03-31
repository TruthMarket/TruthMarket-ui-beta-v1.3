import { useEffect, useState } from 'react';
import { useWalletContext } from '../../context/useAccount/WalletContext';
import { parseAbiItem } from 'viem';
import { 
    Config_BoxStatus,
} from '../../constants/abiAddress_v1_3';

interface BoxStatusEventType {
    contract: string;
    event: string;
    tokenId: string;
    price?: string;
}

export const useSellingEvents = (tokenId?: string) => {
    const { publicClient } = useWalletContext();
    const [events, setEvents] = useState<BoxStatusEventType[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!publicClient) return;

            const sellingEvents = await publicClient.getLogs({
                address: Config_BoxStatus.address,
                event: parseAbiItem('event Selling(uint256 tokenId_, uint256 price_)'),
                fromBlock: 'earliest',
                toBlock: 'latest',
                args: {
                    tokenId: tokenId ? BigInt(tokenId) : undefined
                }
            });

            const formattedEvents = sellingEvents.map((e: any) => ({
                contract: 'BoxStatus',
                event: 'Selling',
                tokenId: e.args.tokenId_.toString(),
                price: e.args.price_.toString()
            }));

            setEvents(formattedEvents);
        };

        fetchEvents();
    }, [publicClient, tokenId]);

    return events;
};

/*
export const useAuctioningEvents = (address?: string, tokenId?: string) => {
    // 实现类似 useSellingEvents 的逻辑，但针对 Auctioning 事件
};

export const useDiliveringEvents = (address?: string, tokenId?: string) => {
    // 实现类似 useSellingEvents 的逻辑，但针对 Dilivering 事件
};

export const useCompleteEvents = (address?: string, tokenId?: string) => {
    // 实现类似 useSellingEvents 的逻辑，但针对 Complete 事件
};

export const useRefundingEvents = (address?: string, tokenId?: string) => {
    // 实现类似 useSellingEvents 的逻辑，但针对 Refunding 事件
};

// 可以根据需要添加更多事件hooks

// 组合所有事件的主 hook
export const useBoxStatusEvents = (address?: string, tokenId?: string) => {
    const sellingEvents = useSellingEvents(tokenId);
    const auctioningEvents = useAuctioningEvents(address, tokenId);
    const diliveringEvents = useDiliveringEvents(address, tokenId);
    const completeEvents = useCompleteEvents(address, tokenId);
    const refundingEvents = useRefundingEvents(address, tokenId);

    return [
        ...sellingEvents, 
        ...auctioningEvents, 
        ...diliveringEvents, 
        ...completeEvents, 
        ...refundingEvents
    ];
};
*/