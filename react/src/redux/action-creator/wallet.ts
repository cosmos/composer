import { Dispatch } from "redux";
import { WalletAction, WalletActionTypes } from "../../types/wallet";
import { chainInfo } from "../../config";
import { getKeplr } from "../../cosmos";
import { defaultRegistryTypes, SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { MsgSubmitProposal } from "../../cosmos/codec/cosmos/gov/v1beta1/tx";
import { MsgAddAdmin, MsgDeleteAdmin } from "../../cosmos/codec/cosmos/adminmodule/tx";

export const connectWallet = () => {
    return async (dispatch: Dispatch<WalletAction>) => {
        try {
            dispatch({ type: WalletActionTypes.WALLET_CONNECT });

            const keplr = await getKeplr();
            if (!keplr) {
                throw new Error("Keplr extension not found");
            }
            await keplr.experimentalSuggestChain(chainInfo);
            await keplr.enable(chainInfo.chainId);

            const registry = new Registry();

            registry.register("/cosmos.gov.v1beta1.MsgSubmitProposal", MsgSubmitProposal);
            registry.register("/cosmos.adminmodule.adminmodule.MsgAddAdmin", MsgAddAdmin);
            registry.register("/cosmos.adminmodule.adminmodule.MsgDeleteAdmin", MsgDeleteAdmin);

            defaultRegistryTypes.forEach((v) => {
                registry.register(v[0], v[1]);
            });

            const offlineSigner = keplr.getOfflineSigner(chainInfo.chainId);

            const stargateClient = await SigningStargateClient.connectWithSigner(
                chainInfo.rpc,
                offlineSigner,
                {
                    registry: registry
                }
            );

            dispatch({
                type: WalletActionTypes.WALLET_SUCCESS,
                payload: { keplr, stargateClient }
            });
        } catch (e) {
            dispatch({ type: WalletActionTypes.WALLET_ERROR, payload: e.message || "error" });
        }
    };
};

export const disconnectWallet = () => {
    return { type: WalletActionTypes.WALLET_DISCONNECT };
};
