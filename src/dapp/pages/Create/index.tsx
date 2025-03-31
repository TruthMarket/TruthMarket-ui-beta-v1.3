// import { 
//     useRef, 
//     useState, 
//     useEffect 
// } from 'react';
import styles from './styles.module.scss';
import CountrySelector from '../../components/CountrySelector';
import DateSelector2 from './components/DateSelector/dateSelector2';
import InputArea from './components/InputArea';
import RadioApp from './components/RadioApp';
import ImageUpload from './components/ImageUpload';
import FileUpload from './components/FileUpload';
import "../../css/text.css";
import { InputTitle } from './components/InputTitle';
// import { InputPrice } from './components/InputPrice';
import { InputTypeOfCrime } from './components/TypeOfCrime';
// import { jsonState } from '../../useState/jsonState';
import { CreateButton } from './createButton';
import { FileImageProvider } from './useState/fileImage';
import { BoxInfoProvider } from './useState/boxInfo';
import { NftFormProvider } from './useState/nftForm';
import { ProgressProvider } from './useState/progress';
import { KeyCidPasswProvider } from './useState/keyCidPassword';
import { CheckAccount } from './checkAccount';
import { PublicKey_office } from '../../useReadWrite/encryptionStorage/readEncrypt';
import { useEffect, useState } from 'react';
import { encryptionState } from '../../useState/state_encryptionStorage';
// import { useSingleOutput_nftBox } from '../../function_gitter/nftBox/singleOutput';
// import { feeToken_State } from '../../useState/state_feeToken';

function Create() {
    const [key, setKey] = useState<boolean>(false);
    const publicKey_office = PublicKey_office(1);

    useEffect(() => {
        if (publicKey_office === encryptionState.publicKey_office) {
            // console.log('key right!');
            setKey(true);
        }
    }, [publicKey_office])

    return (
        <>
            <FileImageProvider>
                <BoxInfoProvider>
                    <ProgressProvider>
                        <KeyCidPasswProvider>
                            <NftFormProvider>
                                <div className={styles.home}>
                                    <div className={styles.container}>
                                        <div className={styles.first}>
                                            <h3>
                                                The anonymity and security provided by Web 3.0 are advantages that no other storage method possesses.
                                            </h3>
                                        </div>

                                        <div className={styles.second}>
                                            <div className={styles.content}>
                                                <div className={styles.checkBar}>
                                                    <CheckAccount />
                                                </div>
                                                {/* Add type of crime */}
                                                <div className={styles.typeBar}>
                                                    <p className={styles.formLabel}>Type:</p>
                                                    <span className={styles.inputType}>
                                                        <InputTypeOfCrime />
                                                        <p className='illustrate'>Must be between 1 and 20 characters</p>
                                                    </span>
                                                    <p className='example'>For example: Modular.</p>
                                                </div>
                                                
                                                <div className={styles.titleBar}>
                                                    <p className={styles.formLabel}>Title:</p>
                                                    <span className={styles.inputTitle}>
                                                        <InputTitle />
                                                        <p className='illustrate'>Must be between 40 and 150 characters</p>
                                                    </span>
                                                </div>

                                                <div className={styles.countryBar}>
                                                    <p className={styles.formLabel}>Country:</p>
                                                    <CountrySelector useFor='mint' />

                                                </div>
                                                <div className={styles.dateBar}>
                                                    <p className={styles.formLabel}>EventDate:</p>
                                                    <DateSelector2 useFor='mint' />

                                                </div>
                                                <div className={styles.introduceBar}>
                                                    <p className={styles.formLabel}>Introduce:</p>
                                                    <InputArea />

                                                </div>
                                                <div className={styles.imageBar}>
                                                    <p className={styles.formLabel}>Image:</p>
                                                    <ImageUpload />
                                                </div>
                                                <div className={styles.modeBar}>
                                                    <p className={styles.formLabel}>Mode:</p>
                                                    <RadioApp />
                                                </div>
                                                {/* <div className={styles.priceBar}>
                                                    <p className={styles.formLabel}>Price:</p>
                                                    <span className={styles.inputPrice}>
                                                        <InputPrice />
                                                    </span>
                                                    <p className={styles.tokenSymbol}>{feeToken_State.symbol}</p>
                                                </div> */}

                                                <div className={styles.fileBar}>
                                                    <p className={styles.formLabel}>File:</p>
                                                    <FileUpload />
                                                </div>
                                                <div>
                                                    <p className='illustrate'>Since it is currently a beta version, you can only upload files no larger than 5MB.</p>
                                                </div>

                                            </div>
                                            <div className={styles.horizontalLine}></div>

                                            <div className={styles.createButton}>
                                                {!key ? (
                                                    <p style={{ color: 'yellow' }}>
                                                        Error: can`t get the publicKey_office, please check the network!
                                                    </p>
                                                ) : (
                                                    <CreateButton />

                                                )}
                                            </div>
                                            {/* <p>{publicKey_office}</p> */}
                                        </div>

                                        <div className={styles.third}>

                                        </div>
                                    </div>
                                </div>
                            </NftFormProvider>
                        </KeyCidPasswProvider>
                    </ProgressProvider>
                </BoxInfoProvider>
            </FileImageProvider>
        </>

    );
}

export default Create;