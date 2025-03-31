import React,{ 
    // createContext,
    useContext, 
    useState,
    ReactNode,
    // useEffect,
} from 'react';
import { MintProgress } from './stateType';

interface ContextType {
    mintProgress: MintProgress;
    updateMintProgress: (field: keyof MintProgress, value: any) => void;
}

export let mintProgress_mint: MintProgress = {
    isLoading: false,
    compressIsLoading: false,
    upload_FileIsLoading: false,
    upload_ImageIsLoading: false,
    upload_JsonIsLoading: false,
    upload_UrlIsLoading: false,
    encryptedIsLoading: false,
    mint_NftIsLoading: false,
    upload_FileProgress: 0,
    upload_ImageProgress: 0,
    upload_JsonProgress: 0,
    upload_UrlProgress: 0,
    compressError: null,
    upload_FileError: null,
    upload_ImageError: null,
    upload_JsonError: null,
    upload_UrlError: null,
    encrypted_Error: null,
    mint_NftError: null,
    isComplete: false,
};

const Context = React.createContext<ContextType | null>(null);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
    const [mintProgress, setMintProgress] = useState<MintProgress>(mintProgress_mint);

    const updateMintProgress = (field: keyof MintProgress, value: any) => {
        setMintProgress(prevState => {
            const newState = { ...prevState, [field]: value };
            mintProgress_mint = newState;
            return newState;
        });
    };

    // useEffect(() => {
        // console.log('JsonProgress:', mintProgress.upload_JsonProgress);
        // console.log('ImageProgress:', mintProgress.upload_ImageProgress);
    // }, [mintProgress.upload_JsonProgress, mintProgress.upload_ImageProgress]);

    return (
        <Context.Provider value={{mintProgress, updateMintProgress}}>
            {children}
        </Context.Provider>
    );
};

export const useProgressContext = () => useContext(Context);
