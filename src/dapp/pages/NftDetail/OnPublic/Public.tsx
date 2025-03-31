

import React, { useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import { useRoleContext } from '../useState/roleContext/RoleContext';
import { useNftDetailContext } from '../useState/nftDetail';
import { DisplayUriPassword } from '../../../components/DisplayUriPassword';

import { timeToDate } from '../../../utils/time';
import { ipfsCidToUrl } from '../../../utils/ipfsCidToUrl';
import StatusStep from '../components/StatusStep/statusStep';

interface Props {
    tokenId: number,
}

// type ActiveButton = 'Invaild' | 'Burn' | 'CidPassw' | 'ViewData'|null;

const Public: React.FC<Props> = ({ tokenId }) => {
    const { nftDetail, updateNftDetail_two } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};

    const [date, setDate] = useState<string | null>(null);

    useEffect(() => {
        const fileCID = nftDetail?.fileCID;
        if (fileCID) {
            const fileURI = ipfsCidToUrl(fileCID)
            updateNftDetail_two?.('fileUri', fileURI)
        }
    }, [nftDetail]);

    useEffect(() => {
        if (nftDetail?.deadline) {
            const result = timeToDate(nftDetail?.deadline)
            setDate(result)
        }
    }, [nftDetail?.deadline]);

    console.log('tokenId:', tokenId);


    return (

        <>
            <StatusStep status='Published' />
            <div className={styles.horizontalLine}></div>
            <div className={styles.priceBar}>
                <p>Public Date: {date}</p>
            </div>
            <div className={styles.horizontalLine}></div>
            <p>
                You can use the link to download the file. If the password is empty,
                <br />
                it means that a password is not required
            </p>

            <div className={styles.horizontalLine}></div>

            <DisplayUriPassword
                fileCid={nftDetail?.fileCID || ''}
                password={nftDetail?.password || ''}
            />
            <div className={styles.horizontalLine}></div>
            <div className={styles.buttonBar}>
                <div className={styles.userRole}>
                    <h4>You are: {userRole}</h4>
                </div>
            </div>
        </>


    );
}

export default Public;