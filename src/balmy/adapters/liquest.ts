import { ChainId } from "@mean-finance/sdk";
import { ITokenListGenerator, TokenData } from "../types";

const url = "https://li.quest/v1/tokens";
const chains = [1101, 8453, 59144];
export class LiquestTokenListGenerator implements ITokenListGenerator {
  private tokenList: TokenData[];
  constructor() {
    this.tokenList = [];
  }
  async fetchTokens(): Promise<void> {
    const response: Record<string, any[]> = (
      await fetch(url).then((res) => res.json())
    ).tokens;
    if (response)
      for (const [chain, tokens] of Object.entries(response)) {
        if ([1101, 8453, 59144].includes(Number(chain))) {
          for (const [_, data] of Object.entries(tokens)) {
            this.tokenList.push({
              name: data.name,
              decimals: data.decimals,
              symbol: data.symbol,
              chainId: Number(chain),
              address: data.address,
            });
          }
        }
      }
  }

  getTokenList(): TokenData[] {
    return this.tokenList;
  }

  getChains(): ChainId[] {
    return chains;
  }
}
