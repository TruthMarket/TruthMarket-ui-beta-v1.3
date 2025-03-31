import React from 'react';
import styles from './styles.module.scss';
import TextLength from '../TextLength';
import { NftDetailType, boxStatus } from '../../type/contractDate';
import { feeToken_State } from '../../useState/state_feeToken';

interface ShowProps {
    data: NftDetailType;
    onClick?: () => void;
}

const NftCard: React.FC<ShowProps> = ({ data, onClick }) => {

    // const [price,setPrice] = useState<number>({

    // })


    const getStatusColorClass = (status: string) => {
        switch (status) {
            case 'Storing':
                return styles.Storing;
            case 'Selling':
                return styles.OnSale;
            case 'Auctioning':
                return styles.OnSale;
            case 'Refunding':
                return styles.Refunding;
            case 'Delivering':
                return styles.Delivering;
            case 'Completed':
                return styles.Completed;
            case 'Published':
                return styles.Published;
            default:
                return styles.Storing;
        }
    }

    return (
        <div className={styles.show} onClick={onClick}>
            <div className={styles.image}>
                <img src={data.image} alt='img' />
            </div>

            <div className={styles.content}>
                <span className={styles.title}>
                    <TextLength text={data.title} length={80} />
                </span>
                <div className={styles.infoOne}>
                    <span className={styles.country}>
                        <p>{data.country}</p>
                        <p>{data.state}</p>
                    </span>
                    <p className={styles.time}>
                        {data.eventDate}
                    </p>
                </div>
                <div className={styles.horizontalLine}></div>
                <div className={styles.infoTwo}>
                    <p className={styles.id}>
                        {data.tokenId}
                    </p>
                    <span className={styles.statusPrice}>
                        {(data.status === boxStatus[1] || data.status === boxStatus[2]) ? (
                            <div className={`${styles.status} ${getStatusColorClass(data.status)}`}>
                                <p className={styles.price}>{data.price/(10**feeToken_State.decimals)}</p>
                                <p className={styles.tokenSymbol}>{feeToken_State.symbol}</p>
                            </div>
                        ) : (
                            <p className={`${styles.status} ${getStatusColorClass(data.status)}`}>
                                {data.status}
                            </p>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NftCard;
