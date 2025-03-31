

import React from 'react';
import { Flex, Spin, ConfigProvider } from 'antd';
import styles from './styles.module.scss';
// import '../../root.css';

const Loading: React.FC = () => {
    return (
        <div className={styles.content}>

            <div className={styles.loading}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#532ce2',
                            // colorBgContainer: 'var(--color-background)', 
                            // colorBgBase: 'var(--color-background)', 
                            // colorTextBase: '#ffffff', 
                            // lineWidth: 0, 
                        },
                        components: {
                            Upload: {
                            },
                        },
                    }}
                >
                    <Flex align="center" gap="middle">
                        <Spin size="large" />
                    </Flex>
                </ConfigProvider>

                <p className={styles.title}>Loading...</p>
            </div>
        </div>
    );
}

export default Loading;