import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import ButtonCust from '../../../../element/ButtonCust';
import { updateCondition } from '../../../../pages/Marketplace/conditionalBar/let';

interface FilterProps {
    text: string;
    useFor: string;
    // onFilterChange: (start: string, end: string) => void; // This is a function that takes two strings as arguments and returns nothing
}

const FilterComponent: React.FC<FilterProps> = ({ text, useFor }) => {
    const [start, setStart] = useState<string | null>(null);
    const [end, setEnd] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);
    const [loading,setLoading] = useState<boolean>(false);

    const handleConfirm = () => {
        // 在这里处理确认按钮的逻辑
        console.log('Start:', start);
        console.log('End:', end);
        // onFilterChange(start, end);
        setLoading(true);
    };

    useEffect(() => {
        if ((start && end && (parseInt(start) >= parseInt(end) || parseInt(start) < 0 || parseInt(end) <= 0))) {
            setIsError(true);
        } else {
            setIsError(false);
            if (useFor === 'filter_id') {
                updateCondition('idData', { start: start, end: end })
            } else if (useFor === 'filter_price') {
                updateCondition('priceData', { start: start, end: end })
            }
        }
    }, [start, end]);

    const handleConfirm_one = () =>{
        
    }


    return (
        <span className={styles.rangeInput}>
            <p> {text}:</p>
            <input
                type={text}
                placeholder="start"
                value={start ?? ''}
                onChange={(e) => setStart(e.target.value)}
                className={styles.input}
            />
            <p> ~ </p>
            <input
                type={text}
                placeholder="end"
                value={end ?? ''}
                onChange={(e) => setEnd(e.target.value)}
                className={styles.input}
            />
            <span onClick={handleConfirm} className={styles.button}>
                <ButtonCust
                    text="Confirm"
                    onClick={handleConfirm_one}
                    isLoading={loading}
                />
            </span>

            {isError && (
                <p className={styles.error}>Start id must be less than end id</p>
            )}
        </span>
    );
};

export default FilterComponent;