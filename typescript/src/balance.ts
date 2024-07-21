import { TokenBalance } from "./types";

export const checkBalance = async (address: string): Promise<TokenBalance> => {
  const result = await fetch(
    `https://wallet.mainnet.alephium.org/addresses/${address}/balance`
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return response.json().then((data) => {
        throw data;
      });
    })
    .then((data: TokenBalance) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  return result;
};
