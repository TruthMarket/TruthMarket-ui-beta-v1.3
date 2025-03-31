import {
    // useState,
    // useEffect,
    useContext, 
} from 'react';
import { useTabContext } from '../../context/tabContext';
import { NftDetailType } from '../../../../type/contractDate';
import { useWalletContext } from '../../../../context/useAccount/WalletContext';
import { ContractContext } from '../../../../context';
// import { 
//     contractConfig_FundManager, 
//     contractConfig_Exchange 
// } from '../../../../constants/abiAddress';
// import { ContractContext } from '../../../../context';
// import { feeToken_State } from '../../../../useState/state_feeToken';
// import { minterRewards, orderAmount, otherRewards, refundPermit, sellerFeeRate } from '../../../../useReadWrite/fundManager/readFund';


export interface TypeWithdraw {
    disabled: boolean;
    type: string;
    amount: number;
}

export const useArgsData = () => {
    const { address } = useWalletContext() || {};
    // const [disabled, setDisabled] = useState<boolean>(true);
    // const [type, setType] = useState<string>('Rewards');
    // const [amount, setAmount] = useState<number>(0)
    const { currentTab } = useTabContext() || {};
    // /(10**decimals)
    // const decimals = feeToken_State.decimals;

    const { 
        minterRewards,
        otherRewards, 
        buyerOf, 
        refundPermit,
        // sellerFeeRate
        orderAmount, 
    } = useContext(ContractContext);

        const argsData = async (data: NftDetailType): Promise<TypeWithdraw> => {
            let amount=0;
            let type = 'Rewards';
            let disabled = true;

            if (
                !address || 
                !currentTab || 
                data.status === 'Storing' || 
                data.status === 'Selling' 
            ) {
                return {
                    disabled,
                    type,
                    amount,
                }
            }
            
            try {
                if (
                    currentTab === 'minter' && 
                    (data.status === 'Completed' || data.status === 'Published' )
                ) {
                    amount = await minterRewards(data.tokenId);
                    
                    console.log(`minterRewards_id:${data.tokenId}:`, amount);
                    // 测试
                    // const sellerFeeRate = await functions.sellerFeeRate();
                    // console.log('sellerFeeRate:', sellerFeeRate);
                } else if (
                    currentTab === 'buyer' &&
                    (data.status !== 'Auctioning' && data.status !== 'Delivering' && data.status !== 'Refunding')
                ) {
                    const refundPer = await refundPermit(data.tokenId);
                    if (refundPer) {
                        amount = await orderAmount(data.tokenId, address);
                        type='Refund';
                    } else {
                        amount = await otherRewards(data.tokenId, address);

                    }
                } else if (currentTab === 'bidder') {
                    const buyer = await buyerOf(data.tokenId);
                    if (buyer !== address) {
                        amount = await orderAmount(data.tokenId, address);
                        type='Order';
                    }
                    const refundPer = await refundPermit(data.tokenId);
                    if (refundPer) {
                        if (buyer === address) {
                            amount = await orderAmount(data.tokenId, address);
                            type='Refund';
                        }
                    } else {
                        amount = await otherRewards(data.tokenId, address);
                    }
                } else if (
                    (currentTab === 'Completer') &&
                    (data.status === 'Completed' || data.status === 'Published')
                ) {
                    amount = await otherRewards(data.tokenId, address);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            if (amount>0) {
                // setAmount(amount/(10**feeToken_State.decimals));
                disabled = false;
            }
            
        return { disabled, type, amount };
    };

    // useEffect(() => {
    //     if (amount > 0) {
    //         setDisabled(false)
    //     }
    // }, [amount])

    return argsData;
};

// function getFunctionName(currentTab: string): string {
//     switch (currentTab) {
//         case 'minter':
//             return 'minterRewards';
//         case 'buyer':
//         case 'bidder':
//             return 'orderAmount';
//         case 'Seller':
//         case 'Completer':
//             return 'otherRewards';
//         default:
//             return 'minterRewards';
//     }
// }

// function getFunctionArgs(currentTab: string, tokenId: number, address: string): any[] {
//     switch (currentTab) {
//         case 'minter':
//             return [tokenId];
//         case 'buyer':
//         case 'bidder':
//         case 'Seller':
//         case 'Completer':
//             return [tokenId, address];
//         default:
//             return [tokenId];
//     }
// }
