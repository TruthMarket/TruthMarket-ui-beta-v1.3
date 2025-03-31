
import { useRoleContext } from '../useState/roleContext/RoleContext';
// import { usePermissionContext } from '../useState/permission/PermissionContext';
import { useNftDetailContext } from '../useState/nftDetail';

export const useButtonDisabled = (tokenId?: number) => {

  console.log('current_tokenId:', tokenId);
  const { userRole } = useRoleContext() || {};
  // const { permission } = usePermissionContext() || {};
  const { nftDetail, nftDetail_two } = useNftDetailContext() || {};


  const overDeadline = nftDetail_two?.overDeadline;
  const isBlackListed = nftDetail_two?.isBlackTokenId;
  // const noFileCID = nftDetail?.fileCID === '';
  const status = nftDetail?.status;

  // const noBuyer = nftDetail_two?.noBuyer || true;
  const purchaseTime = nftDetail_two?.purchaseTimestamp || 0;
  const deliverTime = nftDetail_two?.deliveryTimestamp || 0;
  const refundTimestamp = nftDetail_two?.refundRequestTimestamp || 0;
  const inRefundDeadline = nftDetail_two?.inRefundDeadline || false;
  const refundPermit = nftDetail_two?.refundPermit || false;
  const inReviewDeadline = nftDetail_two?.inReviewDeadline || false;
  // 超过这个时间，buyer可以直接发货
  const inDeliverDeadline = (deliverTime + 3 * 24 * 60 * 60) * 1000 > Date.now()
  // console.log(' Date.now():', Date.now()); 
  const isMinter = userRole === 'minter';
  const isAdmin = userRole === 'admin';
  const isBuyer = userRole === 'buyer';
  // const isOther = userRole === 'other';
  const isUnRole = userRole === undefined;

  const noBuyer = nftDetail_two?.noBuyer;

  return {
    sellDisabled: (activeButton: string | null) =>
      isBlackListed ||
      activeButton !== null && activeButton !== 'Sell' ||
      status !== 'Storing' ||
      isUnRole ||
      !isMinter,

    auctionDisabled: (activeButton: string | null) =>
      isBlackListed ||
      activeButton !== null && activeButton !== 'Auction' ||
      status !== 'Storing' ||
      isUnRole ||
      !isMinter,

    extendDisabled: (activeButton: string | null) =>
      isBlackListed ||
      activeButton !== null && activeButton !== 'Extend' ||
      !isMinter ||
      overDeadline ||
      isUnRole ||
      status !== 'Storing',

    purchaseDisabled: (activeButton: string | null) =>
      isBlackListed ||
      purchaseTime !== 0 ||
      activeButton !== null && activeButton !== 'Purchase' ||
      status !== 'Selling' ||
      isUnRole ||
      // !noBuyer ||
      isMinter,

    bidDisabled: (activeButton: string | null) =>
      isBlackListed ||
      activeButton !== null && activeButton !== 'Bid' ||
      status !== 'Auctioning' ||
      isMinter ||
      isBuyer ||
      isUnRole ||
      overDeadline,

    deliverSellDisabled: (activeButton: string | null) =>
      isBlackListed ||
      purchaseTime === 0 ||
      deliverTime !== 0 ||
      activeButton !== null && activeButton !== 'Deliver' ||
      status !== 'Selling' ||
      isUnRole ||
      (!isMinter && !isAdmin && !inDeliverDeadline),

    deliverAuctionDisabled: (activeButton: string | null) =>
      isBlackListed ||
      purchaseTime === 0 ||
      deliverTime !== 0 ||
      activeButton !== null && activeButton !== 'Deliver' ||
      (status === 'Auctioning' && !overDeadline) ||
      isUnRole ||
      (!isMinter && !isAdmin && !inDeliverDeadline),

    cancelRefundDisabled: (activeButton: string | null) =>
      isBlackListed ||
      refundPermit ||
      refundTimestamp === 0 ||
      activeButton !== null && activeButton !== 'Cancel' ||
      status !== 'Refunding' ||
      isUnRole ||
      !isBuyer,

    agreeRefundDisabled: (activeButton: string | null) =>
      isBlackListed ||
      refundPermit ||
      refundTimestamp === 0 ||
      activeButton !== null && activeButton !== 'Agree' ||
      status !== 'Refunding' ||
      isUnRole ||
      (!isAdmin && !isMinter && inReviewDeadline),

    refuseRefundDisabled: (activeButton: string | null) =>
      isBlackListed ||
      refundPermit ||
      refundTimestamp === 0 ||
      activeButton !== null && activeButton !== 'Refuse' ||
      status !== 'Refunding' ||
      isUnRole ||
      !isAdmin,

    completeDisabled: (activeButton: string | null) =>
      isBlackListed ||
      refundTimestamp !==0 ||
      refundPermit ||
      activeButton !== null && activeButton !== 'Complete' ||
      status !== 'Delivering' ||
      isUnRole ||
      (!isBuyer && inRefundDeadline),

    requestRefundDisabled: (activeButton: string | null) =>
      isBlackListed ||
      refundPermit ||
      !inRefundDeadline ||
      refundTimestamp > 0 ||
      activeButton !== null && activeButton !== 'Refund' ||
      status !== 'Delivering' ||
      !isBuyer,

    secretDisabled: (activeButton: string | null) =>
      isBlackListed ||
      activeButton !== null && activeButton !== 'PayConfiFee' ||
      status !== 'Completed' ||
      !isBuyer ||
      isUnRole ||
      overDeadline,

    publicStoringDisabled: (activeButton: string | null) =>
      isBlackListed ||
      activeButton !== null && activeButton !== 'Published' ||
      isUnRole ||
      status !== 'Storing' ||
      !isMinter,

    publicNobuyerDisabled: (activeButton: string | null) =>
      isBlackListed ||
      purchaseTime !== 0 ||
      activeButton !== null && activeButton !== 'Published' ||
      isUnRole ||
      !noBuyer ||
      (status !== 'Selling' && status !== 'Auctioning') ||
      !overDeadline,

    publicCompletedDisabled: (activeButton: string | null) =>
      isBlackListed ||
      activeButton !== null && activeButton !== 'Published' ||
      isUnRole ||
      status !== 'Completed' ||
      (!isBuyer && !overDeadline),

    // invalidDisabled: (activeButton: string | null) =>
    //   isBlackListed ||
    //   activeButton !== null && activeButton !== 'Invalid' ||
    //   status !== 'Published' ||
    //   noFileCID ||
    //   isUnRole ||
    //   !overDeadline,

    // burnDisabled: (activeButton: string | null) =>
    //   isBlackListed ||
    //   activeButton !== null && activeButton !== 'Burn' ||
    //   isUnRole,

    // cidPasswDisabled: (activeButton: string | null) =>
    //   isBlackListed ||
    //   activeButton !== null && activeButton !== 'CidPassw' ||
    //   status !== 'Published' ||
    //   !noFileCID ||
    //   isUnRole ||
    //   (!isMinter && !isAdmin),

    // viewDataDisabled_minter: (activeButton: string | null) =>
    //   isBlackListed ||
    //   activeButton !== null && activeButton !== 'ViewData' ||
    //   !noFileCID ||
    //   isUnRole ||
    //   !isMinter,

    // viewDataDisabled_delivered: (activeButton: string | null) =>
    //   isBlackListed ||
    //   activeButton !== null && activeButton !== 'ViewData' ||
    //   !noFileCID ||
    //   isUnRole ||
    //   (!isMinter && !isAdmin && !isBuyer),
  };
};
