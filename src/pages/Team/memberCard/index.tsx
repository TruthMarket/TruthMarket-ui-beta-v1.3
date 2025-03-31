import { FC } from 'react';
import styles from './styles.module.scss';

interface MemberCardProps {
    image: string;
    name: string;
    position: string;
}

const MemberCard: FC<MemberCardProps> = ({ image, name, position }) => {
    return (
        <div className={styles.info}>
            <img src={image} alt={name} />
            <p className={styles.name}>{name}</p>
            <p className={styles.position}>{position}</p>
        </div>
    );
};

export default MemberCard;
