import React from 'react';
import styles from '../styles.module.scss';
import { 
    // ConfigProvider, 
    Checkbox, 
    Space 
} from 'antd';
import { CheckboxProps } from 'antd';

interface Props {
    disabled: boolean;
    onChange?: CheckboxProps['onChange'];
    checked: boolean;
}

const CardCheckbox: React.FC<Props> = ({ disabled, onChange, checked }) => {
    return (
        <div className={styles.infoThree}>
            {/* <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#4912c7',
                        colorBgContainer: '#585877',
                        colorTextBase: '#ffffff',
                        lineWidth: 0,
                    },
                }}
            >
                
            </ConfigProvider> */}
            <Space>
                    <Checkbox onChange={onChange} disabled={disabled} checked={checked}/>
                </Space>
        </div>
    );
}

export default CardCheckbox;
