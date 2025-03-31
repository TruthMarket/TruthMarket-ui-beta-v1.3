import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode
} from "react";

// 定义步骤状态类型
export type StepStatusType = 
    | 'init'                    // 初始状态
    | 'statistics_loading'      // 统计数据加载中
    | 'statistics_loaded'    // 统计数据确认
    | 'nftList_loading'        // NFT列表加载中
    | 'nftList_loaded'      // NFT列表确认
    | 'complete'               // 全部完成
    | 'error';                 // 错误状态

// Context 类型定义
interface StepContextType {
    stepStatus: StepStatusType;
    setStepStatus: (status: StepStatusType) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    totalItems: number;
    setTotalItems: (total: number) => void;
    loadingMessage: string;
    setLoadingMessage: (message: string) => void;
    resetStepStatus: () => void;
    checkStep: (expectedStep: StepStatusType) => boolean;
}

// 创建默认值对象
const defaultContextValue: StepContextType = {
    stepStatus: 'init',
    setStepStatus: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    pageSize: 8,
    setPageSize: () => {},
    totalItems: 0,
    setTotalItems: () => {},
    loadingMessage: '',
    setLoadingMessage: () => {},
    resetStepStatus: () => {},
    checkStep: () => false,
};

// 创建 Context，使用默认值
const Context = createContext<StepContextType>(defaultContextValue);

// Provider 组件
export const StepStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stepStatus, setStepStatus] = useState<StepStatusType>('init');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(8);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loadingMessage, setLoadingMessage] = useState<string>('');

    // 重置所有状态
    const resetStepStatus = useCallback(() => {
        setStepStatus('init');
        setCurrentPage(1);
        setPageSize(8);
        setTotalItems(0);
        setLoadingMessage('loading');
    }, []);

    // 检查当前步骤是否匹配预期
    const checkStep = useCallback((expectedStep: StepStatusType): boolean => {
        return stepStatus === expectedStep;
    }, [stepStatus]);

    return (
        <Context.Provider value={{
            stepStatus,
            setStepStatus,
            currentPage,
            setCurrentPage,
            pageSize,
            setPageSize,
            totalItems,
            setTotalItems,
            loadingMessage,
            setLoadingMessage,
            resetStepStatus,
            checkStep
        }}>
            {children}
        </Context.Provider>
    );
};

// 自定义 Hook
export const useStepStatusContext = () => useContext(Context);

// 使用示例：
/*
const YourComponent = () => {
    const {
        stepStatus,
        setStepStatus,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalItems,
        setTotalItems,
        loadingMessage,
        setLoadingMessage,
        resetStepStatus,
        checkStep
    } = useStepStatusContext();

    useEffect(() => {
        const loadData = async () => {
            // 开始加载统计数据
            setStepStatus('statistics_loading');
            setLoadingMessage('Loading statistics...');
            
            try {
                // 加载统计数据
                await loadStatistics();
                setStepStatus('statistics_confirmed');

                // 开始加载 NFT 列表
                setStepStatus('nftList_loading');
                setLoadingMessage('Loading NFT list...');
                
                // 加载 NFT 列表
                await loadNFTList();
                setStepStatus('nftList_confirmed');

                // 完成所有加载
                setStepStatus('complete');
                setLoadingMessage('');
            } catch (error) {
                setStepStatus('error');
                setLoadingMessage('Error loading data');
            }
        };

        loadData();
    }, [currentPage, pageSize]);

    // 检查当前是否在加载统计数据
    const isLoadingStatistics = checkStep('statistics_loading');

    // 重置所有状态
    const handleReset = () => {
        resetStepStatus();
    };

    return (
        <div>
            <p>Current Step: {stepStatus}</p>
            <p>Loading Message: {loadingMessage}</p>
            <p>Page: {currentPage} of {Math.ceil(totalItems / pageSize)}</p>
        </div>
    );
};
*/
