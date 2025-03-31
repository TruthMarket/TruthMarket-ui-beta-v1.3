
import React, {
    // createContext,
    useContext,
    useState,
    ReactNode,
    // useRef,
} from 'react';
import { NftDetailType, NftDetailType_two } from "../../../type/contractDate";

interface ContextType {
    nftDetail: NftDetailType;
    updateNftDetail: (nft: NftDetailType) => void;
    updateNftKey: (field: keyof NftDetailType, value: any) => void;
    nftDetail_two: NftDetailType_two;
    updateNftDetail_two: (field: keyof NftDetailType_two, value: any) => void;
}

export let currentNtf: NftDetailType = {
    tokenId: 0,
    fileCID: '',
    password: '',
    title: '',
    image: '',
    country: '',
    state: '',
    description: '',
    createDate: '',
    eventDate: '',
    price: 0,
    deadline: 0,
    status: 'Storing',
}

export let currentNtf_two: NftDetailType_two = {
    deliveryTimestamp:0,
    refundRequestTimestamp: 0,
    purchaseTimestamp: 0,
    overDeadline: false,
    isBlackTokenId: false,
    refundPermit: false,
    inRefundDeadline: false,
    inReviewDeadline:false,
    minter: '',
    owner: '',
    buyer:'',
    noBuyer: true,
    fileUri:'',
}

const Context = React.createContext<ContextType | null>(null);

export const NftDetailProvider = ({ children }: { children: ReactNode }) => {

    const [nftDetail, setNftDetail] = useState<NftDetailType>(currentNtf);

    const updateNftDetail = (nft: NftDetailType) => {
        setNftDetail(() => {
            currentNtf = nft;
            return nft;
        });
    };

    const updateNftKey = (field: keyof NftDetailType, value: any) => {
        setNftDetail(prevState => {
            const newState = { ...prevState, [field]: value };
            currentNtf = newState;
            return newState;
        });
    };

    // ===============================================================
    const [nftDetail_two, setNftDetail_two] = useState<NftDetailType_two>(currentNtf_two);

    const updateNftDetail_two = (field: keyof NftDetailType_two, value: any) => {
        setNftDetail_two(prevState => {
            const newState = { ...prevState, [field]: value };
            currentNtf_two= newState;
            return newState;
        });
    };

    return (
        <Context.Provider value={{
            nftDetail,
            updateNftDetail,
            updateNftKey,
            nftDetail_two,
            updateNftDetail_two
        }}>
            {children}
        </Context.Provider>
    );
};

export const useNftDetailContext = () => useContext(Context);



// const [nftList, setNftList] = useState<NftDetailType[]>([]);

// const updateNftList = (newNft: NftDetailType) => {
//     setNftList(prevState => {
//         const updatedList = [...prevState, newNft];
//         nft_marketList=updatedList;
//         if (newNft.tokenId && !recodeList.includes(newNft.tokenId)) {
//             recodeList.push(newNft.tokenId);
//         }
//         return updatedList;
//     });
// };

// const updateErrorList=(tokenId:number)=>{
//     errorList.push(tokenId);
// }

