import React from 'react';
import type { PaginationProps } from 'antd';
import {
    Pagination,
    // ConfigProvider, 
    Space
} from 'antd';

interface PageSelectorProps {
    currentPage: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number, pageSize: number) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({ currentPage, pageSize, total, onPageChange }) => {
    const onChange: PaginationProps['onChange'] = (page, size) => {
        onPageChange(page, size);
    };

    return (
        <Space>
            <Pagination
                showQuickJumper
                showSizeChanger
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={onChange}
                pageSizeOptions={['8', '16', '24', '32']}
            />
        </Space>
    );
};

export default PageSelector;
