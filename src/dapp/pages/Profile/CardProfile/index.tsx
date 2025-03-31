import React, { 
    useEffect, 
    useState, 
    // useContext,
} from 'react';
import styles from './styles.module.scss';
import TextLength from '../../../components/TextLength';
import { NftDetailType } from '../../../type/contractDate';
import CardClaim from './Claim/Claim';
import CardCheckbox from './Checkbox/Checkbox';
import { CheckboxProps } from 'antd';
import { useTabContext } from '../context/tabContext';
import { useArgsData, TypeWithdraw } from './hooks/useArgsData';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
import { Config_FundManager } from '../../../constants/abiAddress_v1_3';
// import { ContractContext } from '../../../context';
import { useWithdrawContext } from '../context/withdrawContext';

interface ShowProps {
    data: NftDetailType;
    onClick?: () => void;
}

const CardProfile: React.FC<ShowProps> = ({ data, onClick }) => {
    const argsData = useArgsData();
    // const sellerFeeR = sellerFeeRate();
    const [disabled, setDisabled] = useState<boolean>(false)
    const [cardArgs,setCardArgs] = useState<TypeWithdraw>({
        disabled:true,
        type:'Rewards',
        amount:0,
    })

    // useEffect(() => {
    //     if (sellerFeeR) {
    //         console.log('sellerFeeRate首页:',sellerFeeR)
    //     } 
    // }, [sellerFeeR]);

    useEffect(() => {
        const fetch = async()=>{
            const result = await argsData(data)
            setCardArgs(result)
        }
        fetch()
    }, []);
    
    const {write,isPending,isConfirmed,error}=useWriteCustorm();
    const { currentTab } = useTabContext() || {};
    const { withdrawList, setWithdrawList, withdrawType, setWithdrawType } = useWithdrawContext() || {};

    const onChange: CheckboxProps['onChange'] = (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        if (withdrawType === '') {
            setWithdrawType?.(cardArgs.type)
        }
        if (e.target.checked) {
            setWithdrawList?.([...(withdrawList || []), data.tokenId]);
        } else {
            setWithdrawList?.((withdrawList || []).filter(id => id !== data.tokenId));
        }
        
    };

    useEffect(() => {
        if (isConfirmed) {
            setDisabled(false);
            setWithdrawType?.('')
        } else if (isPending) {
            setDisabled(true);
        } else if (error) {
            setDisabled(false);
        }
    }, [isPending,isConfirmed,error]);

    // useEffect(() => {
    //     if (cardArgs) {
    //         if (cardArgs.amount === 0) {
    //             setDisabled(true)
    //         } else {
    //             setDisabled(false)
    //         }
    //     }
    // }, [cardArgs])

    // useEffect(() => {
    //     if (withdrawType) {
    //         if (withdrawType === cardArgs.type) {
    //             setDisabled(false)
    //         } else {
    //             setDisabled(true)
    //         }
    //     }
    // }, [withdrawType])

    const handleClaim = async () => {
        if (withdrawList?.length === 0) {
            return;
        }
        // console.log('withdrawList:', withdrawList)
        // 判断currentTab 和withdrawType的值
        if (currentTab === 'minter') {
            await write({
                contract: Config_FundManager,
                functionName: 'withdrawMinter',
                args: [withdrawList],
            });
            // console.log('info:', info)
        } else if (currentTab === 'completer') {
            await write({
                contract: Config_FundManager,
                functionName: 'withdrawOtherRewards',
                args: [withdrawList],
            });

        } else if (currentTab === 'buyer' || currentTab === 'bidder') {
            if (withdrawType === 'Refund') {
                await write({
                    contract: Config_FundManager,
                    functionName: 'withdrawRefund',
                    args: [withdrawList],
                });

            } else if (withdrawType === 'Rewards') {
                await write({
                    contract: Config_FundManager,
                    functionName: 'withdrawOtherRewards',
                    args: [withdrawList],
                });

            } else if (withdrawType === 'Order') {
                await write({
                    contract: Config_FundManager,
                    functionName: 'withdrawOrder',
                    args: [withdrawList],
                });

            }
        }
    };

    const handleContentClick = (e: React.MouseEvent) => {
        // 只有当点击的不是 CardClaim 或 CardCheckbox 时才触发 onClick
        if (
            !e.currentTarget.querySelector(`.${styles.infoTwo}`)?.contains(e.target as Node) &&
            !e.currentTarget.querySelector(`.${styles.infoThree}`)?.contains(e.target as Node)
        ) {
            onClick?.();
        }
    };

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
        <div className={styles.show}>
            <div className={styles.image} onClick={onClick}>
                <img src={data.image} alt='img' />
            </div>
            <div className={styles.content} onClick={handleContentClick}>
                <div className={styles.infoOne}>
                    <span className={styles.title}>
                        <TextLength text={data.title} length={100} />
                    </span>
                    <span className={styles.introduce}>
                        <TextLength text={data.description} length={250} />
                    </span>
                    <span className={styles.other}>
                        <p className={styles.id}>
                            {data.tokenId}
                        </p>
                        <p className={`${styles.status} ${getStatusColorClass(data.status)}`}>
                            {data.status}
                        </p>
                        <span className={styles.country}>
                            <p>{data.country}</p>
                            <p>{data.state}</p>
                        </span>
                        <p className={styles.time}>
                            {data.eventDate}
                        </p>
                    </span>
                </div>
                <CardClaim
                    // data={data}
                    onClick={handleClaim}
                    disabled={disabled}
                    args={cardArgs}
                />
                <CardCheckbox
                    onChange={onChange}
                    disabled={disabled}
                    checked={withdrawList?.includes(data.tokenId) || false}
                />
            </div>
        </div>
    );
}

export default CardProfile;
