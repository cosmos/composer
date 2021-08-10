import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { Keplr } from "@keplr-wallet/types";
import { chainInfo } from "../../config";
import { lcdClient } from "../index";
import { toPrettyCoin } from "../../utills/toPrettyCoin";

export const getKeplr = getKeplrFromWindow;

export const getAccountName = async (keplr: Keplr): Promise<string> => {
    const key = await keplr.getKey(chainInfo.chainId);
    return key.name;
};

export const getWalletAddress = async (keplr: Keplr): Promise<string> => {
    const key = await keplr.getKey(chainInfo.chainId);
    return key.bech32Address;
};

export const getBalance = async (keplr: Keplr, walletAddress: string): Promise<string> => {
    const coins = await lcdClient.bank.balances(walletAddress).then((data) => data.result);
    const res = coins.find((c) => c.denom === chainInfo.stakeCurrency.coinMinimalDenom);
    return toPrettyCoin(res?.amount || "0")
        .trim(true)
        .toString();
};
