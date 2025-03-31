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
import { Config_Exchange } from '../../../constants/abiAddress_v1_3';
import { ContractContext } from '../../../context';
import { useRoleContext } from '../useState/roleContext/RoleContext';
import { useNftDetailContext } from '../useState/nftDetail';
import { useEnCryptDeliver } from '../DeEnCrypt/useEncryptDeliver';
// import { useWalletContext } from '../../../context/useAccount/WalletContext';

interface Props {
    tokenId: number,
    onClose: () => void;
}

const ModalDeliver: React.FC<Props> = ({ tokenId, onClose }) => {
    const { userRole } = useRoleContext() || {}
    const { PublicKey_buyer } = useContext(ContractContext);
    // const { accountRole } = useWalletContext() || {}
    const { updateNft_array } = useUpdateNft_array();
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const enCryptDeliver = useEnCryptDeliver();
    const [isAble, setIsAble] = useState<boolean>(false)
    const [okText, setOkText] = useState<string>('Submit')
    const [key_buyer, setKey_buyer] = useState<string>('')
    const { nftDetail_two } = useNftDetailContext() || {};
    const [privateKey_user, setPrivateKey_user] = useState<string>('')

    useEffect(() => {
        const fatch = async () => {
            const publicKey_buyer = await PublicKey_buyer(tokenId);
            setKey_buyer(publicKey_buyer);
        }
        fatch();
    }, [])

    useEffect(() => {
        if (isConfirmed) {
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

    const handleDiliver = async () => {

        const result = await enCryptDeliver(tokenId, key_buyer, privateKey_user);
        if (!result) {
            alert('Decryption failed!');
            return;
        }
        const { fileCid_iv_buyer, fileCid_buyer, password_iv_buyer, password_buyer } = result;

        if (nftDetail_two?.deliveryTimestamp && nftDetail_two?.deliveryTimestamp>0) {
            await write({
                contract: Config_Exchange,
                functionName: 'DeliverOverdue',
                args: [tokenId, fileCid_iv_buyer, password_iv_buyer, fileCid_buyer, password_buyer],
            });
        } else {
            await write({
                contract: Config_Exchange,
                functionName: 'Deliver',
                args: [tokenId, fileCid_iv_buyer, password_iv_buyer, fileCid_buyer, password_buyer],
            });
        }
    }

    const inputPrivateKey = (value: string) => {
        setPrivateKey_user(value)
    }

    return (

            <Modal
                title="Deliver"
                centered
                open={true}
                closable={false}
                maskClosable={false}  // 防止点击遮罩层关闭模态框
                onOk={handleDiliver}
                onCancel={onClose}
                okButtonProps={{ disabled: isAble }}
                cancelButtonProps={{ disabled: isAble }}
                okText={okText}
                cancelText="Close"
                width={600}
            >
                <div className='modalContent'>

                    <div className='contentDiv'>
                        <span className='spanColum'>
                            <h4>PublicKey_buyer:</h4>
                            <p className='title'>{key_buyer}</p>
                        </span>
                        <div className='line'></div>
                        {
                            key_buyer ? (
                                <div>
                                    <p className='tips'>Please enter the private key from the previously minted files.</p>
                                    <span className='spanColum'>
                                        <h4>privateKey: </h4>
                                        <textarea
                                            className='inputKey'
                                            name="bytes"
                                            placeholder={`You are ${userRole}, input ${userRole}  privateKey`}
                                            onChange={(e) => inputPrivateKey(e.target.value)}
                                        />

                                    </span>
                                    <p className='tips'>The format of the private key is: 0x........</p>
                                </div>

                            ) : (
                                <p className='tips'>PublicKey_buyer is null, So you can`t do anything!</p>
                            )
                        }

                    </div>
                    <div className='line'></div>
                </div>
            </Modal>

    );
}

export default ModalDeliver;