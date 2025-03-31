

import React, { useState } from 'react';
import styles from './index.module.scss';
import { updateCondition } from '../../pages/Marketplace/conditionalBar/let';

// interface SearchProps {
//     onSearchChange: (search: string) => void; // This is a function that takes two strings as arguments and returns nothing
// }

const SearchBox: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term) {
            // 模拟检索相关数据
            const results = ['result1', 'result2', 'result3'].filter(item => item.includes(term));
            setSearchResults(results);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }

        console.log('input:', term);
        updateCondition('search',term);
    };

    const handleSelectResult = (result: string) => {
        setSearchTerm(result);
        updateCondition('search',result);
        setShowResults(false);
    };

    const handleSubmit = () => {
        // onSearchChange(searchTerm);
        // updateCondition('search',searchTerm);
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.search}>
                <input
                    type="search"
                    placeholder="Search..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                    type="submit"
                    className={styles.searchButton}
                    onClick={handleSubmit}
                >🔍</button>
            </div>
            {showResults && (
                <div className={styles.resultsPopup}>
                    {searchResults.map((result, index) => (
                        <div
                            key={index}
                            className={styles.resultItem}
                            onClick={() => handleSelectResult(result)}
                        >
                            {result}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBox;