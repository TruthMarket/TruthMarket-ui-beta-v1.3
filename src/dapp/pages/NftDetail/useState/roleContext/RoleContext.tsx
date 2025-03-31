
import React,{ 
    // createContext,
    useContext, 
    useState,
    ReactNode,
    // useEffect,
    // useRef,
} from 'react';
import { RoleType } from "../../../../type/contractDate";

interface ContextType {
    userRole: RoleType;
    updateUserRole : (role: RoleType) => void;
}

export let currentRole: RoleType = undefined;

const Context = React.createContext<ContextType | null>(null);

export const RoleProvider = ({ children }: { children: ReactNode }) => {

    const [userRole, setUserRole] = useState<RoleType>(currentRole);

    const updateUserRole = (role: RoleType) => {
        setUserRole(() => {
            currentRole = role;
            return role;
        });
    };

    // useEffect(()=>{
    //     console.log('current role:', userRole)
    // },[userRole])

    return (
        <Context.Provider value={{userRole, updateUserRole}}>
            {children}
        </Context.Provider>
    );
};

export const useRoleContext = () => useContext(Context);



    // const [nftList, setNftList] = useState<RoleType[]>([]);

    // const updateNftList = (newNft: RoleType) => {
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

    