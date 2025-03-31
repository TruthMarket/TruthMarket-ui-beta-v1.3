import { BoxStatus, boxStatus } from "../type/contractDate";


// export function boxInfoHanding(data:any, id:number) {
//     const [infoCID, tokenURI, fileCID, password, price, deadline, status] = data // 函数返回值有多个，赋值给数组对象
//     const box = {
//         tokenId: id,
//         infoCID: infoCID.toString(),
//         tokenURI: tokenURI.toString(),
//         fileCID: fileCID.toString(),
//         Password: password.toString(),
//         price: typeof price === 'bigint' ? Number(price) : parseInt(price.toString()),
//         deadline: typeof deadline === 'bigint' ? Number(deadline) : parseInt(deadline.toString()),
//         status: boxStatus[Number(status)] as BoxStatus
//     };

//     return box;
// }

export function boxInfoHanding(data: any, id: number) {
    // 解构数组确保顺序正确
    const [infoCID, tokenURI, fileCID, password, price, deadline, status] = data;
    
    // 添加数据验证和日志
    // console.log("Raw contract data:", data);
    
    const box = {
        tokenId: id,
        infoCID: infoCID?.toString() || "",
        tokenURI: tokenURI?.toString() || "",
        fileCID: fileCID?.toString() || "",
        Password: password?.toString() || "",
        price: typeof price === 'bigint' ? Number(price) : parseInt(price?.toString() || "0"),
        deadline: typeof deadline === 'bigint' ? Number(deadline) : parseInt(deadline?.toString() || "0"),
        status: boxStatus[Number(status)] as BoxStatus
    };

    // console.log("Processed box data:", box);
    return box;
}