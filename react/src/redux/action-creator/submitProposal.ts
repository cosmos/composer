import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { chainInfo } from "../../config";
import { Coin, coins, isBroadcastTxSuccess } from "@cosmjs/stargate";
import { getWalletAddress } from "../../cosmos/keplr";
import { SubmitProposalAction, SubmitProposalTypes } from "../../types/submitProposal";
import { EncodeObject } from "@cosmjs/proto-signing";

export const submitProposal = (content: EncodeObject, deposit: Coin[]) => {
    return async (dispatch: Dispatch<SubmitProposalAction>, getState: () => RootState) => {
        try {
            dispatch({ type: SubmitProposalTypes.SUBMIT_PROPOSAL_CALL });
            const {
                wallet: { stargateClient, isConnected, keplr }
            } = getState();

            if (!isConnected || !stargateClient || !keplr) {
                return dispatch(setSubmitProposalError("Wallet is not connected"));
            }
            const address = await getWalletAddress(keplr);
            const msg = {
                content,
                initialDeposit: deposit,
                proposer: address
            };
            const msgAny = {
                typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
                value: msg
            };
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
                dispatch(setSubmitProposalError(broadcastRes.rawLog || "error"));
            }
        } catch (e) {
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
