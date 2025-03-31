
export interface PermissionType {
    exchange_isPause:boolean,
    other_isPause:boolean,
}

export const boxStatus = [
    'Storing',
    'Selling',
    'Auctioning',
    'Delivering',
    'Refunding',
    'Completed',
    'Published',
] as const;

// export const stateEnum = {
//     0: 'Storing',
//     1: 'Selling',
//     2: 'Auctioning',
//     3: 'Delivering',
//     4: 'Refunding',
//     5: 'Completed',
//     6: 'Published',
// };

export type BoxStatus = typeof boxStatus[number];

// get
export interface BoxInfoType {
    tokenId: number;
    infoCID: string;
    tokenURI: string;
    fileCID: string;
    Password: string;
    price: number;
    deadline: number;
    status: BoxStatus;
}

// NftDetail
export interface NftDetailType {
    tokenId: number;
    fileCID: string;
    password: string;
    title: string;
    image: string;
    country: string;
    state: string;
    description: string,
    createDate: string; 
    eventDate: string;
    price: number;
    deadline: number;
    // overDeadline:boolean,
    // invalidTime:boolean,
    // isBlackTokenId:boolean,
    status: BoxStatus;
    // minter:string,
    // owner:string,
}

// NftDetail_two
export interface NftDetailType_two {
    deliveryTimestamp:number,
    refundRequestTimestamp: number,
    purchaseTimestamp: number,
    overDeadline:boolean,
    isBlackTokenId:boolean,
    refundPermit: boolean,
    inRefundDeadline: boolean,
    inReviewDeadline: boolean,
    minter:string,
    owner:string,
    buyer:string,
    noBuyer: boolean,
    fileUri:string,
}

export const accountRole = [
    'minter',
    'admin',
    'seller',
    'buyer',
    'completer',
    'other',
    undefined,
] as const;

export type RoleType = typeof accountRole[number];