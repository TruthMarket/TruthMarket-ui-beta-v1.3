import { FC, useState } from 'react';
import styles from './styles.module.scss';

interface DisplayImgProps {
    images: string[];  // 图片URL数组
}

const DisplayImg: FC<DisplayImgProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (!images || images.length === 0) {
        return <div className={styles.noImage}>No image...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <img
                    src={images[currentIndex]}
                    alt={`img ${currentIndex + 1}`}
                    className={styles.image}
                />
            </div>

            <div className={styles.controls}>
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={styles.button}
                >
                    Previous Page
                </button>
                <span className={styles.pageInfo}>
                    {currentIndex + 1} / {images.length}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentIndex === images.length - 1}
                    className={styles.button}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default DisplayImg;
