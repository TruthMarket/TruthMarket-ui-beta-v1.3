import React, { useState } from 'react';
import styles from './styles.module.scss';
import FilterComponent from './Filter';
import CountrySelector from '../../../components/CountrySelector';
import DataSelector from '../../../components/DateSelector';
import ButtonCust from '../../../element/ButtonCust';
import SearchBox from '../../../components/SearchBox';

import { updateCondition } from './let';

const ConditionalBar: React.FC = () => {

    const [loading,setLoading] = useState<boolean>(false);
    const [sort,setSort] = useState('Default');
    const [status,setStatus] = useState('');
    
    const changeSort = (value: string) =>{
        updateCondition('sort',value);
        setSort(value);
    }

    const changeStatus = (value: string) =>{
        updateCondition('status',value);
        setStatus(value);
    }

    const handleConfirm_two = () =>{
        setLoading(true)
    }

    return (

        <div className={styles.conditionalBar}>
            <span className={styles.searchBar}>
                <SearchBox />
                <div className={styles.filterSelector}>
                    <FilterComponent text='id' useFor = {'filter_id'}/>
                    <FilterComponent text='price' useFor = {'filter_price'}/>
                </div>
                <div className={styles.sort}>
                    <select
                        value={sort}
                        onChange={(e) => changeSort(e.target.value)}
                        className={styles.selectSort}
                    >
                        <option value="Default">Sort:Default</option>
                        <option value="Recently">Recently</option>
                        <option value="Farthest">Farthest</option>
                        <option value="LowToHigh">LowToHigh</option>
                        <option value="HighToLow">HighToLow</option>
                    </select>
                </div>
            </span>
            <span className={styles.filterBar}>
                <span className={styles.filter}>
                    <CountrySelector useFor='filter' />
                    <select
                        value={status}
                        onChange={(e) => changeStatus(e.target.value)}
                        className={styles.select}
                    >
                        <option value="">Status</option>
                        <option value="Storing">Storing</option>
                        <option value="Selling">Selling</option>
                        <option value="Auctioning">Auctioning</option>
                        <option value="Delivering">Delivering</option>
                        <option value="Refunding">Refunding</option>
                        <option value="Completed">Completed</option>
                        <option value="Published">Published</option>
                    </select>
                    <DataSelector useFor = {'filter'}/>
                    <ButtonCust 
                        text="Confirm"
                        onClick={handleConfirm_two}
                        isLoading={loading} 
                    />
                </span>
                <span className={styles.filterResult}>
                    <p>counts:</p>
                    <p>895</p>
                </span>
            </span>
        </div>

    );
};

export default ConditionalBar;
