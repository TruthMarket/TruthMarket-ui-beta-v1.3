import { useState } from "react"
import { useCryptoUtils } from "../../../utils/crypto/crypto";
// import { Base64ToEthereumBytes, EthereumBytesToBase64 } from "../../../utils/crypto/bytes_base64";
// import { objectToTxtFile } from "../../../utils/toTxtFile/toTxt";

// interface TypeBuyerKey{
//     publicKey_buyer:string,
//     buyerInfo:object,
// }

export const useGetBuyerKey = () => {
    const [buyerInfo, setBuyerInfo] = useState<object>({
        title: 'This is buyer public key',
        dapp: 'Truth Market',
        tokenId: '',
        role: '',
        privateKey: '',
        publicKey: '',
        publicKey_base64: '',
        privateKey_base64: '',
        tips: 'This file is very important, please keep it properly'
    })

    const { generateKeyPair } = useCryptoUtils();

    const getBuyerKey = async (tokenId: number, roles:string)  => {
        if (roles!=='buyer' && roles!=='bidder'){
            return;
        }
        try {
            // 生成密钥对
            const { publicKey_bytes, privateKey_bytes } = await generateKeyPair();

            if (publicKey_bytes && privateKey_bytes) {
                const newInfo = {
                    ...buyerInfo,
                    tokenId: tokenId,
                    role:roles,
                    privateKey: privateKey_bytes,
                    publicKey: publicKey_bytes
                };
                setBuyerInfo(newInfo);
                const publicKey_buyer = publicKey_bytes;
                return publicKey_buyer;
            }
            return null;

        } catch (error) {
            console.error('getBuyerKey_Error', error);
            return null;
        }
    }

    return {
        getBuyerKey,
        buyerInfo,
    };

}