// 这是一个传入ifps的CID参数，然后返回一个可访问的url的功能函数
export const ipfsCidToUrl = (cid: string): string => {
    // 这里使用一个公共的IPFS网关
    return `https://ipfs.io/ipfs/${cid}`;
};

// bafkreiahsv2jpbv3pw3kcppcu76e47pzirf5nnukogue2bjrdbfngevkcm
// https://bafkreiahsv2jpbv3pw3kcppcu76e47pzirf5nnukogue2bjrdbfngevkcm.ipfs.flk-ipfs.xyz
// https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq