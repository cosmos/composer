import { Dispatch } from "redux";
import { WalletAction, WalletActionTypes } from "../../types/wallet";
import { getKeplr } from "../../cosmos";
import { defaultRegistryTypes, SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import {
    MsgAddAdmin,
    MsgDeleteAdmin,
    MsgSubmitProposal
} from "../../cosmos/codec/cosmos/adminmodule/adminmodule/tx";

import { MsgSubmitProposal as MsgSubmitProposalGov } from "../../cosmos/codec/cosmos/gov/v1beta1/tx";

import { ChainInfo } from "@keplr-wallet/types";
import { chainInfo } from "../../config";
import { MsgGrant, MsgRevoke } from "../../cosmos/codec/cosmos/authz/tx";

export const connectWallet = (rpc: string, rest: string, chainId: string, chainName: string) => {
    return async (dispatch: Dispatch<WalletAction>) => {
        try {
            dispatch({ type: WalletActionTypes.WALLET_CONNECT });

            const updatedChainInfo: ChainInfo = {
                ...chainInfo,
                rpc,
                rest,
                chainId,
                chainName
            };

            const keplr = await getKeplr();
            if (!keplr) {
                throw new Error("Keplr extension not found");
            }

            await keplr.experimentalSuggestChain(updatedChainInfo);
            await keplr.enable(updatedChainInfo.chainId);

            const registry = new Registry();

            registry.register(
                "/cosmos.adminmodule.adminmodule.MsgSubmitProposal",
                MsgSubmitProposal
            );
            registry.register("/cosmos.gov.v1beta1.MsgSubmitProposal", MsgSubmitProposalGov);
            registry.register("/cosmos.adminmodule.adminmodule.MsgAddAdmin", MsgAddAdmin);
            registry.register("/cosmos.adminmodule.adminmodule.MsgDeleteAdmin", MsgDeleteAdmin);

            registry.register("/cosmos.authz.v1beta1.MsgGrant", MsgGrant);
            registry.register("/cosmos.authz.v1beta1.MsgRevoke", MsgRevoke);

            defaultRegistryTypes.forEach((v) => {
                registry.register(v[0], v[1]);
            });

            const offlineSigner = keplr.getOfflineSigner(updatedChainInfo.chainId);

            const stargateClient = await SigningStargateClient.connectWithSigner(
                updatedChainInfo.rpc,
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
