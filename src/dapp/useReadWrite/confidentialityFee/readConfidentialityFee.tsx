import { useEffect,useState } from 'react';
import { Config_ConfidentialityFee } from "../../constants/abiAddress_v1_3";
// import { useState_paySecretFee } from "../../useState/state_paySecretFee";
import { useReadContract } from 'wagmi';


// 在这里添加其他函数...
export function Admin() {
    const { data,isError} = useReadContract({
        ...Config_ConfidentialityFee,
        functionName: 'Admin'
    });
    const [datas, setDatas] = useState<string >('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read confidentialityFee Admin error!')
        }
    }, [data, isError]);

    return datas;
};

export const Implementation=()=>{
    const { data, isError } = useReadContract({
        ...Config_ConfidentialityFee,
        functionName: 'Implementation'
    });

    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read confidentialityFee Implementation error!')
        }
    }, [data, isError]);

    return datas;
};

export const incrementRate = () => {

    const { data, isError } = useReadContract({
        ...Config_ConfidentialityFee,
        functionName: 'incrementRate'
    });

    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read confidentialityFee incrementRate error!')
        }
    }, [data, isError]);

    return datas;
};

// export const storageFee = () => {
//     const {data,isError} = useReadContract({
//         ...Config_ConfidentialityFee,
//         functionName: 'storageFee'
//     });

//     const [datas, setDatas] = useState<number>('')
//     useEffect(() => {
//         if (data) {
//             const counts = parseInt(data.toString());
//             setDatas(counts)
//         } else if (isError) {
//             console.log('read confidentialityFee storageFee error!')
//         }
//     }, [data, isError]);

//     return datas;
// };
