// import styles from './styles.module.scss';
import "./index.css"
//导入assets中的图片

interface Props {
    text: string;
    useFor: string;
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean;
}

const Button: React.FC<Props> = ({ text, useFor, onClick, isLoading, disabled }) => {

    let buttonClass;
    if (disabled) {
        buttonClass = "buttonDis";
    } else if (useFor === 'one') {
        buttonClass = "buttonOne";
    } else if (useFor === 'two') {
        buttonClass = "buttonTwo";
    } 

    return (
        <>
            {/* <button className="buttonDetail">
                <span className="buttonSpan">{text}</span>
            </button> */}
            {/* className={`${styles.button} ${styles[useFor]} ${isLoading ? styles.loading : ''} */}
            <button
            
                className={buttonClass}
                onClick={onClick}
                disabled={disabled || isLoading}
            >
                {isLoading ? 'wait...' : text}
            </button>
        </>
    );
}

export default Button;