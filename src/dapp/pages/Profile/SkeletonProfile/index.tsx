import React from 'react';
import { Skeleton } from 'antd';
import styles from './styles.module.scss';

const SkeletonProfile: React.FC = () => {
    return (
        <div className={styles.show}>
            {/* 图片区域 */}
            <div className={styles.image}>
                <Skeleton.Avatar
                    active
                    style={{
                        width: '350px',
                        height: '180px',
                        borderRadius: '10px'
                    }}
                />
            </div>

            {/* 内容区域 */}
            <div className={styles.content}>
                {/* 左侧信息区域 */}
                <div className={styles.infoOne}>
                    {/* 标题 */}
                    <Skeleton
                        active
                        paragraph={{ rows: 1, width: '80%' }}
                        title={false}
                    />
                    {/* 介绍 */}
                    <Skeleton
                        active
                        paragraph={{ rows: 2, width: ['90%', '60%'] }}
                        title={false}
                    />
                    {/* 其他信息 */}
                    <div className={styles.other}>
                        <Skeleton.Button active size="small" style={{ width: '60px' }} />
                        <Skeleton.Button active size="small" style={{ width: '80px' }} />
                        <Skeleton.Button active size="small" style={{ width: '120px' }} />
                        <Skeleton.Button active size="small" style={{ width: '100px' }} />
                    </div>
                </div>

                {/* 中间价格和按钮区域 */}
                <div className={styles.infoTwo}>
                    <Skeleton.Button active size="small" style={{ width: '80px' }} />
                    <Skeleton.Button active size="small" style={{ width: '120px' }} />
                    <Skeleton.Button active size="default" style={{ width: '100px', height: '35px' }} />
                </div>

                {/* 右侧复选框区域 */}
                <div className={styles.infoThree}>
                    <Skeleton.Button active size="small" style={{ width: '24px', height: '24px' }} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonProfile;