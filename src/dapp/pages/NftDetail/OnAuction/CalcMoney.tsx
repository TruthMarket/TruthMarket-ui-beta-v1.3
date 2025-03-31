import React, { useState, useEffect } from 'react';
// import styles from '../styles.module.scss';
// import CountdownTimer from '../CountdownTimer';
// import Button from '../Button';
// import { useNftDetailContext } from '../useState/nftDetail';
// import { useRoleContext } from '../useState/roleContext/RoleContext';
// import { useWriteContract } from 'wagmi';
// import {
//     Config_Exchange,
//     Config_BoxPublic,
// } from '../../../constants/abiAddress_v1_2';
// import { usePermissionContext } from '../useState/permission/PermissionContext';
// import { useWalletContext } from '../../../context/useAccount/WalletContext';
// import { getBuyerKey } from '../OnSelling/getBuyerKey';
import { calcPayMoney } from '../../../useReadWrite/exchange/readExchange';
import { orderAmount } from '../../../useReadWrite/fundManager/readFund';

interface Props {
    tokenId: number,
    address: string,
}

const CalcMoney: React.FC<Props> = ({ tokenId, address }) => {

    const [newMoney, setNewMoney] = useState<number>(0)
    const [oldMoney, setOldMoney] = useState<number>(0)

    const payMoney= calcPayMoney(tokenId);

    useEffect(() => {
        if (payMoney) {
            setNewMoney(payMoney);
        }
    }, [payMoney]);

    const currentMoney= orderAmount(tokenId, address)

    useEffect(() => {
        if (currentMoney) {
            setOldMoney(currentMoney);
        }
    }, [currentMoney]);

    return (
        <>
            {
                oldMoney > 0 ? (
                    <div>
                        <span>
                            <p>
                                You have participated in the bidding for this NFT. <br />
                                You have {oldMoney} tokens in the contract.
                            </p>
                            
                        </span>
                        <p>
                            If you want to continue participating in the bidding, <br />
                            you need to pay:{newMoney}token.
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>
                            You have not participated in the bidding before! <br />
                            If you wish to participate, you need to pay the full amount!
                        </p>
                    </div>

                )
            }
        </>

    );
}

export default CalcMoney;