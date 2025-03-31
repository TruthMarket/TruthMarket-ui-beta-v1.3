import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from 'react';

// 标签页计数类型
export interface TabCountsType {
    minter: number;
    buyer: number;
    bidder: number;
    completer: number;
    total_Rewards: number;
    unclaimed: number;
}

// 地址事件数据类型
interface AddressEventDataType {
    tabCounts: TabCountsType;
    buyerList: number[];
    bidderList: number[];
    completerList: number[];
    minterList: number[];
    timestamp: number;
    blockNumber: bigint;
}

// Context 类型定义
interface EventDataContextType {
    addressEventMap: Map<string, AddressEventDataType>;
    updateAddressEvent: (address: string, data: Partial<Omit<AddressEventDataType, 'timestamp' | 'blockNumber'>>) => void;
    // 在函数的类型定义中使用 Omit<AddressEventDataType, 'timestamp' | 'blockNumber'> 
    // 是为了防止外部直接修改这两个特殊字段。
    getAddressEvent: (address: string) => AddressEventDataType | undefined;
    clearAddressEvent: (address: string) => void;
    checkAddressExpired: (address: string) => boolean;
    updateBlockNumber: (address: string, blockNumber: bigint) => void;
    getBlockNumber: (address: string) => bigint | undefined;
    getTabCounts: (address: string) => TabCountsType | undefined;
    getBuyerList: (address: string) => number[] | undefined;
    getBidderList: (address: string) => number[] | undefined;
    getCompleterList: (address: string) => number[] | undefined;
    getMinterList: (address: string) => number[] | undefined;
    updateTabCounts: (address: string, tabCounts: Partial<TabCountsType>) => void;
    updateBuyerList: (address: string, buyerList: number[]) => void;
    updateBidderList: (address: string, bidderList: number[]) => void;
    updateCompleterList: (address: string, completerList: number[]) => void;
    updateMinterList: (address: string, minterList: number[]) => void;
    addTokenIdToList: (address: string, listType: 'buyer' | 'bidder' | 'completer' | 'minter', tokenId: number) => void;
    removeTokenIdFromList: (address: string, listType: 'buyer' | 'bidder' | 'completer' | 'minter', tokenId: number) => void;
}

// 创建默认值对象
const defaultContextValue: EventDataContextType = {
    addressEventMap: new Map(),
    updateAddressEvent: () => {},
    getAddressEvent: () => undefined,
    clearAddressEvent: () => {},
    checkAddressExpired: () => false,
    updateBlockNumber: () => {},
    getBlockNumber: () => undefined,
    getTabCounts: () => undefined,
    getBuyerList: () => undefined,
    getBidderList: () => undefined,
    getCompleterList: () => undefined,
    getMinterList: () => undefined,
    updateTabCounts: () => {},
    updateBuyerList: () => {},
    updateBidderList: () => {},
    updateCompleterList: () => {},
    updateMinterList: () => {},
    addTokenIdToList: () => {},
    removeTokenIdFromList: () => {},
};

// 常量定义
const FIVE_MINUTES = 5 * 60 * 1000; // 5分钟的毫秒数

// 创建 Context
const Context = createContext<EventDataContextType>(defaultContextValue);

