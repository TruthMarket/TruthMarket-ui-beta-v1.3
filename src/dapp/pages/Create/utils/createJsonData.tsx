

interface NftData {
    typeOfCrime:string,
    title:string,
    country:string,
    state:string,
    eventDate:string,
    minter:string,
    createDate:string,
}

export const CreateJsonData = (obj: object): NftData => {
    const {
        typeOfCrime,
        title,
        country,
        state,
        eventDate,
        minter,
        createDate
    } = obj as any;

    const Result: NftData = {
        typeOfCrime,
        title,
        country,
        state,
        eventDate,
        minter,
        createDate
    };


    return Result; 
}