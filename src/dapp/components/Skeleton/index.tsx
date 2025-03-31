import React from 'react';
import { Skeleton } from 'antd';
import styles from './styles.module.scss';

const SkeletonApp: React.FC = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.image}>
                <Skeleton.Avatar
                    active 
                    style={{ 
                        width: '100%', 
                        height: '300px' 
                    }} 
                />
            </div>
            
            <div className={styles.content}>
                {/* 标题 */}
                <Skeleton 
                    active 
                    paragraph={{ rows: 1 }} 
                    title={false}
                />
                
                {/* 国家和时间信息 */}
                <div className={styles.infoOne}>
                    <Skeleton.Button 
                        active 
                        size="small" 
                        style={{ width: '120px' }} 
                    />
                    <Skeleton.Button 
                        active 
                        size="small" 
                        style={{ width: '100px' }} 
                    />
                </div>
                
                <div className={styles.horizontalLine} />
                
                {/* ID和状态信息 */}
                <div className={styles.infoTwo}>
                    <Skeleton.Button 
                        active 
                        size="small" 
                        style={{ width: '60px' }} 
                    />
                    <Skeleton.Button 
                        active 
                        size="small" 
                        style={{ width: '80px' }} 
                    />
                </div>
            </div>
        </div>
    );
};

export default SkeletonApp;