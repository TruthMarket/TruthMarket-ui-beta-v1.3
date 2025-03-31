import React,{ 
    // useEffect,
    useContext, 
    useState,
    ReactNode,
} from 'react';
import { SellState } from './stateType';

interface NftFormType {
    sellForm: SellState;
    updateSellForm: (field: keyof SellState, value: any) => void;
}

export let sellForm_sell: SellState = {
    tokenId: '',
    fileCid: '',
    password: '',
    price: '',
    publicKey_minter:'',
    privateKey_minter:'',
    // fileCid_iv_office:'',
    // password_iv_office:'',
    // fileCid_office: '',
    // password_office: '',
    
}

const Context = React.createContext<NftFormType | null>(null);

export const SellFormProvider = ({ children }: { children: ReactNode }) => {
    const [sellForm, setSellForm] = useState<SellState>(sellForm_sell);

    const updateSellForm = (field: keyof SellState, value: any) => {
        setSellForm(prevState => {
            const newState = { ...prevState, [field]: value };
            sellForm_sell = newState;
            return newState;
        });
    };

    // useEffect(() => {
    //     console.log('price:', sellForm.price);
    //     console.log('radio:', sellForm.radio);
    //     console.log('jsonCID:', sellForm.jsonCID);
    //     console.log('urlCID:', sellForm.urlCID);
    //     console.log('fileCid_iv_office:', sellForm.fileCid_iv_office);
    //     console.log('password_iv_office:', sellForm.password_iv_office);
    //     console.log('fileCid_office:', sellForm.fileCid_office);
    //     console.log('password_office:', sellForm.password_office);
    // }, [
    //     sellForm.price,
    //     sellForm.radio,
    //     sellForm.jsonCID,
    //     sellForm.urlCID,
    //     sellForm.fileCid_iv_office,
    //     sellForm.password_iv_office,
    //     sellForm.fileCid_office,
    //     sellForm.password_office,
    // ]);

    return (
        <Context.Provider value={{sellForm, updateSellForm}}>
            {children}
        </Context.Provider>
    );
};

export const useSellFormContext = () => useContext(Context);