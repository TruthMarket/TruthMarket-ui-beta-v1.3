// import { useMintProgressContext } from '../../../provider/MintProgressProvider';
import {
    // ConfigProvider,
    Modal,
    // Button,
} from 'antd';
import {
    useState,
    useEffect,
    useContext,
} from 'react';
// import './index.css';
import { useUpdateNft_array } from '../../../hooks/useUpdateNft_array';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
import {
    // Config_BoxPublic, 
    Config_Exchange
} from '../../../constants/abiAddress_v1_3';
import { useNftDetailContext } from '../useState/nftDetail';
import { useRoleContext } from '../useState/roleContext/RoleContext';
import { ContractContext } from '../../../context';
// import { useDecrypt } from '../DeEnCrypt/useDecryptSee';
// import { useWalletContext } from '../../../context/useAccount/WalletContext';
// import { usePermissionContext } from '../useState/permission/PermissionContext';

interface Props {
    tokenId: number,
    onClose: () => void;
}

const ModalAgree: React.FC<Props> = ({ tokenId, onClose }) => {
    // const { accountRole } = useWalletContext() || {}
    const { PublicKey_buyer } = useContext(ContractContext);
    const { nftDetail } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    // const decrypt = useDecrypt();
    const { updateNft_array } = useUpdateNft_array();
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const [key_buyer, setKey_buyer] = useState<string>('')
    const [isAble, setIsAble] = useState<boolean>(false)
    const [okText, setOkText] = useState<string>('Submit')
    // const [publicKey_minter, setPublicKey_minter] = useState<string>('')
    // const [privateKey_user, setPrivateKey_user] = useState<string>('')

    if (!nftDetail) {
        return <div>loading...</div>
    }

    useEffect(() => {
        const fatch = async () => {
            const publicKey_buyer = await PublicKey_buyer(tokenId);
            setKey_buyer(publicKey_buyer);
        }
        fatch();
    }, [])

    useEffect(() => {
        if (isConfirmed || error) {
            setIsAble(false)
            setOkText('Submit')
            updateNft_array([tokenId])
        } else if (isPending) {
            setIsAble(true)
            setOkText('wait...')
        } else if (error) {
            setIsAble(false)
            setOkText('Submit')
        }
    }, [error, isPending, isConfirmed]);


    const handleAgree = async () => {

        if (userRole === 'minter' || userRole === 'admin') {

            // const result = await decrypt(tokenId, privateKey_user);
            // if (!result) {
            //     alert('Decryption failed!');
            //     return;
            // }
            // const { fileCid, password } = result;

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
    }

    // const inputPrivateKey = (value: string) => {
    //     setPrivateKey_user(value)
    // }

    return (

        <Modal
            title="Public NFT"
            centered
            open={true}
            closable={false}
            maskClosable={false}  // 防止点击遮罩层关闭模态框
            onOk={handleAgree}
            onCancel={onClose}
            okButtonProps={{ disabled: isAble }}
            cancelButtonProps={{ disabled: isAble }}
            okText={okText}
            cancelText="Close"
            width={600}
        >
            <div className='modalContent'>
                {
                    (userRole === 'minter' || userRole === 'admin') ? (
                        <div className='contentDiv'>
                            <span className='spanColum'>
                                <h4>PublicKey_buyer:</h4>
                                <p className='title'>{key_buyer}</p>
                            </span>
                            <div className='line'></div>
                            <p className='tips'>Please enter the private key from the previously minted files.</p>
                            {/* <span className='spanColum'>
                                <h4>privateKey:</h4>
                                <textarea
                                    className='inputKey'
                                    name="bytes"
                                    placeholder={`You are ${userRole}, input ${userRole}  privateKey`}
                                    onChange={(e) => inputPrivateKey(e.target.value)}
                                />
                            </span> */}
                            <p className='tips'>The format of the private key is: 0x........</p>
                        </div>
                    ) : (
                        <div className='contentDiv'>
                            <h4>The refund review period has expired!</h4>
                            <p className='tips'>Are you sure you want to perform this operation?</p>
                        </div>
                    )
                }
                <div className='line'></div>
            </div>
        </Modal>

    );
}

export default ModalAgree;