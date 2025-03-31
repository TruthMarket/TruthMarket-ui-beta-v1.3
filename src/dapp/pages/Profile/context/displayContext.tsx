import React, {
    useState,
    ReactNode,
    useContext
} from "react";

type status =
    | 'init'   // 初始状态
    | 'loading_events'    // 正在加载事件数据
    | 'events_loaded'     // 事件数据加载完成
    | 'tabCounts_loading'    // 数据列表加载中
    | 'tabCounts_loaded'    // 数据列表加载完毕
    | 'tabList_confirmed'        // tabList设置完毕
    | 'loading_nfts'      // 正在加载 NFT 列表
    | 'complete'          // 所有数据加载完成
    | 'error';            // 发生错误

// 创建新的 Context
interface PageContextType {
    // eventLoaded: boolean,
    // setEventLoaded: (Load: boolean) => void;

    // isListLoaded: boolean,
    // setIsListLoaded: (Load: boolean) => void;

    // isUpdate: boolean,
    // setIsUpdate: (Load: boolean) => void;

    loadingMessage: string,
    setLoadingMessage: (message: string) => void;

    currentPage: number;
    pageSize: number;
    totalCounts: number,
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setTotalCounts: (totals: number) => void;
    initialPageData : ()=>void;

    currentNftList: number[];
    addCurrentNftList: (tokenId: number) => void;

    stepStatus: status,
    setStepStatus: (value: status) => void;
}

const Context = React.createContext<PageContextType | null>(null);

// 创建 Provider
export const DisplayProvider = ({ children }: { children: ReactNode }) => {
    // const [isUpdate, setIsUpdate] = useState<boolean>(true)

    // const [eventLoaded, setEventLoaded] = useState<boolean>(false)
    // const [isListLoaded, setIsListLoaded] = useState<boolean>(false)
    const [loadingMessage, setLoadingMessage] = useState<string>('')

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalCounts, setTotalCounts] = useState(8);

    const initialPageData = () =>{
        setCurrentPage(1);
        setPageSize(8);
        // setTotalCounts(8);
    }

    const [currentNftList, setCurrentNftList] = useState<number[]>([]);

    const addCurrentNftList = (tokenId: number) => {
        setCurrentNftList(prevState => [
            ...prevState,  // 将原来的状态展开
            tokenId          // 添加新值
        ]);
    };

    const [stepStatus, setStepStatus] = useState<status>('init');


    return (
        <Context.Provider value={{
            // eventLoaded,
            // setEventLoaded,
            // isListLoaded,
            // setIsListLoaded,
            // isUpdate,
            // setIsUpdate,
            loadingMessage,
            setLoadingMessage,
            currentPage,
            pageSize,
            totalCounts,
            setCurrentPage,
            setPageSize,
            setTotalCounts,
            initialPageData,

            currentNftList,
            addCurrentNftList,

            stepStatus, 
            setStepStatus,
        }}>
            {children}
        </Context.Provider>
    );
};

export const useDisplayContext = () => useContext(Context);