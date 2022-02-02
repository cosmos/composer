import { CoinPretty, Dec } from "@keplr-wallet/unit";
import { chainInfo } from "../config";

export const toPrettyCoin = (
    amount: string | Dec,
    coinDenom: string,
    coinMinimalDenom: string
): CoinPretty => {
    return new CoinPretty(
        { ...chainInfo.currencies[0], coinDenom, coinMinimalDenom },
        new Dec(amount.toString())
    );
};
