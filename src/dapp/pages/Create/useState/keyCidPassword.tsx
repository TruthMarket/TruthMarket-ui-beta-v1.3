import React,{ 
    // createContext, 
    useContext, 
    ReactNode, 
    useState 
} from 'react';
// import { usecidPasswState } from '../useState/cidPasswState';
import { 
    CidPasswState,
    // KeyState 
} from './stateType';

interface ContextType {
    cidPasswState: CidPasswState;
    updateCidPasswState: (field: keyof CidPasswState, value: any) => void;

    // keyState: KeyState;
    // updateKeyState: (field: keyof KeyState, value: any) => void;
}

export let filePassword_mint:CidPasswState ={
    fileCID: null,
    fileZIP:null,
    password: null,
    fileName: null,
}

// export let keyState_mint: KeyState = {
//     privateKey: '',
//     publicKey: '',
//     sharedKey: '',
// };

const Context = React.createContext<ContextType | null>(null);

export const KeyCidPasswProvider = ({ children }: { children: ReactNode }) => {
    const [cidPasswState, setCidPasswState] = useState<CidPasswState>({
        fileCID: null,
        fileZIP:null,
        password: null,
        // isLoading:false,
        fileName: null,
    });

    const updateCidPasswState = (field: keyof CidPasswState, value: any) => {
        setCidPasswState(prevState => {
            const newState = { ...prevState, [field]: value };
            // 更新let变量
            filePassword_mint = newState;
            return newState;
        });
    };

    // const [keyState, setKeyState] = useState<KeyState>({
    //     privateKey: '',
    //     publicKey: '',
    //     sharedKey: '',
    // });

    // const updateKeyState = (field: keyof KeyState, value: any) => {
    //     setKeyState(prevState => {
    //         const newState = { ...prevState, [field]: value };
    //         keyState_mint = newState;
    //         return newState;
    //     });
    // };

    return (
        <Context.Provider value={{cidPasswState,updateCidPasswState}}>
            {children}
        </Context.Provider>
    );
};

export const useKeyCidPasswContext = () => useContext(Context);