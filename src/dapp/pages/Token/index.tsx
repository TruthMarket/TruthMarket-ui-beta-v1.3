import React, {
    useState,
    useEffect
} from 'react';
import InputText from '../../element/InputText';
import ButtonCust from '../../element/ButtonCust';
import styles from './styles.module.scss';
import { feeToken_State } from '../../useState/state_feeToken';
import { Config_feeToken, Address_0 } from '../../constants/abiAddress_v1_2';
import { useAccount } from 'wagmi';
import { useWriteContract } from 'wagmi';
import { balanceOf, mintDate } from '../../useReadWrite/feeToken/readData';
import { timeToDate } from '../../utils/time';

type ActiveButton = 'mint' | 'burn' | 'transfer' | null;

const Token: React.FC = () => {
    const { writeContract, status } = useWriteContract();
    // const []
    const { address } = useAccount();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);
    const [transferAmount, setTransferAmount] = useState<number>(0);
    const [transferAddress, setTransferAddress] = useState<string>('');
    const [burnAmount, setBurnAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    // const [data,setData] = useState<string>('')
    // if (address === undefined) {
    //     return<div> Please </div>
    // }
    const balance = balanceOf(address || Address_0);
    const mint_data = mintDate(address || Address_0);


    useEffect(() => {
        if (status === 'success' || status === 'error') {
            setLoading(true);
            setActiveButton(null);
        } else {
            setLoading(false);
        }
    }, [status]);

    const handleTransferAmount = (value: string) => {
        // 只允许输入数字
        const numberRegex = /^[1-9]\d*$/;
        // 允许清空输入框
        if (value === '') {
            setTransferAmount(0);
            return;
        }
        // 验证输入是否符合要求：不能以0开头，只能是数字
        if (numberRegex.test(value)) {
            const tx = Number(value)
            setTransferAmount(tx);
        }
    };

    const handleTransferAddress = (value: string) => {
        // 允许清空输入框
        if (value === '') {
            setTransferAddress('');
            return;
        } else {
            setTransferAddress(value);

        }

    }


    const handleAll = () => {
        if (balance) {
            setBurnAmount(balance)
        }
    }

    const handleBurnAmount = (value: string) => {

        const numberRegex = /^[1-9]\d*$/;
        if (value === '') {
            setBurnAmount(0);
            return;
        }
        if (numberRegex.test(value)) {
            const tx = Number(value)
            setBurnAmount(tx);
        }
    };

    const handleBurn = () => {

    }

    const handleMint = () => {
        writeContract({
            ...Config_feeToken,
            functionName: 'mint',
            args: [address],
        });
    }

    const handleTransfer = () => {
        writeContract({
            ...Config_feeToken,
            functionName: 'transfer',
            args: [address],
        });
    }

    return (

        <div className={styles.home}>
            <div className={styles.container}>
                <div className={styles.account}>
                    <h2>Test Token</h2>
                    <h3>{feeToken_State.name} ---- {feeToken_State.symbol}</h3>
                    <p>{Config_feeToken.address}</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.dataRow}>
                        <h3>Your balance: {balance}</h3>
                        <ButtonCust
                            text='mint'
                            onClick={handleMint}
                            isLoading={loading || activeButton === 'mint'}
                        />
                    </div>
                    {/* <div className={styles.horizontalLine}></div> */}

                    <div className={styles.tipsRow}>
                        <span className={styles.spanCloum}>
                            <p className='tips'>You can mint 1,000,000 tokens each time.</p>
                            <p className='tips'>
                                You last minted on: {timeToDate(mint_data || 0)}, <br />
                                Each minting requires an interval of 72 hours.
                            </p>
                        </span>

                    </div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.dataRow}>
                        <span className={styles.spanRow}>
                            <InputText
                                onChange={handleTransferAmount}
                                value={transferAmount}
                            />
                            <div className={styles.spaceRow}></div>
                            <InputText
                                onChange={handleTransferAddress}
                                value={transferAddress}
                            />
                            <div className={styles.spaceRow}></div>
                            <ButtonCust
                                text='transfer'
                                onClick={handleTransfer}
                                isLoading={loading || activeButton === 'transfer'}
                            />
                        </span>
                    </div>
                    <div className={styles.dataRow}>
                        <span className={styles.spanRow}>
                            <InputText
                                onChange={handleBurnAmount}
                                value={burnAmount}
                            />
                            <div className={styles.spaceRow}></div>
                            <ButtonCust
                                text='all'
                                onClick={handleAll}
                                isLoading={false}
                            />
                            <div className={styles.spaceRow}></div>
                            <ButtonCust
                                text='burn'
                                onClick={handleBurn}
                                isLoading={loading || activeButton === 'burn'}
                            />

                        </span>
                    </div>
                    {/* <div className={styles.horizontalLine}></div> */}

                </div>

                <div className={styles.spaceFooter}>

                </div>
            </div>
        </div>

    );
};

export default Token;