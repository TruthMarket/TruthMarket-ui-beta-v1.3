import  { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from './styles.module.scss';
import Logo from '../../../../public/logo-icon.svg'; 
import {Connect} from '../../context/useAccount/connectButton';


const Header: FC = () => {
    const [nowLink, setNowLink] = useState<string>('marketplace');
    const navigate = useNavigate(); 

    const handleLinkClick = (link: string) => {
        setNowLink(link);
        // console.log(nowLink);
    };

    const handleLaunchAppClick = () => {
        navigate('/app');
    };

    return (
        <header className={styles.article}>
            <div className={styles.nav}>
                <div className={styles.logo} onClick={handleLaunchAppClick}>
                    <img src={Logo} alt="Logo" />
                    <span>
                        <p className={styles.title01}>Truth</p>
                        <p className={styles.title02}>Market</p>
                    </span>
                </div>
                <nav className={styles.links}>
                    <Link
                        to="/app"
                        className={`${styles.link} ${nowLink === 'marketplace' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('marketplace')}
                    >
                        MARKETPLACE
                    </Link>
                    <Link
                        to="/app/create"
                        className={`${styles.link} ${nowLink === 'create' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('create')}
                    >
                        CREATE
                    </Link>
                    <Link
                        to="/app/staking"
                        className={`${styles.link} ${nowLink === 'staking' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('staking')}
                    >
                        STAKING
                    </Link>
                    <Link
                        to="/app/dao"
                        className={`${styles.link} ${nowLink === 'dao' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('dao')}
                    >
                        DAO
                    </Link>
                    <Link
                        to="/app/token"
                        className={`${styles.link} ${nowLink === 'token' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('token')}
                    >
                        TOKEN
                    </Link>
                    <Link
                        to="/app/profile"
                        className={`${styles.link} ${nowLink === 'profile' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('profile')}
                    >
                        PROFILE
                    </Link>

                </nav>
                <div className={styles.connect}>
                    <Connect/>
                </div>
                
                {/* <button className={styles.button} onClick={handleLaunchAppClick}>
                    
                </button> */}
            </div>
        </header>
    );
}

export default Header;