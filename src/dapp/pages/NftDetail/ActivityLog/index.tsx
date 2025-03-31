import styles from '../styles.module.scss';

interface Props {
    tokenId: number;
}

const ActivityLog: React.FC<Props> = (tokenId) => {
    console.log('tokenId:',tokenId);
    return (
        <div className={styles.third}>
            <p>Recode</p>
            <div className={styles.horizontalLine}></div>
            <span className={styles.tabBar}>
                <p>index</p>
                <p>address</p>
                <p>2024/</p>
                <p>5600</p>
                <div className={styles.horizontalLine}></div>
            </span>

        </div>
    );
}

export default ActivityLog;