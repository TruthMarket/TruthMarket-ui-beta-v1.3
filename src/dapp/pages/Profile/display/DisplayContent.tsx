// import {
    // useEffect, 
//     useState
// } from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.scss';
// import { useListContext } from '../context/tabContext';
import { useAccount } from 'wagmi';
// import { useTabContext } from '../context/tabContext';
// import { useTotalItems } from '../CardContent/useTotalItems';
import PageSelector from '../../../components/PageSelector';
import { NftList } from './NftList';
import { useDisplayContext } from '../context/displayContext';

// 主显示内容组件
const DisplayContent = () => {
    const { address } = useAccount();

    // const { currentTab } = useTabContext() || {};
    const { 
        stepStatus,
        totalCounts, 
        // isListLoaded, 
        currentPage, 
        setCurrentPage, 
        pageSize, 
        setPageSize 
    } = useDisplayContext() || {};

    // 添加一个函数来更新统计数据加载状态
    const handleListLoaded = () => {
        // setIsListLoaded(true);
        return;
    };

    // 处理分页变化
    const handlePageChange = (page: number, size: number) => {
        setCurrentPage?.(page);
        setPageSize?.(size);
    };

    // 如果没有连接钱包，返回空列表
    if (!address) {
        return null;
    }

    return (
        <>
            <NftList
                // key={`${currentPage}-${pageSize}-${address}-${currentTab}`}
                // currentPage={currentPage || 1}
                // pageSize={pageSize || 8}
                isLoaded={handleListLoaded}
            />
            <div className={styles.pageSelector}>
                {(stepStatus === 'tabList_confirmed') && (
                    <PageSelector
                        key={totalCounts}
                        currentPage={currentPage || 1}
                        pageSize={pageSize || 8}
                        total={totalCounts||8}
                        onPageChange={handlePageChange}
                    />
                )}

            </div>
        </>
    );
};

export default DisplayContent; 