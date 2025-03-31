// import { nftForm_mint } from "../useState/nftForm";
// import { json_mint } from "../useState/json";
// import { fileImageState } from "../useState/fileImage";
import { useBoxInfoContext } from "../useState/boxInfo";
import { Address_0 } from "../../../constants/abiAddress_v1_2";
import { useWalletContext } from "../../../context/useAccount/WalletContext";
import { useEffect, useState } from "react";
// import { currentState } from "../../../useState/state_publicKeyCrypt";

export const CheckAccount = () => {
    const { address, accountRole } = useWalletContext();
    const { updateBoxInfo } = useBoxInfoContext() || {};
    const [tips, setTips] = useState<string>('')

    useEffect(() => {
        const fatch = () => {
            if (accountRole == 'other' && address != Address_0) {
                updateBoxInfo?.('minter', address)
                setTips('')
            } else if (accountRole == 'admin') {
                updateBoxInfo?.('minter', null)
                setTips('The current account cannot perform this operation. Please switch to a different account.')
            } else {
                updateBoxInfo?.('minter', null)
                setTips('Current wallet is not connected. Please connect your wallet.')
            }
        }
        fatch();
    }, [address, accountRole])

    return (
        <>
            {tips ? (
                <p className='attention'>{tips}</p>
            ) : (
                <p style={{ color: 'green' }}>You can create nft!</p>
            )}
        </>
    )

}

