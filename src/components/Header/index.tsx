import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { MenuOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import Logo from '../../../public/logo-icon.svg'; 

const Header: FC = () => {
    const [nowLink, setNowLink] = useState<string>('home');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate(); 

    const handleLinkClick = (link: string) => {
        setNowLink(link);
        setIsMenuOpen(false);
    };

    const handleLaunchAppClick = () => {
        navigate('/app');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.article}>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <img src={Logo} alt="Logo" />
                    <span className={styles.logoText}>
                        <p className={styles.title01}>Truth</p>
                        <p className={styles.title02}>Market</p>
                    </span>
                </div>

                {/* 移动端菜单按钮 */}
                <button className={styles.menuButton} onClick={toggleMenu}>
                    <MenuOutlined />
                </button>

                {/* 导航链接 */}
                <nav className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
                    <Link
                        to="/"
                        className={`${styles.link} ${nowLink === 'home' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('home')}
                    >
                        HOME
                    </Link>
                    <Link
                        to="/value"
                        className={`${styles.link} ${nowLink === 'value' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('value')}
                    >
                        VALUE
                    </Link>
                    <Link
                        to="/story"
                        className={`${styles.link} ${nowLink === 'story' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('story')}
                    >
                        STORY
                    </Link>
                    <Link
                        to="/case"
                        className={`${styles.link} ${nowLink === 'case' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('case')}
                    >
                        CASE
                    </Link>
                    <Link
                        to="/team"
                        className={`${styles.link} ${nowLink === 'team' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('team')}
                    >
                        TEAM
                    </Link>
                    <Link
                        to="/whitepaper"
                        className={`${styles.link} ${nowLink === 'whitepaper' ? styles.now : ''}`}
                        onClick={() => handleLinkClick('whitepaper')}
                    >
                        WHITEPAPER
                    </Link>
                </nav>

                <button className={styles.button} onClick={handleLaunchAppClick}>
                    <span className={styles.buttonText}>Launch App</span>
                    <span className={styles.buttonTextMobile}>App</span>
                </button>
            </div>
        </header>
    );
}

export default Header;