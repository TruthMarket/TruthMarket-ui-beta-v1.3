import React from 'react';
// import { nftFormState } from '../../useState/nftFormState';
import { useBoxInfoContext } from '../../useState/boxInfo';
import {
    Input,
    ConfigProvider,
    Space
} from 'antd';

const { TextArea } = Input;

const InputArea: React.FC = () => {
    const { boxInfoState,updateBoxInfo } = useBoxInfoContext() || {};

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateBoxInfo?.("description", e.target.value);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4912c7', // 全局主色
                    // 文本色
                    colorBgContainer: '#181827', // 容器背景色
                    colorBgBase: '#181827', // 基础背景色
                    // controlOutlineWidth : 0, // 控件边框宽度
                    colorTextBase: '#ffffff',
                    lineWidth: 0.1, // 线宽
                },
                components: {
                    Input: {
                        activeBg: '#12121f',
                        hoverBg: '#12121f',
                        // activeBorderColor: '#ffffff', 
                    },
                },
            }}
        >
            <Space  >
                <TextArea
                    showCount
                    maxLength={1000}
                    onChange={onChange}
                    placeholder="disable resize"
                    style={{ height: 300, width: 1000, resize: 'none' }}
                    value={boxInfoState?.description||""}
                />
            </Space>

        </ConfigProvider>

    )
};

export default InputArea;