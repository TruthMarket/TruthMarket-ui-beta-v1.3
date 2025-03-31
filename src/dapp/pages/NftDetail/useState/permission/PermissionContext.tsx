
import React,{ 
    // createContext,
    useContext, 
    useState,
    ReactNode,
    // useEffect,
    // useRef,
} from 'react';
import { PermissionType } from "../../../../type/contractDate";

interface ContextType {
    permission: PermissionType;
    updatePermission : (field: keyof PermissionType, value: boolean) => void;
}

export let currPermission: PermissionType = {
    exchange_isPause:false,
    other_isPause:false,
};

const Context = React.createContext<ContextType | null>(null);

export const PermissionProvider = ({ children }: { children: ReactNode }) => {

    const [permission, setPermission] = useState<PermissionType>(currPermission);

    const updatePermission = (field: keyof PermissionType, value: boolean) => {
        setPermission(prevState => {
            const newState = { ...prevState, [field]: value };
            currPermission = newState;
            return newState;
        });
    };

    return (
        <Context.Provider value={{permission, updatePermission}}>
            {children}
        </Context.Provider>
    );
};

export const usePermissionContext = () => useContext(Context);



    // const [nftList, setNftList] = useState<PermissionType[]>([]);

    // const updateNftList = (newNft: PermissionType) => {
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

    