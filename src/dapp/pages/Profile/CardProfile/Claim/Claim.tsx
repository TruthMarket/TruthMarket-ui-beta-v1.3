import React,{
    // useState,
} from 'react';
import styles from '../styles.module.scss';
import { feeToken_State } from '../../../../useState/state_feeToken';
// import type { CheckboxProps } from 'antd';
// import { NftDetailType, } from '../../../../type/contractDate';

interface ArgsType {
    disabled:boolean;
    type:string;
    amount:number;
}

interface Props {
    // data: NftDetailType;
    args:ArgsType;
    disabled:boolean;
    // type:string;
    onClick?: () => void;
}

// const Show: React.FC<ShowProps> = ({ text, price, currency }) => {
const CardClaim: React.FC<Props> = ({ args, disabled, onClick }) => {
    

    return (
            <div className={styles.infoTwo}>
                <p className={styles.withdrawType}>{args.type}</p>
                <span className={styles.priceToken}>
                    <p className={styles.price}>{args.amount/(10**feeToken_State.decimals)}</p>
                    <p className={styles.tokenSymbol}>{feeToken_State.symbol}</p>
                </span>
                <button 
                    className={styles.claimButton}
                    onClick={onClick}
                    disabled={disabled}
                >
                    Claim
                </button>
            </div>
    );
}

export default CardClaim;