import styles from '../styles.module.scss';
//导入assets中的图片
import { useNftListContext } from '../../../dappContext/nftList';
import { useNftDetailContext } from '../useState/nftDetail';
// import { NftDetailType } from '../../../type/contractDate';
import {
    useEffect,
    // useContext,
} from 'react';
// import { ContractContext } from '../../../context';
import { useUpdateNftTwo } from '../hooks/useUpdateNftTwo';
import { useFilterRole } from '../hooks/useFilterRole';
import { feeToken_State } from '../../../useState/state_feeToken';
import { useAccount } from 'wagmi';
// import { purchaseTime,requestRefundTime ,inRefundTime,inReviewRefundDeadline} from "../../../useReadWrite/exchange/readExchange";
// import { useGetNftDetail_two } from '../../../hooks/useGetNftDetail_two';

interface Props {
    tokenId: number;
}

const ContentLeft: React.FC<Props> = ({ tokenId }) => {
    // const [nftDetail, setNft] = useState<NftDetailType | undefined>();
    // const { getNftDetail_two } = useGetNftDetail_two();
    const { updateNftTwo } = useUpdateNftTwo();
    const { nftList } = useNftListContext() || {};
    const {
        nftDetail,
        updateNftDetail,
        updateNftKey,
        nftDetail_two,
        updateNftDetail_two
    } = useNftDetailContext() || {};
    const { address } = useAccount();
    const { filterRole } = useFilterRole();

    useEffect(() => {
        const fetch = async () => {
            await filterRole(tokenId);
        }
        fetch()
    }, [address])

    useEffect(() => {
        const fatch = () => {
            if (
                nftDetail?.status !== 'Storing' &&
                nftDetail?.status !== 'Published' &&
                nftDetail?.status !== 'Completed'
            ) {
                // 更新数据,检查一下是否过期
                updateNftTwo(tokenId,'check');
            }
        }
        fatch();
    }, [])

    useEffect(() => {
        if (nftList) {
            const foundNft = nftList.find(item => item.tokenId === tokenId);
            if (foundNft) {
                updateNftDetail?.(foundNft);
                const price = foundNft.price / (10 ** feeToken_State.decimals);
                updateNftKey?.('price', price);
                updateNftDetail_two?.('overDeadline', Date.now() > foundNft.deadline * 1000);
                // updateNftDetail_two?.('invalidTime', Date.now() > (foundNft.deadline + 60*60*24*4)* 1000);
            }
        }
    }, [nftList]);

    if (!nftDetail || !nftDetail_two) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.left}>
            <span className={styles.idBar}>
                <p>tokenId: </p>
                <p className={styles.idNumber}>{nftDetail.tokenId}</p>
            </span>

            <span className={styles.imageBar}>
                <img src={nftDetail.image} alt="NFT image" />
            </span>
            <p className={styles.titleBar}>{nftDetail.title}</p>
            <span className={styles.countryBar}>
                <span className={styles.country}>
                    <p>{nftDetail.country}</p>
                    <p>{nftDetail.state}</p>
                </span>
                <p className={styles.theTime}>{nftDetail.eventDate}</p>
            </span>
            <p className={styles.introduceBar}>{nftDetail.description}</p>
            <span className={styles.ownerTime}>
                <p>Minter: {nftDetail_two.minter}</p>
                <p>Owner: {nftDetail_two.owner}</p>
                <p>Create date: {nftDetail.createDate}</p>
            </span>

        </div>
    );
}

export default ContentLeft;