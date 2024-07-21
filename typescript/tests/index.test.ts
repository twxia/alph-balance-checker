import { checkBalance } from "../src/balance";

class NoErrorThrownError extends Error {}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};

describe("checkBalance", () => {
  it("should return the balance of the given address", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            balanceHint: "123 ALPH",
          }),
          { status: 200 }
        )
      )
    );

    const address = "ABC";
    const result = await checkBalance(address);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://wallet.mainnet.alephium.org/addresses/${address}/balance`
    );
    expect(result).toEqual({
      balanceHint: "123 ALPH",
    });
  });

  it("should throw error when the fetch failed", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            detail: "...",
          }),
          { status: 400 }
        )
      )
    );

    const address = "ABC";
    const error = await getError(async () => checkBalance(address));
    expect(fetchMock).toHaveBeenCalledWith(
      `https://wallet.mainnet.alephium.org/addresses/${address}/balance`
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
  });
});