// Provider 组件
export const EventDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [addressEventMap, setAddressEventMap] = useState<Map<string, AddressEventDataType>>(new Map());

    // 获取初始化数据的辅助函数
    const getInitialData = (): AddressEventDataType => {
        return {
            tabCounts: {
                minter: 0,
                buyer: 0,
                bidder: 0,
                completer: 0,
                total_Rewards: 0,
                unclaimed: 0
            },
            buyerList: [],
            bidderList: [],
            completerList: [],
            minterList: [],
            timestamp: Date.now(),
            blockNumber: 0n
        };
    };

    // 直接获取方法
    const getTabCounts = useCallback((address: string) => {
        return addressEventMap.get(address)?.tabCounts;
    }, [addressEventMap]);

    const getBuyerList = useCallback((address: string) => {
        return addressEventMap.get(address)?.buyerList;
    }, [addressEventMap]);

    const getBidderList = useCallback((address: string) => {
        return addressEventMap.get(address)?.bidderList;
    }, [addressEventMap]);

    const getCompleterList = useCallback((address: string) => {
        return addressEventMap.get(address)?.completerList;
    }, [addressEventMap]);

    const getMinterList = useCallback((address: string) => {
        return addressEventMap.get(address)?.minterList;
    }, [addressEventMap]);

    // 直接更新方法
    const updateTabCounts = useCallback((address: string, tabCounts: Partial<TabCountsType>) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(address) || getInitialData();
            newMap.set(address, {
                ...existingData,
                tabCounts: { ...existingData.tabCounts, ...tabCounts },
                timestamp: Date.now()
            });
            return newMap;
        });
    }, []);

    const updateBuyerList = useCallback((address: string, buyerList: number[]) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(address) || getInitialData();
            newMap.set(address, {
                ...existingData,
                buyerList,
                timestamp: Date.now()
            });
            return newMap;
        });
    }, []);

    const updateBidderList = useCallback((address: string, bidderList: number[]) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(address) || getInitialData();
            newMap.set(address, {
                ...existingData,
                bidderList,
                timestamp: Date.now()
            });
            return newMap;
        });
    }, []);

    const updateCompleterList = useCallback((address: string, completerList: number[]) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(address) || getInitialData();
            newMap.set(address, {
                ...existingData,
                completerList,
                timestamp: Date.now()
            });
            return newMap;
        });
    }, []);

    const updateMinterList = useCallback((address: string, minterList: number[]) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(address) || getInitialData();
            newMap.set(address, {
                ...existingData,
                minterList,
                timestamp: Date.now()
            });
            return newMap;
        });
    }, []);

    // 列表操作方法
    const addTokenIdToList = useCallback((
        address: string, 
        listType: 'buyer' | 'bidder' | 'completer' | 'minter', 
        tokenId: number
    ) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(address) || getInitialData();
            const listKey = `${listType}List` as keyof AddressEventDataType;
            const currentList = [...(existingData[listKey] as number[])];
            
            if (!currentList.includes(tokenId)) {
                currentList.push(tokenId);
                newMap.set(address, {
                    ...existingData,
                    [listKey]: currentList,
                    timestamp: Date.now()
                });
            }
            return newMap;
        });
    }, []);

    const removeTokenIdFromList = useCallback((
        address: string, 
        listType: 'buyer' | 'bidder' | 'completer' | 'minter', 
        tokenId: number
    ) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(address) || getInitialData();
            const listKey = `${listType}List` as keyof AddressEventDataType;
            const currentList = [...(existingData[listKey] as number[])];
            
            const index = currentList.indexOf(tokenId);
            if (index > -1) {
                currentList.splice(index, 1);
                newMap.set(address, {
                    ...existingData,
                    [listKey]: currentList,
                    timestamp: Date.now()
                });
            }
            return newMap;
        });
    }, []);

    // 检查数据是否过期
    const isDataExpired = (timestamp: number): boolean => {
        return Date.now() - timestamp > FIVE_MINUTES;
    };

    // 新增：检查地址数据是否过期
    const checkAddressExpired = useCallback((address: string): boolean => {
        const data = addressEventMap.get(address);
        if (!data) return true; // 如果没有数据，视为过期
        return isDataExpired(data.timestamp);
    }, [addressEventMap]);

    // 新增：更新区块号
    const updateBlockNumber = useCallback((address: string, blockNumber: bigint) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(address);
            if (existingData) {
                newMap.set(address, {
                    ...existingData,
                    blockNumber,
                    timestamp: Date.now() // 更新时间戳
                });
            }
            return newMap;
        });
    }, []);

    // 新增：获取区块号
    const getBlockNumber = useCallback((address: string): bigint | undefined => {
        const data = addressEventMap.get(address);
        return data?.blockNumber;
    }, [addressEventMap]);

    // 清除过期数据
    // const clearExpiredData = useCallback(() => {
    //     setAddressEventMap(prevMap => {
    //         const newMap = new Map(prevMap);
    //         for (const [address, data] of newMap) {
    //             if (isDataExpired(data.timestamp)) {
    //                 newMap.delete(address);
    //             }
    //         }
    //         return newMap;
    //     });
    // }, []);

    // 更新指定地址的事件数据
    const updateAddressEvent = useCallback((
        address: string,
        data: Partial<Omit<AddressEventDataType, 'timestamp' | 'blockNumber'>>
    ) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(address);

            const updatedData: AddressEventDataType = {
                tabCounts: {
                    minter: 0,
                    buyer: 0,
                    bidder: 0,
                    completer: 0,
                    total_Rewards: 0,
                    unclaimed: 0,
                    ...(existingData?.tabCounts || {}),
                    ...(data.tabCounts || {})
                },
                buyerList: [],
                bidderList: [],
                completerList: [],
                minterList: [],
                timestamp: Date.now(),
                blockNumber: existingData?.blockNumber || 0n
            };

            newMap.set(address, updatedData);
            return newMap;
        });
    }, []);

    // 获取指定地址的事件数据
    const getAddressEvent = useCallback((address: string) => {
        const data = addressEventMap.get(address);
        if (data && !isDataExpired(data.timestamp)) {
            return data;
        }
        // 如果数据过期，清除并返回 undefined
        if (data) {
            clearAddressEvent(address);
        }
        return undefined;
    }, [addressEventMap]);

    // 清除指定地址的事件数据
    const clearAddressEvent = useCallback((address: string) => {
        setAddressEventMap(prevMap => {
            const newMap = new Map(prevMap);
            newMap.delete(address);
            return newMap;
        });
    }, []);

    return (
        <Context.Provider value={{
            addressEventMap,
            updateAddressEvent,
            getAddressEvent,
            clearAddressEvent,
            checkAddressExpired,

            updateBlockNumber,
            getBlockNumber,
            getTabCounts,
            getBuyerList,
            getBidderList,
            getCompleterList,
            getMinterList,
            updateTabCounts,
            updateBuyerList,
            updateBidderList,
            updateCompleterList,
            updateMinterList,

            addTokenIdToList,
            removeTokenIdFromList,
            
        }}>
            {children}
        </Context.Provider>
    );
};

// 自定义 Hook
export const useEventDataContext = () => useContext(Context);

// 使用示例：
/*
const YourComponent = () => {
    const { 
        updateAddressEvent, 
        getAddressEvent, 
        clearAddressEvent,
        clearExpiredData,
        checkAddressExpired,
        updateBlockNumber,
        getBlockNumber 
    } = useEventDataContext() || {};

    useEffect(() => {
        // 定期清理过期数据
        const timer = setInterval(clearExpiredData, 60000);
        return () => clearInterval(timer);
    }, [clearExpiredData]);

    // 检查地址数据是否过期
    const isExpired = checkAddressExpired?.('0x123...');
    
    // 更新区块号
    updateBlockNumber?.('0x123...', 12345);
    
    // 获取区块号
    const blockNumber = getBlockNumber?.('0x123...');

    // 更新数据
    updateAddressEvent?.('0x123...', {
        tabCounts: { minter: 5 },
        eventList: { buyerList: [1, 2, 3] }
    });

    // 获取数据（会自动检查是否过期）
    const addressData = getAddressEvent?.('0x123...');

    // 手动清除数据
    clearAddressEvent?.('0x123...');

    return (
        // 组件内容
    );
};
*/
