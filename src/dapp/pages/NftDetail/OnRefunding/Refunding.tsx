import React, { useState, useEffect} from 'react';
import styles from '../styles.module.scss';
import { feeToken_State } from '../../../useState/state_feeToken';
import CountdownTimer from '../CountdownTimer';
import Button from '../Button';
import { useNftDetailContext } from '../useState/nftDetail';
import { useRoleContext } from '../useState/roleContext/RoleContext';
import { useUpdateNft_array } from '../../../hooks/useUpdateNft_array';
import {
    Config_Exchange,
    // Config_BoxPublic,
} from '../../../constants/abiAddress_v1_3';
// import { ContractContext } from '../../../context';
import { DisplayUriPassword } from '../../../components/DisplayUriPassword';
// import { useWalletContext } from '../../../context/useAccount/WalletContext';
// import { getBuyerKey } from '../OnSelling/getBuyerKey';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
// import ModalAgree from '../Modal/modalAgree';
// import ModalRefuse from '../Modal/modalRefuse';
// import ModalViewData from '../Modal/modalViewData';
import { useButtonDisabled } from '../hooks/useButtonDisabled';
import { useDecryptRefunding } from '../DeEnCrypt/useDecryptRefunding';
import StatusStep from '../components/StatusStep/statusStep';

interface Props {
    tokenId: number,
}

type ActiveButton = 'Agree' | 'Cancel' | 'Refuse' | 'ViewData' | null;

const Refunding: React.FC<Props> = ({ tokenId }) => {
    // const { accountRole } = useWalletContext()||{}
    // const { permission } = usePermissionContext() || {}
    const { nftDetail, updateNftKey, nftDetail_two } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const {updateNft_array}=useUpdateNft_array();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);
    const decryptRefunding = useDecryptRefunding();

    // const [ModalOpen, setModalOpen] = useState<ActiveButton>(null);

    if (!nftDetail || !nftDetail_two) {
        return <div>loading...</div>
    }

    useEffect(() =>{
        const fatch = async ()=>{
            const data = await decryptRefunding(tokenId);
            if(data) {
                const {fileCid,password}=data;
                updateNftKey?.('fileCID',fileCid);
                updateNftKey?.('password',password);
            }
        }
        fatch()
    },[])

    useEffect(() => {
        if (isConfirmed ) {
            setActiveButton(null);
            updateNft_array([tokenId])
        } else if (error) {
            setActiveButton(null);
        }
        // } else if (isPending) {
        //     setActiveButton('Agree');
        // }
    }, [error, isPending, isConfirmed]);

    // const closeModal = () => {
    //     setModalOpen(null);
    //     setActiveButton(null);
    // };

    const handleAgree = async () => {
        setActiveButton('Agree');
        if (userRole === 'minter' || userRole === 'admin') {
            await write({
                contract: Config_Exchange,
                functionName: 'AgreeRefund',
                args: [tokenId], // 
            });
        } else {
            await write({
                contract: Config_Exchange,
                functionName: 'AgreeRefundOverdue',
                args: [tokenId], // 
            });
        }
    };

    const handleRefuse = async () => {
        setActiveButton('Refuse');
        await write({
            contract: Config_Exchange,
            functionName: 'RefuseRefund',
            args: [tokenId], // 
        });
    };
    const wait= async () => {
        return
    }

    const handleCancel = async () => {
        setActiveButton('Cancel');
        await write({
            contract: Config_Exchange,
            functionName: 'CancelRefund',
            args: [tokenId],
        });
    }

    const { 
        cancelRefundDisabled, 
        agreeRefundDisabled, 
        refuseRefundDisabled, 
        // viewDataDisabled_dilivered 
    } = useButtonDisabled(tokenId);

    return (

        <>
            <StatusStep status='Refunding'/>
            <div className={styles.horizontalLine}></div>
            <div className={styles.priceBar}>
                <p>Price:</p>
                <p className={styles.priceNumber}>{nftDetail.price}</p>
                <p>{feeToken_State.symbol}</p>
            </div>

            <CountdownTimer time={nftDetail.deadline} />
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
                
                <span className={styles.buttonOne}>
                    <Button
                        text='Agree'
                        useFor='two'
                        onClick={handleAgree}
                        isLoading={activeButton === 'Agree'}
                        disabled={agreeRefundDisabled(activeButton)}
                    />
                    <Button
                        text='Refuse'
                        useFor='two'
                        onClick={handleRefuse}
                        isLoading={activeButton === 'Refuse'}
                        disabled={refuseRefundDisabled(activeButton)}
                    />
                </span>
                <span className={styles.buttonTwo}>
                    <Button
                        text='Cancel'
                        useFor='one'
                        onClick={handleCancel}
                        isLoading={activeButton === 'Cancel'}
                        disabled={cancelRefundDisabled(activeButton)}
                    />
                    <Button
                        text='Wait'
                        useFor='one'
                        onClick={wait}
                        isLoading={true}
                        disabled={true}
                    />
                </span>
            </div>
            {nftDetail_two.isBlackTokenId && <p className='attention'>
                    The NFT in blackList, can't do anything !
                </p>}
            {/* {(ModalOpen === 'Refuse') && <ModalRefuse tokenId={tokenId} onClose={closeModal} />} */}
            {/* {(ModalOpen === 'Agree') && <ModalAgree tokenId={tokenId} onClose={closeModal} />} */}
            {/* {(ModalOpen === 'ViewData') && <ModalViewData tokenId={tokenId} onClose={closeModal} />} */}

        </>

    );
}

export default Refunding;
