import { BankExtension, LcdClient } from "@cosmjs/launchpad";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { Keplr } from "@keplr-wallet/types";
import { chainInfo } from "../../config";
// import { lcdClient } from "../index";
import { toPrettyCoin } from "../../utills/toPrettyCoin";

export const getKeplr = getKeplrFromWindow;

export const getAccountName = async (keplr: Keplr, chainId: string): Promise<string> => {
    const key = await keplr.getKey(chainId);
    return key.name;
};

export const getWalletAddress = async (keplr: Keplr, chainId: string): Promise<string> => {
    const key = await keplr.getKey(chainId);
    return key.bech32Address;
};

export const getBalance = async (
    keplr: Keplr,
    walletAddress: string,
    lcdClient: LcdClient & BankExtension,
    coinMinimalDenom: string,
    coinDenom: string
): Promise<string> => {
    const coins = await lcdClient.bank.balances(walletAddress).then((data) => data.result);
    const res = coins.find((c) => c.denom === coinMinimalDenom);
    return toPrettyCoin(res?.amount || "0", coinDenom, coinMinimalDenom)
        .trim(true)
        .toString();
};
