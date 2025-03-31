import React, { useState } from 'react';
import { useNftFormContext } from '../../useState/nftForm';
import {
    Radio,
    // ConfigProvider, 
    Space
} from 'antd';
import type { RadioChangeEvent } from 'antd';


const RadioApp: React.FC = () => {
    const [value, setValue] = useState()
    const { updateNftForm } = useNftFormContext() || {};

    const onChange = (e: RadioChangeEvent) => {
        updateNftForm?.('radio', e.target.value);
        setValue(e.target.value);
    };
    return (
        <>
            <Space  >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={'Storing'}>Storing</Radio>
                    <Radio value={'Public'}>Public</Radio>
                </Radio.Group>
            </Space>
        </>
    );
}
export default RadioApp;