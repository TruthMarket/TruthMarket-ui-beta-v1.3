

export interface SellState {
    tokenId: string,
    fileCid: string,
    password: string,
    price: string,
    publicKey_minter:string;
    privateKey_minter:string;
    // fileCid_iv_office:string,
    // password_iv_office:string,
    // fileCid_office: string,
    // password_office: string,
    
}

export interface BuyState {
    tokenId: string,
    fileCid: string,
    password: string,
    price: string,
    publicKey_buyer:string;
    privateKey_buyer:string;
    
}