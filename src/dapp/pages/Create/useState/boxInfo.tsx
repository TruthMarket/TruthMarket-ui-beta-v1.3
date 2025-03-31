import React,{ 
    // createContext,
    useContext, 
    useState,
    ReactNode,
    // useEffect,
} from 'react';
// import { useJsonState } from '../useState/boxInfoState';
import { BoxInfoState } from './stateType';
// import { AddTime } from '../utils/addTime';

interface ContextType {
    boxInfoState: BoxInfoState;
    updateBoxInfo : (field: keyof BoxInfoState, value: any) => void;
}

export let boxInfo:BoxInfoState = {
    tokenId:null,
    typeOfCrime:null,
    title: null,
    country: null,
    state: null,
    minter: null,
    description: null,
    // fileCID: null,
    imageCID: null,
    createDate: null,
    timestamp: null,
    eventDate: null,
}
const Context = React.createContext<ContextType | null>(null);

export const BoxInfoProvider = ({ children }: { children: ReactNode }) => {
    const [boxInfoState, setBoxInfo] = useState<BoxInfoState>(boxInfo);

    const updateBoxInfo = (field: keyof BoxInfoState, value: any) => {
        setBoxInfo(prevState => {
            const newData = { ...prevState, [field]: value };
            boxInfo = newData;
            // console.log('newJson:',boxInfo)
            return newData;
        });
    };

    // useEffect(() => {
    //     console.log('title:', boxInfoState.title);
    // }, [

    //     boxInfoState.title,
    // ]);

    return (
        <Context.Provider value={{boxInfoState, updateBoxInfo}}>
            {children}
        </Context.Provider>
    );
};

export const useBoxInfoContext = () => useContext(Context);
