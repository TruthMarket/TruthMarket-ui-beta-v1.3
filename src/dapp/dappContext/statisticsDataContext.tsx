import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode
} from "react";

export interface StatisticsDateType{
    total: number,
    blacks: number,
    totalDisplay:number,
    storing: number,
    onSale: number,
    swaping: number,
    completed: number,
    published: number,
    GTV: number,
}

// 初始统计数据
export const statistics_init: StatisticsDateType = {
    total: 0,
    blacks: 0,
    totalDisplay: 0,
    storing: 0,
    onSale: 0,
    swaping: 0,
    completed: 0,
    published: 0,
    GTV: 0,
}

// Context 类型定义
interface StatisticsContextType {
    statisticsData: StatisticsDateType;
    timestamp: number;
    updateStatisticsData: (field: keyof StatisticsDateType, value: number) => void;
    updateAllStatisticsData: (data: Partial<StatisticsDateType>) => void;
    checkDataExpired: () => boolean;
    clearStatisticsData: () => void;
}

// 创建默认值对象
const defaultContextValue: StatisticsContextType = {
    statisticsData: statistics_init,
    timestamp: Date.now(),
    updateStatisticsData: () => {},
    updateAllStatisticsData: () => {},
    checkDataExpired: () => false,
    clearStatisticsData: () => {},
};

// 常量定义
const FIVE_MINUTES = 5 * 60 * 1000;

// 创建 Context，使用默认值
const Context = createContext<StatisticsContextType>(defaultContextValue);

// Provider 组件
export const StatisticsDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [statisticsData, setStatisticsData] = useState<StatisticsDateType>(statistics_init);
    const [timestamp, setTimestamp] = useState<number>(0);

    // 检查数据是否过期
    const checkDataExpired = (): boolean => {
        const result = Date.now() - timestamp ;
        console.log('Expired time:', result);
        return result > FIVE_MINUTES;
    };

    // 更新单个字段
    const updateStatisticsData = useCallback((field: keyof StatisticsDateType, value: number) => {
        setStatisticsData(prevState => ({
            ...prevState,
            [field]: value
        }));
        setTimestamp(Date.now());
    }, []);

    // 更新多个字段
    const updateAllStatisticsData = useCallback((data: Partial<StatisticsDateType>) => {
        setStatisticsData(prevState => ({
            ...prevState,
            ...data
        }));
        setTimestamp(Date.now());
        console.log('updateAllStatisticsData')

    }, []);

    // 清除数据
    const clearStatisticsData = useCallback(() => {
        setStatisticsData(statistics_init);
        setTimestamp(0);
    }, []);

    return (
        <Context.Provider value={{
            statisticsData,
            timestamp,
            updateStatisticsData,
            updateAllStatisticsData,
            checkDataExpired,
            clearStatisticsData
        }}>
            {children}
        </Context.Provider>
    );
};

// 自定义 Hook - 现在可以直接使用，不需要空值检查
export const useStatisticsDataContext = () => useContext(Context);

// 使用示例：
/*
const YourComponent = () => {
    const {
        statisticsData,
        timestamp,
        updateStatisticsData,
        updateAllStatisticsData,
        checkDataExpired,
        clearStatisticsData
    } = useStatisticsDataContext();  // 不再需要 || {}

    useEffect(() => {
        // 定期检查数据是否过期
        const checkData = () => {
            if (checkDataExpired()) {  // 不再需要可选链
                clearStatisticsData();
            }
        };

        const timer = setInterval(checkData, 60000);
        return () => clearInterval(timer);
    }, [checkDataExpired, clearStatisticsData]);

    // 更新单个字段
    const handleUpdateField = () => {
        updateStatisticsData('total', 100);  // 不再需要可选链
    };

    // 更新多个字段
    const handleUpdateMultiple = () => {
        updateAllStatisticsData({  // 不再需要可选链
            total: 100,
            onSale: 50,
            storing: 30
        });
    };

    // 检查数据是否过期
    const isExpired = checkDataExpired();  // 不再需要可选链

    // 清除所有数据
    const handleClear = () => {
        clearStatisticsData();  // 不再需要可选链
    };

    return (
        <div>
            <p>Total: {statisticsData.total}</p>
            <p>Last Update: {new Date(timestamp).toLocaleString()}</p>
            <p>Data Status: {isExpired ? 'Expired' : 'Valid'}</p>
        </div>
    );
};
*/


