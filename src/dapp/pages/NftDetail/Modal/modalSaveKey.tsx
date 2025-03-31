// import { useMintProgressContext } from '../../../provider/MintProgressProvider';
import {
    // ConfigProvider,
    Modal,
    Button,
} from 'antd';
import {
    // useEffect,
    useState,
} from 'react';
// import './index.css';
import { objectToTxtFile } from '../../../utils/toTxtFile/toTxt';
import { useSellFormContext } from '../useState/sellForm';

interface ModalProps {
    onClose: () => void;
}

const ModalSaveKey: React.FC<ModalProps> = ({ onClose }) => {
    const { sellForm } = useSellFormContext() || {};
    const [isAble, setIsAble] = useState<boolean>(true)

    const handleSave = () => {
        if (!sellForm) return
        // 调用 objectToTxtFile 函数
        const result = objectToTxtFile(sellForm, `TruthMarket_sell_tokenId_${sellForm.tokenId}`);

        if (result) {
            setIsAble(false);
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
                <Button key="ok" type="primary" onClick={onClose} disabled={isAble}>
                    Close
                </Button>
            ]}
            width={600}
        >
            <div className='modalContent'>
                <p className='title'>You are sell the box successful!</p>
                <div className='contentDiv'>
                    <span className='spanRow'>
                        <h4>tokenId:</h4>
                        <p className='key_P'>{sellForm?.tokenId}</p>
                    </span>
                    <span className='spanColum'>
                        <h4>Your privateKey:</h4>
                        <p className='key_P'>{sellForm?.privateKey_minter}</p>
                    </span>
                    <span className='spanColum'>
                        <h4>Your publicKey:</h4>
                        <p className='key_P'>{sellForm?.publicKey_minter}</p>
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
                        style={{ fontSize: '15px', padding: '5px 8px', }}
                    >
                        Save file
                    </button>
                </div>
            </div>
        </Modal>

    );
}

export default ModalSaveKey;