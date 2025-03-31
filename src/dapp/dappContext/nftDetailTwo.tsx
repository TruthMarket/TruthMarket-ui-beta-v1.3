import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from 'react';
import { NftDetailType_two } from "../type/contractDate";

// 数据类型接口
interface DataType {
    nftDetail_two: NftDetailType_two;
    timestamp: number;
}

// 初始值
const nft_two_init: NftDetailType_two = {
    deliveryTimestamp: 0,
    refundRequestTimestamp: 0,
    purchaseTimestamp: 0,
    overDeadline: false,
    isBlackTokenId: false,
    refundPermit: false,
    inRefundDeadline: true,
    inReviewDeadline: true,
    minter: '',
    owner: '',
    buyer: '',
    noBuyer: true,
    fileUri: '',
}

// Context 类型定义
interface ContextType {
    tokenIdDataMap: Map<number, DataType>;
    updateNftDetail: (tokenId: number, data: Partial<NftDetailType_two>) => void;
    getNftDetail: (tokenId: number) => NftDetailType_two | undefined;
    getNftDetailNoCheck: (tokenId: number) => NftDetailType_two | undefined;
    clearNftDetail: (tokenId: number) => void;
    clearExpiredData: () => void;
    checkTokenIdExpired: (tokenId: number) => boolean;
}

// 创建默认值对象
const defaultContextValue: ContextType = {
    tokenIdDataMap: new Map(),
    updateNftDetail: () => {},
    getNftDetail: () => undefined,
    getNftDetailNoCheck: () => undefined,
    clearNftDetail: () => {},
    clearExpiredData: () => {},
    checkTokenIdExpired: () => false,
};

// 常量定义
const FIVE_MINUTES = 5 * 60 * 1000;

// 创建 Context，使用默认值
const Context = createContext<ContextType>(defaultContextValue);

// Provider 组件
export const NftDetailTwoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tokenIdDataMap, setTokenIdDataMap] = useState<Map<number, DataType>>(new Map());

    const isDataExpired = (timestamp: number): boolean => {
        return Date.now() - timestamp > FIVE_MINUTES;
    };

    const checkTokenIdExpired = useCallback((tokenId: number): boolean => {
        const data = tokenIdDataMap.get(tokenId);
        if (!data) return true;
        return isDataExpired(data.timestamp);
    }, [tokenIdDataMap]);

    const updateNftDetail = useCallback((
        tokenId: number,
        data: Partial<NftDetailType_two>
    ) => {
        setTokenIdDataMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingData = newMap.get(tokenId);

            const updatedData: DataType = {
                nftDetail_two: {
                    ...nft_two_init,
                    ...(existingData?.nftDetail_two || {}),
                    ...data
                },
                timestamp: Date.now()
            };

            newMap.set(tokenId, updatedData);
            return newMap;
        });
    }, []);

    const getNftDetail = useCallback((tokenId: number) => {
        const data = tokenIdDataMap.get(tokenId);
        if (data && !isDataExpired(data.timestamp)) {
            return data.nftDetail_two;
        }
        if (data) {
            clearNftDetail(tokenId);
        }
        return undefined;
    }, [tokenIdDataMap]);

    const getNftDetailNoCheck = useCallback((tokenId: number) => {
        return tokenIdDataMap.get(tokenId)?.nftDetail_two;
    }, [tokenIdDataMap]);

    const clearNftDetail = useCallback((tokenId: number) => {
        setTokenIdDataMap(prevMap => {
            const newMap = new Map(prevMap);
            newMap.delete(tokenId);
            return newMap;
        });
    }, []);

    const clearExpiredData = useCallback(() => {
        setTokenIdDataMap(prevMap => {
            const newMap = new Map(prevMap);
            for (const [tokenId, data] of newMap) {
                if (isDataExpired(data.timestamp)) {
                    newMap.delete(tokenId);
                }
            }
            return newMap;
        });
    }, []);

    return (
        <Context.Provider value={{
            tokenIdDataMap,
            updateNftDetail,
            getNftDetail,
            getNftDetailNoCheck,
            clearNftDetail,
            clearExpiredData,
            checkTokenIdExpired
        }}>
            {children}
        </Context.Provider>
    );
};

// 自定义 Hook - 现在可以直接使用，不需要空值检查
export const useNftDetailTwoContext = () => useContext(Context);

// 使用示例：
/*
const YourComponent = () => {
    const {
        updateNftDetail,
        getNftDetail,
        getNftDetailNoCheck,
        clearNftDetail,
        clearExpiredData,
        checkTokenIdExpired
    } = useNftDetailTwo();  // 不再需要 || {}

    useEffect(() => {
        const timer = setInterval(() => {
            clearExpiredData();
        }, 60000);
        return () => clearInterval(timer);
    }, [clearExpiredData]);

    // 更新数据
    const handleUpdate = () => {
        updateNftDetail(1, {
            buyer: '0x123...',
            noBuyer: false
        });
    };

    // 获取数据（带过期检查）
    const nftDetail = getNftDetail(1);

    // 获取数据（不检查过期）
    const nftDetailRaw = getNftDetailNoCheck(1);

    // 检查数据是否过期
    const isExpired = checkTokenIdExpired(1);

    // 清除数据
    const handleClear = () => {
        clearNftDetail(1);
    };

    return (
        // 组件内容
    );
};
*/


