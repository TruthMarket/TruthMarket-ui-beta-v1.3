import React, { useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import { useUpdateNft_array } from '@dapp/hooks/useUpdateNft_array';
import CountdownTimer from '../CountdownTimer';
import Button from '../Button';
import { useNftDetailContext } from '../useState/nftDetail';
import { useRoleContext } from '../useState/roleContext/RoleContext';
import { feeToken_State } from '@dapp/useState/state_feeToken';
import {
    // Address_0,
    Config_feeToken,
    Config_FundManager,
    Config_Exchange,
} from '@dapp/constants/abiAddress_v1_3';
// import { useWalletContext } from '@dapp/context/useAccount/WalletContext';
import { useGetBuyerKey } from '../hooks/useGetBuyerKey';
import ModalDeliver from '../Modal/modalDeliver';
import ModalPublic from '../Modal/modalPublic';
import ModalViewData from '../Modal/modalViewData';
import { useButtonDisabled } from '../hooks/useButtonDisabled';
import ModalBuyerKey from '../Modal/modalBuyerKey';
import { useTokenAllowance } from '../hooks/useAllowance';
import { useWriteCustorm } from '@dapp/hooks/useWritCustorm';
import { statusAbled } from '../Modal/modalBuyerKey';
import StatusStep from '../components/StatusStep/statusStep';

interface Props {
    tokenId: number,
}

type ActiveButton = 'Admin' | 'Purchase' | 'Public' | 'Deliver' | 'ViewData' | null;

const Selling: React.FC<Props> = ({ tokenId }) => {
    // const { accountRole, address } = useWalletContext()||{}
    // const { permission } = usePermissionContext() || {}
    const { nftDetail, nftDetail_two } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const {updateNft_array}=useUpdateNft_array();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);

    const [buttonText, setButtonText] = useState<string>('Purchase');
    const [currentText, setCurrentText] = useState<string>('');

    const [ModalOpen, setModalOpen] = useState<string | null>(null);
    const [status, setStatus] = useState<statusAbled>('isPending');
    const { getBuyerKey, buyerInfo } = useGetBuyerKey();
    const { 
        purchaseDisabled, 
        deliverSellDisabled, 
        publicNobuyerDisabled
        // viewDataDisabled_minter 
    } = useButtonDisabled(tokenId);

    if (!nftDetail || !nftDetail_two) {
        return <div>loading...</div>
    }
    const isAllowance = useTokenAllowance(nftDetail.price);

    useEffect(() => {
        if (isAllowance) {
            setButtonText('Purchase');
        } else {
            setButtonText('Approve');
        }
    }, [isAllowance])

    useEffect(() => {
        if (isConfirmed) {
            setActiveButton(null);
            if (currentText === 'Purchase') {
                setButtonText('Success');
                setStatus('isConfirmed')
                updateNft_array([tokenId])
            } else if (currentText === 'Approve') {
                setButtonText('Purchase');
                setCurrentText('Purchase');
            }
            
        } else if (isPending) {
            setModalOpen('BuyerKey');
            setStatus('isPending')
            // setButtonText('wait...')
        } else if (error){
            // 恢复到操作前的状态
            setActiveButton(null);
            setStatus('error');
            if (currentText === 'Purchase') {
                setButtonText('Purchase');
            } else if (currentText === 'Approve') {
                setButtonText('Approve');
            }
        }
    }, [error, isPending, isConfirmed])

    const handleDeliver = async () => {
        setActiveButton('Deliver');
        if (userRole === 'minter' || userRole === 'admin') {
            setModalOpen('Deliver')
        } else {
            await write({
                contract: Config_Exchange,
                functionName: 'DeliverOverdue',
                args: [tokenId],
            });
        }
    };
    const closeModal = () => {
        setModalOpen(null);
        setActiveButton(null);
    };

    const openViewDataModal = async () => {
        setActiveButton('ViewData');
        setModalOpen('ViewData')
    }

    const handlePublic = async () => {
        setActiveButton('Public');
        setModalOpen('Public')
    }

    const handlePurchase = async () => {
        setActiveButton('Purchase');

        if (buttonText === 'Purchase') {
            setCurrentText('Purchase');
            const publicKey_buyer = await getBuyerKey(tokenId, 'buyer');
            if (!publicKey_buyer) {
                alert('Get PurchaseerKey failed!')
            }
            // setModalOpen('BuyerKey');
            await write({
                contract: Config_Exchange,
                functionName: 'Purchase',
                args: [tokenId, publicKey_buyer],
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

    // const handleAdmin = async () => {
    //     setActiveButton('Admin');
    // }

    return (

        <>
            <StatusStep status='Selling' />
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
                        text={buttonText}
                        useFor='one'
                        onClick={handlePurchase}
                        isLoading={activeButton === 'Purchase'}
                        disabled={purchaseDisabled(activeButton)}
                    />
                    <Button
                        text='Deliver'
                        useFor='one'
                        onClick={handleDeliver}
                        isLoading={activeButton === 'Deliver'}
                        disabled={deliverSellDisabled(activeButton)}
                    />
                </span>
                <span className={styles.buttonTwo}>
                    <Button
                        text='ViewData'
                        useFor='one'
                        onClick={openViewDataModal}
                        isLoading={activeButton === 'ViewData'}
                        disabled={false}
                    />
                    <Button
                        text='Public'
                        useFor='two'
                        onClick={handlePublic}
                        isLoading={activeButton === 'Public'}
                        disabled={publicNobuyerDisabled(activeButton)}
                    />
                </span>
            </div>
            {nftDetail_two.isBlackTokenId && <p className='attention'>
                    The NFT in blackList, can't do anything !
                </p>}
            <p>
                After the sale period ends, if no one has purchased, it can be made public! <br />
                If it is not made public, purchases can still be made.
            </p>
            {(ModalOpen === 'Deliver') && <ModalDeliver tokenId={tokenId} onClose={closeModal} />}
            {(ModalOpen === 'Public') && <ModalPublic tokenId={tokenId} onClose={closeModal} />}
            {(ModalOpen === 'ViewData') && <ModalViewData tokenId={tokenId} onClose={closeModal} />}

            {(ModalOpen === 'BuyerKey') &&
                <ModalBuyerKey
                    onClose={closeModal}
                    buyerInfo={buyerInfo}
                    status={status}
                />
            }
        </>

    );
}

export default Selling;
