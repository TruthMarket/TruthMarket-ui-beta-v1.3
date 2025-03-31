

export interface FormState {
    radio: string,
    infoCID: string,
    tokenURI: string,
    // price: string,
    // publicKey_minter:string;
    // fileCid_iv_user:string,
    // password_iv_user:string,
    // fileCid_user: string,
    // password_user: string,
    // fileCid_iv_office:string,
    // password_iv_office:string,
    // fileCid_office: string,
    // password_office: string,
    // fileCid: string,
}

// export interface SellState {
//     tokenId: string,
//     fileCid: string,
//     password: string,
//     price: string,
//     publicKey_minter:string;
//     privateKey_minter:string;
    // fileCid_iv_office:string,
    // password_iv_office:string,
    // fileCid_office: string,
    // password_office: string,
    
// }

export interface CidPasswState {
    fileCID: string | null;
    fileZIP: Blob | null;
    password: string | null;
    // isLoading:boolean;
    fileName: string | null;
}

export interface MintProgress {
    isLoading:boolean;
    compressIsLoading:boolean;
    upload_FileIsLoading:boolean;
    upload_ImageIsLoading:boolean;
    upload_JsonIsLoading:boolean;
    upload_UrlIsLoading:boolean;
    encryptedIsLoading:boolean;
    mint_NftIsLoading:boolean;

    upload_FileProgress: number;
    upload_ImageProgress: number;
    upload_JsonProgress: number;
    upload_UrlProgress: number;
    // mint_NftProgress: number;
    compressError:string | null,
    upload_FileError: string | null;
    upload_ImageError: string | null;
    upload_JsonError: string | null;
    upload_UrlError: string | null;
    encrypted_Error: string | null,
    mint_NftError: string | null;
    isComplete: boolean;
}

export interface CountryProps {
    value: string; 
    number: string; 
    name: string 
}

export interface BoxInfoState {
    tokenId: string | null;
    typeOfCrime:string | null,
    title: string | null;
    country: string | null;
    state: string | null;
    minter: string | null;
    description: string | null;
    // fileCID: string | null;
    imageCID: string | null;
    createDate: string | null;
    timestamp: string | null;
    eventDate: string | null;
    // eventDateEnd: string | null;
}

// export interface ConditionalStateType {
//     search: string | null;
//     status: string | null;
//     sort: string | null;
//     idData: { start: string | null; end: string | null };
//     priceData: { start: string | null; end: string | null };
//     country: string | null;
//     state: string | null;
//     dateStart:Date | null;
//     dateEnd:Date | null;
// }

export interface KeyState {
    privateKey: string; 
    publicKey: string; 
    sharedKey:string;
    // iv:string;
    // publicKey_office: string; 
}

// export interface FileNameType{
//     fileName:string | null;
// }