import { FC, useState } from 'react';
import DisplayImg from '../DisplayImg';
import styles from './styles.module.scss';
import classNames from 'classnames';  
// list1
import img1_1 from '../../../assets/case/1/1.jpg';
import img1_2 from '../../../assets/case/1/2.jpg';
import img1_3 from '../../../assets/case/1/3.jpg';
import img1_4 from '../../../assets/case/1/4.jpg';
import img1_5 from '../../../assets/case/1/5.jpg';
import img1_6 from '../../../assets/case/1/6.jpg';
import img1_7 from '../../../assets/case/1/7.jpg';
import img1_8 from '../../../assets/case/1/8.jpg';
import img1_9 from '../../../assets/case/1/9.jpg';
import img1_10 from '../../../assets/case/1/10.jpg';
import img1_11 from '../../../assets/case/1/11.jpg';
// list2
import img2_1 from '../../../assets/case/2/1.jpg';
import img2_2 from '../../../assets/case/2/2.jpg';
import img2_3 from '../../../assets/case/2/3.jpg';
import img2_4 from '../../../assets/case/2/4.jpg';
import img2_5 from '../../../assets/case/2/5.jpg';
import img2_6 from '../../../assets/case/2/6.jpg';
import img2_7 from '../../../assets/case/2/7.jpg';
import img2_8 from '../../../assets/case/2/8.jpg';
import img2_9 from '../../../assets/case/2/9.jpg';
import img2_10 from '../../../assets/case/2/10.jpg';
import img2_11 from '../../../assets/case/2/11.jpg';
import img2_12 from '../../../assets/case/2/12.jpg';
import img2_13 from '../../../assets/case/2/13.jpg';
import img2_14 from '../../../assets/case/2/14.jpg';
import img2_15 from '../../../assets/case/2/15.jpg';


const imageList1 = [img1_1, img1_2, img1_3, img1_4, img1_5, img1_6, img1_7, img1_8, img1_9, img1_10, img1_11];
const imageList2 = [img2_1, img2_2, img2_3, img2_4, img2_5, img2_6, img2_7, img2_8, img2_9, img2_10, img2_11, img2_12, img2_13, img2_14, img2_15];

const ToggleDisplay: FC = () => {
    const [currentList, setCurrentList] = useState<string[]>(imageList1);

    return (
        <div className={styles.container}>
            <div className={styles.buttonGroup}>
                <button
                    onClick={() => setCurrentList(imageList1)}
                    className={classNames(
                        styles.button,
                        currentList === imageList1 ? styles.active : styles.inactive
                    )}
                >
                    "Overheard 2"
                </button>
                <button
                    onClick={() => setCurrentList(imageList2)}
                    className={classNames(
                        styles.button,
                        currentList === imageList2 ? styles.active : styles.inactive
                    )}
                >
                    "Inside Men"
                </button>
            </div>
            
            <DisplayImg 
                key={currentList === imageList1 ? 'list1' : 'list2'} 
                images={currentList} 
            />
        </div>
    );
};

export default ToggleDisplay;