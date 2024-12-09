export interface Auction {
  tokenContract: string; // address 类型映射为 string
  tokenId: bigint; // uint256 类型映射为 bigint
  createdTime: bigint; // uint256 类型映射为 bigint
  seller: string; // address 类型映射为 string
  startTime: bigint; // uint256 类型映射为 bigint
  endOfBiddingPeriod: bigint; // uint256 类型映射为 bigint
  endOfRevealPeriod: bigint; // uint256 类型映射为 bigint
  numUnrevealedBids: bigint; // uint64 类型映射为 bigint
  highestBid: bigint; // uint96 类型映射为 bigint
  secondHighestBid: bigint; // uint96 类型映射为 bigint
  highestBidder: string; // address 类型映射为 string
  index: bigint; // uint64 类型映射为 bigint
  erc20Token: string; // address 类型映射为 string
}
