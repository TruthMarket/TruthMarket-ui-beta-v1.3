import React,{ 
    // useEffect,
    useContext, 
    useState,
    ReactNode,
} from 'react';
import { FormState } from './stateType';

interface NftFormType {
    nftForm: FormState;
    updateNftForm: (field: keyof FormState, value: any) => void;
}

export let nftForm_mint: FormState = {
    radio: '',
    infoCID: '',
    tokenURI:'',
}

const Context = React.createContext<NftFormType | null>(null);

export const NftFormProvider = ({ children }: { children: ReactNode }) => {
    const [nftForm, setNftForm] = useState<FormState>(nftForm_mint);

    const updateNftForm = (field: keyof FormState, value: any) => {
        setNftForm(prevState => {
            const newState = { ...prevState, [field]: value };
            nftForm_mint = newState;
            return newState;
        });
    };

    // useEffect(() => {
    //     console.log('price:', nftForm.price);
    //     console.log('radio:', nftForm.radio);
    //     console.log('infoCID:', nftForm.infoCID);
    //     console.log('tokenURI:', nftForm.tokenURI);
    //     console.log('fileCid_iv_office:', nftForm.fileCid_iv_office);
    //     console.log('password_iv_office:', nftForm.password_iv_office);
    //     console.log('fileCid_office:', nftForm.fileCid_office);
    //     console.log('password_office:', nftForm.password_office);
    // }, [
    //     nftForm.price,
    //     nftForm.radio,
    //     nftForm.infoCID,
    //     nftForm.tokenURI,
    //     nftForm.fileCid_iv_office,
    //     nftForm.password_iv_office,
    //     nftForm.fileCid_office,
    //     nftForm.password_office,
    // ]);

    return (
        <Context.Provider value={{nftForm, updateNftForm}}>
            {children}
        </Context.Provider>
    );
};

export const useNftFormContext = () => useContext(Context);