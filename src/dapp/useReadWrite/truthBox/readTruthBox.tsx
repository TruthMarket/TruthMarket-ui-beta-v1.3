import { useEffect, useState,useMemo } from 'react';
import { Config_TruthBox } from "../../constants/abiAddress_v1_3";
// import { useState_nftBox } from "../../useState/state_nftBox";
import { boxStatus, BoxStatus, BoxInfoType, } from "../../type/contractDate";
import { useReadContract, useReadContracts } from 'wagmi';
import { useReadContractsList } from '../../utils/readContract/readContractsList';

export function Admin() {
    const { data,isError} = useReadContract({
        ...Config_TruthBox,
        functionName: 'Admin'
    });
    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox Admin error!')
        }
    }, [data, isError]);

    return datas;
};

export function totalSupply() {
    
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'totalSupply',
    })

    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox totalSupply error!')
        }
    }, [data, isError]);

    return datas;
};

export function blackSupply() {
    
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'blackSupply'
    });

    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox blackSupply error!')
        }
    }, [data, isError]);

    return datas;
};

export function invalidSupply() {
    
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'invalidSupply'
    });

    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox invalidSupply error!')
        }
    }, [data, isError]);

    return datas;
};

export function logoURI() {
    
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'logoURI'
    });

    const [datas, setDatas] = useState<string>('')

    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox logoURI error!')
        }
    }, [data, isError]);

    return datas;
};

export function name() {
    
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'name'
    });

    const [datas, setDatas] = useState<string>('')

    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox name error!')
        }
    }, [data, isError]);

    return datas;
};

export function symbol() {
    
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'symbol'
    });

    const [datas, setDatas] = useState<string>('')

    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox symbol error!')
        }
    }, [data, isError]);

    return datas;
};


export function balanceOf(address: string) {
    
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'balanceOf',
        args: [address]
    });

    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox balanceOf error!')
        }
    }, [data, isError]);

    return datas;
};

export function getApproved(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'getApproved',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox getApproved error!')
        }
    }, [data, isError]);

    return datas;
};

// 示例
export const getBoxInfo = (tokenId: number) => {
    // 自定义的hooks只能在react组件中被调用。
    const { data, isError } = useReadContract(
        {
            ...Config_TruthBox,
            functionName: 'getBoxInfo',
            args: [tokenId],
        }
    );
    // console.log('获取到的data:',data) //ok
    const [box, setBox] = useState<BoxInfoType | undefined>(undefined);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const [infoCID, tokenURI, fileCID, password, price, deadline, status] = data;

            setBox({
                tokenId: tokenId,
                infoCID: infoCID.toString(),
                tokenURI: tokenURI.toString(),
                fileCID: fileCID.toString(),
                Password: password.toString(),
                price: typeof price === 'bigint' ? Number(price) : parseInt(price.toString()),
                deadline: typeof deadline === 'bigint' ? Number(deadline) : parseInt(deadline.toString()),
                status: boxStatus[Number(status)] as BoxStatus
            });
            // console.log('获取到的BoxInfo:',boxInfo) // ok
        }
    }, [data])

    return { boxInfo:box, isError };
};
// 示例
export const getBoxInfoList = (tokenIdArray: number[]) => {
    // 自定义的hooks只能在react组件中被调用。
    const { data, isError } = useReadContractsList(
        tokenIdArray,
        Config_TruthBox,
        'getBoxInfo',
    );
    // console.log('获取到的BoxInfo数组:',data) // ok
    const [boxInfoList,setBoxInfoList]= useState<BoxInfoType[]>([]); // 数据量比较多，所以采用状态变量
    // let box: BoxInfoType | undefined;
    useEffect(() => {
        if (data) {
            let list:BoxInfoType[]=[];
            for (let i = 0; i < data.length; i++) {
                // console.log('data[i]获取到的BoxInfo:',data[i].result) // ok
                const [infoCID, tokenURI, fileCID, password, price, deadline, status] = data[i].result; // 函数返回值有多个，赋值给数组对象
                const box = {
                    tokenId: tokenIdArray[i],
                    infoCID: infoCID.toString(),
                    tokenURI: tokenURI.toString(),
                    fileCID: fileCID.toString(),
                    Password: password.toString(),
                    price: typeof price === 'bigint' ? Number(price) : parseInt(price.toString()),
                    deadline: typeof deadline === 'bigint' ? Number(deadline) : parseInt(deadline.toString()),
                    status: boxStatus[Number(status)] as BoxStatus
                }
                list.push(box)
                
            };
            setBoxInfoList(list)
        }
    }, [data])

    return { boxInfoList, isError };
};

