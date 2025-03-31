import React, { useState, useEffect } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import styles from './styles.module.scss';
import './index.css';
import theworldData from './theworld.json';
import { useBoxInfoContext } from '../../pages/Create/useState/boxInfo';
import { updateCondition } from '../../pages/Marketplace/conditionalBar/let';

// import { count } from 'console';
/*
{
    "AF": {
        "name": "Afghanistan",
        "codes": {
            "phone": "93"
        },
        "states": {
            "BDS": {
                "name": "Badakhshan"
            },
            "BDG": {
                "name": "Badghis"
            },
            "BGL": {
                "name": "Baghlan"
            },
            "BAL": {
                "name": "Balkh"
            }
        }
    },
    ...
}
*/

const customStyles: StylesConfig<OptionType, false> = {
    control: (provided, state) => ({
        ...provided,
        fontSize: '12px', 
        backgroundColor: '#181827', 
        border: '1px solid #6e6e6e', 
        height: '20px', 
        minHeight: '35px', 
        borderColor: state.isFocused ? '#4912c7' : '#6e6e6e',
        boxShadow: state.isFocused ? '0 0 0 1px #4912c7' : 'none',
        '&:hover': {
            borderColor: state.isFocused ? '#4912c7' : '#6e6e6e',
        },
        // '&:active': {
        //     borderColor: state.isFocused ? '#4912c7' : '#4912c7', 
        // },
    }),
    option: (provided) => ({
        ...provided,
        fontSize: '12px', 
        backgroundColor: '#2b2d47', 
        color: '#b3b3b3', 
        '&:hover': {
            backgroundColor: '#1e1f33',
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#2b2d47',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
    }),
    // noOptionsMessage: (provided) => ({
    //     ...provided,
    //     backgroundColor: '#2b2d47',
    //     color: '#b3b3b3',
    // }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: '12px', 
        color: '#d4d4d4', 
    }),
};

interface State {
    name: string;
}

interface Country {
    name: string;
    codes: {
        phone: string;
    };
    states: {
        [key: string]: State;
    };
}

interface WorldData {
    [key: string]: Country;
}

interface OptionType {
    value: string;
    number: string;
    name: string;
    label: string;
}

// interface CountryProps {
//     value: string; 
//     number: string; 
//     name: string 
// }

interface CountrySelectorProps {
    // onCountryChange: (
    //     // country: { value: string; number: string; name: string }, 
    //     // state: { value: string; number: string; name: string}
    //     country: CountryProps,
    //     state: CountryProps
    // ) => void;

    useFor: string,
}

const theworld: WorldData = theworldData as WorldData;

const CountrySelector: React.FC<CountrySelectorProps> = ({useFor}) => {
    const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(null);
    const [selectedState, setSelectedState] = useState<OptionType | null>(null);
    const [states, setStates] = useState<{ [key: string]: State }>({});

    const {updateBoxInfo} = useBoxInfoContext()||{};

    // const [country, setCountry] = useState<OutputType >({value: '', number: '', name: ''});
    // const [state, setState] = useState<OutputType >({value: '', number: '', name: ''});

    const handleCountryChange = (selectedOption: SingleValue<OptionType>) => {

        setSelectedCountry(selectedOption);
        setSelectedState(null);
        if (selectedOption && theworld[selectedOption.value]) {
            setStates(theworld[selectedOption.value].states);
        } else {
            setStates({});
        }
    };

    const handleStateChange = (selectedOption: SingleValue<OptionType>) => {
        setSelectedState(selectedOption);
    };

    useEffect(() => {
        // console.log(selectedCountry, selectedState);
        if (selectedCountry) {
            // onCountryChange({
            //     value: selectedCountry?.value || '', 
            //     number: selectedCountry?.number || '', 
            //     name: selectedCountry?.name || ''
            // }, {
            //     value: selectedState?.value || '', 
            //     number: selectedState?.number || '', 
            //     name: selectedState?.name || ''
            // });
            if (useFor === 'mint') {
                updateBoxInfo?.(
                    'country', selectedCountry?.name || '');
                updateBoxInfo?.(
                    'state',selectedState?.name || '');
            } else if (useFor === 'filter') {
                updateCondition(
                    'country', selectedCountry?.name || '');
                updateCondition(
                    'state',selectedState?.name || '');
            }
        }
        
    }, [selectedCountry, selectedState]);

    const countryOptions: OptionType[] = Object.keys(theworld).map((countryCode) => ({
        value: countryCode, 
        number: theworld[countryCode].codes.phone,
        name: theworld[countryCode].name,
        label: `${theworld[countryCode].codes.phone} ${theworld[countryCode].name} (${countryCode})`
    }));

    const stateOptions: OptionType[] = Object.keys(states).map((stateCode) => ({
        value: stateCode,
        number: '',
        name: states[stateCode].name,
        label: `${states[stateCode].name} (${stateCode})`
    }));

    return (
        <div className={styles.countrySelector}>
            <div className={styles.country}>
                <Select
                    id="country"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryOptions}
                    placeholder="Select a country"
                    isClearable 
                    styles={customStyles}
                    classNamePrefix="react-select"
                />
            </div>
            
            <div className={styles.state}>
                <Select
                    id = "state"
                    value={selectedState}
                    onChange={handleStateChange}
                    options={stateOptions}
                    placeholder="Select a state"
                    isClearable 
                    styles={customStyles}
                    classNamePrefix="react-select" // 为了避免样式冲突，给每个 Select 组件添加一个前缀
                
                />
            </div>
            
        </div>
    );
};

export default CountrySelector;