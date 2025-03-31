

import React, {useState} from 'react';

import styles from './styles.module.scss';
import { MoreOutlined } from '@ant-design/icons';

interface ButtonConProps {
    text: string;
    onFilterChange: (sortFilter: string) => void; 
}

const SortButton: React.FC<ButtonConProps> = ({ onFilterChange }) => {

    const [showSort, setShowSort] = useState(false);
    const [sort, setSort] = useState('Default');

    const toggleOptions = () => {
        setShowSort(!showSort);
    };

    const handleSortClick = (option: string) => {
        setSort(option);
        setShowSort(false);
        onFilterChange(option);
    };

    // Close the options list when the user clicks outside of it
    window.onblur = () => {
        setShowSort(false);
    };

    return (
        <>
            <button className={styles.sortButton} onClick={toggleOptions} >
                sort: {sort}<MoreOutlined />
            </button>
            {showSort && (
                <ul 
                    className={styles.optionsList}
                >
                    <li onClick={() => handleSortClick('Default')}>Default</li>
                    <li onClick={() => handleSortClick('Recently')}>Recently</li>
                    <li onClick={() => handleSortClick('Farthest')}>Farthest</li>
                    <li onClick={() => handleSortClick('HighToLow')}>HighToLow</li>
                    <li onClick={() => handleSortClick('LowToHigh')}>LowToHigh</li>
                </ul>
            )}
        </>
    );
}

export default SortButton;