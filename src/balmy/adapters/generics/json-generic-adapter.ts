import { ChainId } from "@mean-finance/sdk";
import { ITokenListGenerator, TokenData } from "../../types";

export class JsonGenericTokenListGenerator implements ITokenListGenerator {
  private tokenList: TokenData[];
  private url: string;
  parser: any;
  constructor(url: string, parser?: any) {
    this.tokenList = [];
    this.url = url;
    this.parser = parser;
  }
  async fetchTokens(): Promise<void> {
    try {
      const response = await fetch(this.url).then((res) => res.json());
      const tokens = !this.parser
        ? response.data?.tokens ??
          response.result?.tokens ??
          response.tokens ??
          response
        : this.parser(response);
      for (const token of tokens) {
        this.tokenList.push({
          name: token.name,
          symbol: token.symbol,
          logoURI: token.logoURI,
          chainId: token.chainId,
          decimals: token.decimals,
          address: token.address,
        });
      }
    } catch (e) {
      console.log(e);
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
