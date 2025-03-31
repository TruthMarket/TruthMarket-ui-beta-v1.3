import React, { useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import { feeToken_State } from '../../../useState/state_feeToken';
import CountdownTimer from '../CountdownTimer';
import { useUpdateNft_array } from '../../../hooks/useUpdateNft_array';
import Button from '../Button';
import { useNftDetailContext } from '../useState/nftDetail';
import { useRoleContext } from '../useState/roleContext/RoleContext';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
import {
    Config_Exchange,
} from '../../../constants/abiAddress_v1_3';
import { useButtonDisabled } from '../hooks/useButtonDisabled';
import ModalViewData from '../Modal/modalViewData';
import ModalRefund from '../Modal/modalRefund';
import StatusStep from '../components/StatusStep/statusStep';

interface Props {
    tokenId: number,
}
type ActiveButton = 'Complete' | 'Refund' | 'ViewData' | null;

// 

const Delivering: React.FC<Props> = ({ tokenId }) => {

    // const { accountRole, address } = useWalletContext() || {}
    // const { permission } = usePermissionContext() || {}
    const { nftDetail,nftDetail_two } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const {updateNft_array}=useUpdateNft_array();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);

    const [ModalOpen, setModalOpen] = useState<ActiveButton>(null);
    if (!nftDetail) {
        return <div>loading...</div>
    }

    useEffect(() => {
        if (isConfirmed) {
            setActiveButton(null)
            updateNft_array([tokenId])
        } else if (error) {
            setActiveButton(null);
        }
    }, [error, isPending, isConfirmed]);

    const handleRefund = async () => {
        setActiveButton('Refund');
        setModalOpen('Refund')
    }

    const handleComplete = async () => {
        setActiveButton('Complete');
        await write({
            contract: Config_Exchange,
            functionName: 'Complete',
            args: [tokenId],
        });
    }

    const { 
        completeDisabled, 
        requestRefundDisabled, 
        // viewDataDisabled_dilivered 
    } = useButtonDisabled(tokenId);

    const openViewDataModal = async () => {
        setActiveButton('ViewData');
        setModalOpen('ViewData')
    }

    const closeModal = () => {
        setModalOpen(null);
        setActiveButton(null);
    };

    return (

        <>
            <StatusStep status='Delivering' />
            <div className={styles.horizontalLine}></div>
            <div className={styles.priceBar}>
                <p>Price:</p>
                <p className={styles.priceNumber}>{nftDetail.price}</p>
                <p>{feeToken_State.symbol}</p>
            </div>

            <CountdownTimer time={nftDetail.deadline} />
            <div className={styles.horizontalLine}></div>
            <div className={styles.buttonBar}>
                <div className={styles.userRole}>
                    <h4>You are: {userRole}</h4>
                </div>
                <span className={styles.buttonOne}>
                    <Button
                        text='Complete'
                        useFor='one'
                        onClick={handleComplete}
                        isLoading={activeButton === 'Complete'}
                        disabled={completeDisabled(activeButton)}
                    />
                    <Button
                        text='Refund'
                        useFor='one'
                        onClick={handleRefund}
                        isLoading={activeButton === 'Refund'}
                        disabled={requestRefundDisabled(activeButton)}
                    />
                </span>
                <span className={styles.buttonTwo}>
                    <Button
                        text='ViewData'
                        useFor='two'
                        onClick={openViewDataModal}
                        isLoading={activeButton === 'ViewData'}
                        disabled={false}
                    />
                    <Button
                        text='Wait'
                        useFor='two'
                        onClick={openViewDataModal}
                        isLoading={activeButton === null}
                        disabled={true}
                    />
                </span>
            </div>
            {(userRole !== 'buyer' && nftDetail_two?.inRefundDeadline === false) && <p className='tips'>
                    Are you sure you want to become the completer of this NFT? <br />
                    If sold successfully, you can earn a 3% profit from the sale price.
                </p>
            }
            {(ModalOpen === 'ViewData') && <ModalViewData tokenId={tokenId} onClose={closeModal} />}
            {(ModalOpen === 'Refund') && <ModalRefund tokenId={tokenId} onClose={closeModal} />}

        </>

    );
}

export default Delivering;
