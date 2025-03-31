
// import React from 'react';
import styles from '../styles.module.scss';

// import { NftDetailType } from '../../../type/contractDate';
import { useState, useEffect } from 'react';
import Button from '../Button';

import {
    // Config_Exchange,
    // Config_ConfidentialityFee,
    Config_TruthBox,
} from '../../../constants/abiAddress_v1_3';
import { useNftDetailContext } from '../useState/nftDetail';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
import { useUpdateNft_array } from '../../../hooks/useUpdateNft_array';
// interface Props {
//     tokenId: number,

// }

type ActiveButton = 'AddBlackList' | 'Unblacklist' | null;

const AdminFunction = () => {
    const { nftDetail, nftDetail_two } = useNftDetailContext() || {};
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);
    const { updateNft_array } = useUpdateNft_array();

    if (!nftDetail || !nftDetail_two) {
        return <div>loading...</div>;
    }

    useEffect(() => {
        if (isConfirmed) {
            setActiveButton(null);
            updateNft_array([nftDetail.tokenId])
        } else if (error || isPending) {
            setActiveButton(null);
        }
    }, [error, isPending, isConfirmed]);

    const handleUnBlackList = async () => {
        setActiveButton('Unblacklist');
        await write({
            contract: Config_TruthBox,
            functionName: 'removeBlackTokenId',
            args: [nftDetail.tokenId],
        });
    }

    const handleAddBlackList = async () => {
        setActiveButton('AddBlackList');
        await write({
            contract: Config_TruthBox,
            functionName: 'addBlackTokenId',
            args: [nftDetail.tokenId],
        });
    }

    return (
        <>
            <div className={styles.horizontalLine}></div>
            <div className={styles.buttonBar}>
                <span className={styles.buttonOne}>
                    <Button
                        text='AddBlackList'
                        useFor='one'
                        onClick={handleAddBlackList}
                        isLoading={activeButton === 'AddBlackList'}
                        disabled={activeButton !== null && activeButton !== 'AddBlackList' || nftDetail_two.isBlackTokenId === true}
                    />
                    <Button
                        text='Unblacklist'
                        useFor='one'
                        onClick={handleUnBlackList}
                        isLoading={activeButton === 'Unblacklist'}
                        disabled={activeButton !== null && activeButton !== 'Unblacklist'  || nftDetail_two.isBlackTokenId === false}
                    />
                </span>
            </div>
        </>
    );
}

export default AdminFunction;