export function getDeadline(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'getDeadline',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox totalSupply error!')
        }
    }, [data, isError]);

    return datas;
};

export const getPrice = (tokenId: number) => {
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'getPrice',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox getPrice error!')
        }
    }, [data, isError]);

    return datas;
};
// 示例
export const getStatus = (tokenId: number) => {
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'getStatus',
        args: [tokenId]
    });
    // console.log('获取到的getStatus:',data) // ok
    let status: BoxStatus | undefined;
    if (data) {
        const statusIndex = Number(data);
        status = boxStatus[statusIndex] as BoxStatus;
        // console.log(`getStatus当前枚举值：${status}`); // ok
    }

    return { Status: status, isError };
};
// 示例
export const useGetStatusList = (tokenIdArray: number[]) => {
    // const { data, isError } = useReadContractsList(
    //     tokenIdArray,
    //     Config_TruthBox,
    //     'getStatus',
    // );

    // console.log('获取到的getStatusList数组:',data) // ok
    // let StatusList: BoxStatus[] = []
    // let status: BoxStatus | undefined;
    // if (data) {
    //     for (let i = 0; i < data.length; i++) {
    //         const statusIndex = Number(data[i].result); // 由于函数的返回值只有一个，所以直接进行赋值
    //         // console.log(`getStatusList当前枚举值：${statusIndex}`); // ok
    //         status = boxStatus[statusIndex] as BoxStatus;
    //         StatusList.push(status);
    //     }
    // }

    const count = tokenIdArray.length;
    const calls = Array.from({ length: count}, (_, i) => ({
        ...Config_TruthBox,
        functionName: 'getStatus',
        args: [tokenIdArray[i]],
    }));
    console.log('ReadContractsList,calls：', calls)
    const { data, error: isError,} = useReadContracts({
        contracts:calls,
    });
    console.log('get the getStatusList array:',data) //
    const StatusList: BoxStatus[] = useMemo(() => {
        if (!data) return [];
        return data.map(item => {
            const statusIndex = Number(item.result);
            return boxStatus[statusIndex] as BoxStatus;
        });
    }, [data]);
    
    return { StatusList, isError };
};

export function isApprovedForAll(owner: string, operator: string) {
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'isApprovedForAll',
        args: [owner, operator]
    });

    const [datas, setDatas] = useState<boolean>(false)

    useEffect(() => {
        if (typeof data === 'boolean') {
            setDatas(data)
        } else if (isError) {
            console.log('read nftBox isApprovedForAll error!')
        }
    }, [data, isError]);

    return datas;
};

export function isBlackTokenId(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'isBlackTokenId',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<boolean>(false)

    useEffect(() => {
        if (typeof data === 'boolean') {
            setDatas(data)
        } else if (isError) {
            console.log('read nftBox isBlackTokenId error!')
        }
    }, [data, isError]);

    return datas;
};

export function minterOf(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'minterOf',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<string>('')

    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox minterOf error!')
        }
    }, [data, isError]);

    return datas;
};

export function ownerOf(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'ownerOf',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<string>('')

    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox ownerOf error!')
        }
    }, [data, isError]);

    return datas;
};

// export function supportsInterface(interfaceId: string) {
//     const { data, isError } = useReadContract({
//         ...Config_TruthBox,
//         functionName: 'supportsInterface',
//         args: [interfaceId]
//     });

//     return { supportsInterface: data, isError };
// };

export function tokenURI(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_TruthBox,
        functionName: 'tokenURI',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<string>('')

    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read nftBox tokenURI error!')
        }
    }, [data, isError]);

    return datas;
};
