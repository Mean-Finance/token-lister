import { ChainId } from "@mean-finance/sdk";
import { ITokenListGenerator, TokenData } from "../types";

const url = "https://defillama-datasets.llama.fi/tokenlist/all.json";
const networkMap: Record<string, number> = {
  ethereum: 1,
  "optimistic-ethereum": 10,
  "binance-smart-chain": 56,
  xdai: 100,
  "polygon-pos": 137,
  fantom: 250,
  "arbitrum-one": 42161,
  avalanche: 43114,
};

export class DefillamaTokenListGenerator implements ITokenListGenerator {
  private tokenList: TokenData[];
  constructor() {
    this.tokenList = [];
  }
  async fetchTokens(): Promise<void> {
    const response = await fetch(url).then((res) => res.json());
    for (const data of response) {
      const platforms: Record<string, string> = data.platforms;
      for (const [network, address] of Object.entries(platforms)) {
        this.tokenList.push({
          name: data.name,
          symbol: data.symbol,
          logoURI: data.logoURI,
          chainId: networkMap[network],
          address: address,
        });
      }
    }
  }

  getTokenList(): TokenData[] {
    return this.tokenList;
  }
  getChains(): ChainId[] {
    const chains: Set<ChainId> = new Set();
    return Array.from(
      this.tokenList.reduce((chains, token) => {
        if (token.chainId) chains.add(token.chainId);
        return chains;
      }, chains),
    );
  }
}
