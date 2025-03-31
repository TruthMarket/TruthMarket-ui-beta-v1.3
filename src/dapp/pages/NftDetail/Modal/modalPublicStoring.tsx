// import { useMintProgressContext } from '../../../provider/MintProgressProvider';
import {
    // ConfigProvider,
    Modal,
    // Button,
} from 'antd';
import {
    useState,
    useEffect,
} from 'react';
// import './index.css';
// import { useWriteContract } from 'wagmi';
import { Config_TruthBox } from '../../../constants/abiAddress_v1_3';
import { useNftDetailContext } from '../useState/nftDetail';
import { useRoleContext } from '../useState/roleContext/RoleContext';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
// import { useWalletContext } from '../../../context/useAccount/WalletContext';
// import { usePermissionContext } from '../useState/permission/PermissionContext';

interface Props {
    tokenId: number,
    onClose: () => void;
}

const ModalPublicStoring: React.FC<Props> = ({ tokenId, onClose }) => {
    // const { accountRole } = useWalletContext() || {}
    const { nftDetail } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    // const { writeContract, status } = useWriteContract();
    const [isAble, setIsAble] = useState<boolean>(false)
    const [okText, setOkText] = useState<string>('Submit')
    const [fileCid, setFileCid] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    if (!nftDetail) {
        return <div>loading...</div>
    }

    useEffect(() => {
        if (isConfirmed || error) {
            setIsAble(false)
            setOkText('Submit')
        } else if (isPending) {
            setIsAble(true)
            setOkText('wait...')
        }
    }, [error, isPending, isConfirmed]);

    const handleInputFileCID = (value: string) => {
        setFileCid(value)
    }

    const handleInputPassword = (value: string) => {
        setPassword(value)
    }

    const handlePublic = async () => {
        if (fileCid && password) {
            if (userRole === 'minter') {
                await write({
                    contract: Config_TruthBox,
                    functionName: 'PublicMinter',
                    args: [tokenId, fileCid, password], // 
                });
            } else {
                alert('You can`t do that!');
                return;
            }
        } else {
            alert('Empty data!')
        }
    }


    return (

        <Modal
            title="Public NFT"
            centered
            open={true}
            closable={false}
            maskClosable={false}  // 防止点击遮罩层关闭模态框
            onOk={handlePublic}
            onCancel={onClose}
            okButtonProps={{ disabled: isAble }}
            cancelButtonProps={{ disabled: isAble }}
            okText={okText}
            cancelText="Close"
            width={600}
        >
            <div className='modalContent'>

                <div className='contentDiv'>
                    <span className='spanRow'>
                        <h4>Current tokenId:</h4>
                        <p className='title'>{tokenId}</p>
                    </span>
                    <div>
                        <p className='tips'>Please enter the data from the previously minted files.</p>
                        <span className='spanRow'>
                            <h4 className='lable_input'>fileCID:</h4>
                            <input
                                className='modalInput'
                                type="text"
                                name="uint256"
                                placeholder="Input fileCID"
                                onChange={(e) => handleInputFileCID(e.target.value)}
                            />
                        </span>
                        <span className='spanRow'>
                            <h4 className='lable_input'>Password:</h4>
                            <input
                                className='modalInput'
                                type="text"
                                name="uint256"
                                placeholder="Input password"
                                onChange={(e) => handleInputPassword(e.target.value)}
                            />
                        </span>
                    </div>

                </div>
                <div className='line'></div>
            </div>
        </Modal>

    );
}

export default ModalPublicStoring;