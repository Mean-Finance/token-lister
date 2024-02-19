import { Address, ChainId } from "@mean-finance/sdk";

export type ITokenListGenerator = {
  fetchTokens(): Promise<void>;
  getTokenList(): TokenData[];
  getChains(): ChainId[];
};

export type ITokenList = { generator: ITokenListGenerator; priority?: number };

export type TokenData = {
  name: string;
  symbol: string;
  address: Address;
  logoURI?: string;
  decimals?: number;
  chainId: ChainId;
};

export type FullTokenData = TokenData & {
  providers?: string[];
};
