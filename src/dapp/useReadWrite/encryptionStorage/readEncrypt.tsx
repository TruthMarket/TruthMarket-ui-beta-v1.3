import React, { useEffect,useState } from 'react';
import { Config_EncryptionStorage } from "../../constants/abiAddress_v1_3";
// import { useState_publicKeyCrypt } from "../../useState/state_publicKeyCrypt";
import { useReadContract } from 'wagmi';


export function Admin() {
    const { data,isError} = useReadContract({
        ...Config_EncryptionStorage,
        functionName: 'Admin'
    });
    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read EncryptionStorage Admin error!')
        }
    }, [data, isError]);

    return datas;
};


export function PublicKey_minter(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_EncryptionStorage,
        functionName: 'PublicKey_minter',
        args: [tokenId]
    });
    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read EncryptionStorage PublicKey_minter error!')
        }
    }, [data, isError]);

    return datas;
};

export function PublicKey_office(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_EncryptionStorage,
        functionName: 'PublicKey_office',
        args: [tokenId]
    });
    
    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            // console.log('PublicKey_office:',counts)
            setDatas(counts)
        } else if (isError) {
            console.log('read EncryptionStorage PublicKey_office error!')
        }
    }, [data, isError]);

    return datas;
};

export function PublicKey_buyer(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_EncryptionStorage,
        functionName: 'PublicKey_buyer',
        args: [tokenId]
    });
    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read EncryptionStorage PublicKey_buyer error!')
        }
    }, [data, isError]);

    return datas;
};

export function PrivateKey_buyer(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_EncryptionStorage,
        functionName: 'PrivateKey_buyer',
        args: [tokenId]
    });
    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read EncryptionStorage PrivateKey_buyer error!')
        }
    }, [data, isError]);

    return datas;
};

export function officeKeyCounts(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_EncryptionStorage,
        functionName: 'officeKeyCounts',
        args: [tokenId]
    });
    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read EncryptionStorage officeKeyCounts error!')
        }
    }, [data, isError]);

    return datas;
};

export function getCryptData_office(tokenId: number) {

    const { data} = useReadContract({
        ...Config_EncryptionStorage,
        functionName: 'getCryptData_office',
        args: [tokenId]
    });

    const [cidCrypt_iv_office, cidCrypt_office, passwordCrypt_iv_office, passwordCrypt_office] =
        React.useMemo(() => {
            if (data && Array.isArray(data) && data.length === 4) {
                return data.map(item => item.toString());
            }
            return [undefined, undefined, undefined, undefined];
        }, [data]);

    return { cidCrypt_iv_office, cidCrypt_office, passwordCrypt_iv_office, passwordCrypt_office};
};

export function getCryptData_buyer(tokenId: number) {
    const { data} = useReadContract({
        ...Config_EncryptionStorage,
        functionName: 'getCryptData_buyer',
        args: [tokenId]
    });
    const [cidCrypt_iv_user, cidCrypt_user, passwordCrypt_iv_user, passwordCrypt_user] =
        React.useMemo(() => {
            if (data && Array.isArray(data) && data.length === 4) {
                return data.map(item => item.toString());
            }
            return [undefined, undefined, undefined, undefined];
        }, [data]);

    return { cidCrypt_iv_user, cidCrypt_user, passwordCrypt_iv_user, passwordCrypt_user};
};

// export function isMintPaused() {
//     const { data, isError } = useReadContract({
//         ...Config_EncryptionStorage,
//         functionName: 'isMintPaused'
//     });
//     const [datas, setDatas] = useState<boolean>(false);

//     useEffect(() => {
//         if (typeof data === 'boolean') {
//             setDatas(data)
//         } else if (isError) {
//             console.log('read EncryptionStorage isMintPaused error!')
//         }
//     }, [data, isError]);

//     return datas;
// };

// export function tokenIdArray() {
//     const { data, isError } = useReadContract({
//         ...Config_EncryptionStorage,
//         functionName: 'tokenIdArray'
//     });
//     const [datas, setDatas] = useState<number[]>([])
//     useEffect(() => {
//         if (data && Array.isArray(data)) {
//             // 将BigInt数组转换为number数组
//             const numberArray = data.map(item => Number(item));
//             setDatas(numberArray);
//         } else if (isError) {
//             console.log('read EncryptionStorage tokenIdArray error!');
//         }
//     }, [data, isError]);

//     return datas;
// };
