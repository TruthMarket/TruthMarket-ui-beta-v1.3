import React,{ 
    // createContext,
    useContext, 
    useState,
    ReactNode,
    // useRef,
} from 'react';
import { NftDetailType } from '../type/contractDate';

interface ContextType {
    nftList: NftDetailType[];
    updateNftList : (newNft: NftDetailType) => void;
    errorList:number[];
    blackList:number[];
    addErrorList:(tokenId:number) =>void;
    removeErrorList:(tokenId:number) =>void;
    addBlackList:(tokenId:number) =>void;
    removeBlackList:(tokenId:number) =>void;
}

export let nft_marketList:NftDetailType[]=[];
export let recodeList_let:number[]=[];
export let errorList_let:number[]=[];
export let blackList_let:number[]=[];

// 创建默认值对象
const defaultContextValue: ContextType = {
    nftList: nft_marketList,
    updateNftList: () => {},
    // getNftDetail: () => undefined,
    // getNftDetailNoCheck: () => undefined,
    errorList:errorList_let,
    blackList:blackList_let,
    addErrorList: () => {},
    removeErrorList: () => {},
    addBlackList: () => {},
    removeBlackList: () => {},
    // checkTokenIdExpired: () => false,
};

const Context = React.createContext<ContextType>(defaultContextValue);

export const NftListProvider = ({ children }: { children: ReactNode }) => {
    const [nftList, setNftList] = useState<NftDetailType[]>(nft_marketList);

    const updateNftList = (newNft: NftDetailType) => {
        setNftList(prevState => {
            const updatedList = [...prevState, newNft];
            nft_marketList=updatedList;
            if (!recodeList_let.includes(newNft.tokenId)) {
                recodeList_let.push(newNft.tokenId);
                // console.log('recodeList_let add tokenId:', newNft.tokenId); // ok
            }
            return updatedList;
        });
    };
    const [errorList, setErrorList] = useState<number[]>(errorList_let);

    const addErrorList=(tokenId:number)=>{
        setErrorList(prevState =>{
            const list = [...prevState, tokenId]
            errorList_let=list;
            return list;
        })
    }
    const removeErrorList = (tokenId: number) => {
        setErrorList(prevState => {
            const list = prevState.filter(id => id !== tokenId);
            errorList_let = list;
            return list;
        });
    }
    const [blackList, setBlackList] = useState<number[]>(blackList_let);

    const addBlackList=(tokenId:number)=>{
        setBlackList(prevState =>{
            const list = [...prevState, tokenId]
            blackList_let=list;
            return list;
        })
    }
    const removeBlackList = (tokenId: number) => {
        setBlackList(prevState => {
            const list = prevState.filter(id => id !== tokenId);
            blackList_let = list;
            return list;
        });
    }

    return (
        <Context.Provider value={{
            nftList, 
            updateNftList, 
            errorList,
            addErrorList,
            removeErrorList,
            blackList,
            addBlackList,
            removeBlackList
            }}>
            {children}
        </Context.Provider>
    );
};

export const useNftListContext = () => useContext(Context);
