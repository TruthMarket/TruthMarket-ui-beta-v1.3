import React from 'react';
import { ConfigProvider } from 'antd';

const defaultTheme = {
    token: {
        colorPrimary: '#4912c7',
        colorBgContainer: '#2b2d47',
        colorBgBase: '#2b2d47',
        // colorBgContainer: '#181827', // 容器背景色
        // colorBgBase: '#181827', // 基础背景色
        colorTextBase: '#ffffff',
        lineWidth: 0.1,

    },
    components: {
        DatePicker: {
            cellHoverBg: '#8A2BE2',
            hoverBg: '#373952',
        },
        Upload: {
            // colorBg: '#181830', // 设置上传区域的背景色
            colorFillAlter: '#111221', // 设置上传列表项的背景色
            // colorBorder: '#4912c7', // 设置边框颜色
            // colorPrimary: '#4912c7', // 设置主要颜色（如图标颜色）
            // colorTextDisabled: '#ffffff', // 设置禁用状态的文字颜色
        },
        Input: {
            activeBg: '#12121f',
            hoverBg: '#12121f',
            colorBg: '#181830', // 设置上传区域的背景色
            // activeBorderColor: '#ffffff', 
        },
        Pagination: {
            itemActiveBg: '#ffffff',
            itemBg: '#2b2d47',
        },
        Select: {
            optionSelectedBg: '#1b1b2e',
        },
    },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ConfigProvider theme={defaultTheme}>
            {children}
        </ConfigProvider>
    );
};