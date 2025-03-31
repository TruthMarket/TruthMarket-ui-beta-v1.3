import { BoxInfoType, NftDetailType } from "../type/contractDate";
import { ipfsCidToUrl } from "./ipfsCidToUrl";
// import { feeToken_State } from "../useState/state_feeToken";

// bafkreiahsv2jpbv3pw3kcppcu76e47pzirf5nnukogue2bjrdbfngevkcm
// https://bafkreiahsv2jpbv3pw3kcppcu76e47pzirf5nnukogue2bjrdbfngevkcm.ipfs.flk-ipfs.xyz
export const processBoxInfo = async (boxInfo: BoxInfoType): Promise<NftDetailType | null> => {
    
    try {
        const infoUrl = ipfsCidToUrl(boxInfo.infoCID);
        // console.log('processing infoUrl:', infoUrl)
        const infoResponse = await fetch(infoUrl);
        const infoData = await infoResponse.json();

        const imageUrl = ipfsCidToUrl(infoData.imageCID);

        // "https://bafkreidtb2ueqxygbpa7h6my4qrd3cx6hr4alrgphhein4x2l3uac4dlea.ipfs.flk-ipfs.xyz"


        return {
            tokenId: boxInfo.tokenId,
            fileCID:boxInfo.fileCID,
            password:boxInfo.Password,
            title: infoData.title,
            country: infoData.country,
            state: infoData.state,
            description: infoData.description,
            createDate: infoData.createDate,
            image: imageUrl,
            eventDate: infoData.eventDate,
            price: boxInfo.price,
            deadline: boxInfo.deadline,
            status: boxInfo.status,
        };
    } catch (error) {
        console.error(`Error processing box info:`, error);
        return null;
    }
};
