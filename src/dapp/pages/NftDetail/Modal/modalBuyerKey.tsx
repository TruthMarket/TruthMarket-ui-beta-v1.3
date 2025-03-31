// import { useMintProgressContext } from '../../../provider/MintProgressProvider';
import {
    // ConfigProvider,
    Modal,
    Button,
} from 'antd';
import {
    useEffect,
    useState,
} from 'react';
// import './index.css';
import { objectToTxtFile } from '../../../utils/toTxtFile/toTxt';

export type statusAbled = 'isPending' | 'isConfirmed'|'error';

interface ModalProps {
    onClose: () => void;
    buyerInfo: any;
    status:statusAbled;
}

const ModalBuyerKey: React.FC<ModalProps> = ({ onClose, buyerInfo ,status}) => {

    const [closeAbled, setCloseAbled] = useState<boolean>(true)
    const [isSaveAbled, setIsSaveAbled] = useState<boolean>(true)

    useEffect(()=>{
        if(status === 'isPending') {
            setIsSaveAbled(true)
        } else if(status === 'isConfirmed'){
            setIsSaveAbled(false)
        } else if(status === 'error'){
            setIsSaveAbled(true)
            setCloseAbled(false);
        }
    },[status])

    const handleSave = () => {

        // 调用 objectToTxtFile 函数
        const result = objectToTxtFile(buyerInfo, `TruthMarket_buy_id_${buyerInfo.tokenId}_time_`);

        if (result) {
            setCloseAbled(false);
        } else {
            alert('Save failed!');
        }
    }

    return (
        <Modal
            title="Upload and Mint"
            centered
            open={true}
            closable={false}
            maskClosable={false}  // 防止点击遮罩层关闭模态框
            // onOk={onClose}
            // onCancel={onClose}
            // okButtonProps={{ disabled: true }}
            // cancelButtonProps={{ disabled:true}}
            footer={[
                <Button key="ok" type="primary" onClick={onClose} disabled={closeAbled}>
                    Close
                </Button>
            ]}
            width={600}
        >

            <div className='modalContent'>
                <p className='title'>{buyerInfo?.title}</p>
                <p className='createTime'> Dapp: {buyerInfo.dapp} </p>
                <p className='createTime'> TokenId: {buyerInfo.tokenId} </p>
                <p className='createTime'> You are: {buyerInfo.role} </p>
                <div className='contentDiv'>
                    <span className='spanColum'>
                        <h4>Your privateKey:</h4>
                        <p className='key_P'>{buyerInfo.privateKey}</p>
                    </span>
                    <span className='spanColum'>
                        <h4>Your publicKey:</h4>
                        <p className='key_P'>{buyerInfo.publicKey}</p>
                    </span>
                </div>
                <p className='tips'>
                    These pieces of information are very important! Please make sure to keep it properly.
                </p>
                <div className='line'></div>
                <div className='footer'>
                    <button
                        className='footerButton'
                        onClick={handleSave}
                        disabled={isSaveAbled}
                        style={{ fontSize: '15px', padding: '5px 8px', }}
                    >
                        Save file
                    </button>
                </div>
            </div>

        </Modal>

    );
}

export default ModalBuyerKey;