import React, { useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import { useUpdateNft_array } from '../../../hooks/useUpdateNft_array';
import CountdownTimer from '../CountdownTimer';
import { useTokenAllowance } from '../hooks/useAllowance';
import Button from '../Button';
import { useNftDetailContext } from '../useState/nftDetail';
import { useRoleContext } from '../useState/roleContext/RoleContext';
import { feeToken_State } from '../../../useState/state_feeToken';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
import {
    Config_ConfidentialityFee,
    // Config_BoxStatus,
    Config_FundManager,
    Config_feeToken
} from '../../../constants/abiAddress_v1_3';
// import { inRefundTime, } from "../../../useReadWrite/exchange/readExchange";
// import { refundPermission } from "../../../useReadWrite/fundManager/readFund";
import ModalPublic from '../Modal/modalPublic';
import ModalViewData from '../Modal/modalViewData';
import { useButtonDisabled } from '../hooks/useButtonDisabled';
import StatusStep from '../components/StatusStep/statusStep';

interface Props {
    tokenId: number,
}
type ActiveButton = 'Public' | 'PayConfiFee' | 'ViewData' | null;

// 
const Completed: React.FC<Props> = ({ tokenId }) => {

    const { nftDetail } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    const { updateNft_array } = useUpdateNft_array();
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);
    const [buttonText, setButtonText] = useState<string>('PayConfiFee');
    const [currentText, setCurrentText] = useState<string>('');
    const [ModalOpen, setModalOpen] = useState<ActiveButton>(null);

    // const { inRefundTime: inRefund_time } = inRefundTime(tokenId);
    // const { refundPermission: refund_Permission } = refundPermission(tokenId);
    const { 
        publicCompletedDisabled, 
        secretDisabled, 
    } = useButtonDisabled(tokenId);

    if (!nftDetail) {
        return <div>loading...</div>
    }

    const isAllowance = useTokenAllowance(nftDetail.price);

    useEffect(() => {
        if (isAllowance) {
            setButtonText('PayConfiFee');
        } else {
            setButtonText('Approve');
        }
    }, [isAllowance])

    useEffect(() => {
        if (isConfirmed) {
            setActiveButton(null);
            if (currentText === 'PayConfiFee') {
                setButtonText('Success');
                updateNft_array([tokenId])
            } else if (currentText === 'Approve') {
                setButtonText('PayConfiFee');
                setCurrentText('PayConfiFee');
            }

        } else if (isPending) {
            // setButtonText('wait...')
        } else {
            // 恢复到操作前的状态
            setActiveButton(null);
            if (currentText === 'PayConfiFee') {
                setButtonText('PayConfiFee');
            } else if (currentText === 'Approve') {
                setButtonText('Approve');
            }
        }
    }, [error, isPending, isConfirmed])

    const closeModal = () => {
        setModalOpen(null);
        setActiveButton(null);
    };

    const openViewDataModal = async () => {
        setActiveButton('ViewData');

        setModalOpen('ViewData')
    }

    const handleSecret = async () => {
        setActiveButton('PayConfiFee');

        if (buttonText === 'PayConfiFee') {
            setCurrentText('PayConfiFee');
            await write({
                contract: Config_ConfidentialityFee,
                functionName: 'PayConfiFee',
                args: [tokenId],
            });
        } else if (buttonText === 'Approve') {
            setCurrentText('Approve');
            await write({
                contract: Config_feeToken,
                functionName: 'approve',
                args: [Config_FundManager.address, 99999999999999],
            });
        }
    }

    const handlePublic = async () => {
        setActiveButton('Public');
        setModalOpen('Public')

    }

    return (

        <>
            <StatusStep status='Completed' />
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
                        text='Public'
                        useFor='one'
                        onClick={handlePublic}
                        isLoading={activeButton === 'Public'}
                        disabled={publicCompletedDisabled(activeButton)}
                    />
                    <Button
                        text={buttonText}
                        useFor='one'
                        onClick={handleSecret}
                        isLoading={activeButton === 'PayConfiFee'}
                        disabled={secretDisabled(activeButton) ?? true}
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
                        text='Refuse'
                        useFor='two'
                        onClick={openViewDataModal}
                        isLoading={activeButton === null}
                        disabled={true}
                    />
                </span>

            </div>
            {(userRole === 'buyer') && <p className='tips'>Each time the confidentiality period is extended, an additional confidentiality fee must be paid.</p>}
            {(ModalOpen === 'Public') && <ModalPublic tokenId={tokenId} onClose={closeModal} />}
            {(ModalOpen === 'ViewData') && <ModalViewData tokenId={tokenId} onClose={closeModal} />}

        </>

    );
}

export default Completed;
