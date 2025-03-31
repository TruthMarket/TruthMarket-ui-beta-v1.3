// import {
//     useState,
//     useEffect,
// } from 'react';
import React from 'react';
import styles from './styles.module.scss';

interface Props {
    status:string;
}

const StatusTitle: React.FC<Props> = ({ status }) => {
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

    return <p className={`${styles.modeBar} ${getStatusColorClass(status)}`}>{status}</p>
}

export default StatusTitle;