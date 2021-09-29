import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { chainInfo } from "../../config";
import { Coin, coins, isBroadcastTxSuccess } from "@cosmjs/stargate";
import { getWalletAddress } from "../../cosmos/keplr";
import { SubmitProposalAction, SubmitProposalTypes } from "../../types/submitProposal";
import { EncodeObject } from "@cosmjs/proto-signing";
import { ModuleNames, ProposalUrls } from "../../types/settings";

export const submitProposal = (content: EncodeObject, deposit: Coin[]) => {
    return async (dispatch: Dispatch<SubmitProposalAction>, getState: () => RootState) => {
        try {
            dispatch({ type: SubmitProposalTypes.SUBMIT_PROPOSAL_CALL });
            const {
                settings,
                wallet: { stargateClient, isConnected, keplr }
            } = getState();

            if (!isConnected || !stargateClient || !keplr) {
                return dispatch(setSubmitProposalError("Wallet is not connected"));
            }
            const address = await getWalletAddress(keplr, settings.chainId);
            const msg = {
                content,
                proposer: address,
                initialDeposit: settings.moduleName === ModuleNames.gov ? deposit : undefined
            };
            const msgAny = {
                typeUrl:
                    settings.moduleName === ModuleNames.admin
                        ? ProposalUrls.admin
                        : ProposalUrls.gov,
                value:
                    settings.moduleName === ModuleNames.gov ? msg : { content, proposer: address }
            };
            console.log("sending to", msgAny);
            const fee = {
                amount: coins(0, chainInfo.stakeCurrency.coinMinimalDenom),
                gas: "2000000"
            };

            const broadcastRes = await stargateClient.signAndBroadcast(address, [msgAny], fee);
            if (isBroadcastTxSuccess(broadcastRes)) {
                dispatch({
                    type: SubmitProposalTypes.SUBMIT_PROPOSAL_SUCCESS,
                    payload: broadcastRes
                });
            } else {
                console.log("logs error", broadcastRes);
                dispatch(setSubmitProposalError(broadcastRes.rawLog || "error"));
            }
        } catch (e) {
            console.log("error", e);
            dispatch(setSubmitProposalError(e.message || "error"));
        }
    };
};

const setSubmitProposalError = (error: string): SubmitProposalAction => {
    return {
        type: SubmitProposalTypes.SUBMIT_PROPOSAL_ERROR,
        payload: error
    };
};

export const submitProposalReset = (): SubmitProposalAction => {
    return {
        type: SubmitProposalTypes.SUBMIT_PROPOSAL_RESET
    };
};
