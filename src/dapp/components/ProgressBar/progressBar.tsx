import React from 'react';
import { 
    Flex, 
    Progress, 
    // ConfigProvider 
} from 'antd';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {

    return (
        // <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
        //     <div
        //         style={{
        //             width: `${progress}%`,
        //             backgroundColor: '#4caf50',
        //             height: '20px',
        //             borderRadius: '5px',
        //             transition: 'width 0.3s ease-in-out',
        //         }}
        //     >
        //         <span style={{ padding: '0 5px', color: 'white' }}>{progress}%</span>
        //     </div>
        // </div>
        // <ConfigProvider
        //     theme={{
        //         token: {
        //             colorPrimary: '#4912c7', // 全局主色
        //             // 文本色
        //             colorBgContainer: '#181827', // 容器背景色
        //             colorBgBase: '#181827', // 基础背景色
        //             // controlOutlineWidth : 0, // 控件边框宽度
        //             colorTextBase: '#ffffff',
        //             lineWidth: 0.1, // 线宽
        //         },
        //         components: {
        //             Progress: {

        //             },
        //         },
        //     }}
        // >
        <Flex vertical gap="small" style={{ width: 700 }}>
            <Progress strokeColor="#faad14" percent={progress} size={[700, 25]} />
        </Flex>
        // </ConfigProvider>
    );
};

export default ProgressBar;
