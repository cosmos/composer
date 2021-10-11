import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { chainInfo } from "../../config";
import { coins, isBroadcastTxSuccess } from "@cosmjs/stargate";
import { toUtf8 } from "@cosmjs/encoding";
import { getWalletAddress } from "../../cosmos/keplr";
import { AuthzAction, AuthzTypes } from "../../types/authz";
import { MsgGrant } from "../../cosmos/codec/cosmos/authz/tx";

export const grantAuth = (granter: string, grantee: string, msgTypeUrl: string) => {
    return async (dispatch: Dispatch<AuthzAction>, getState: () => RootState) => {
        try {
            dispatch({ type: AuthzTypes.AUTH_CALL });
            const {
                settings,
                wallet: { stargateClient, isConnected, keplr }
            } = getState();

            if (!isConnected || !stargateClient || !keplr) {
                return dispatch(setAuthzError("Wallet is not connected"));
            }
            const address = await getWalletAddress(keplr, settings.chainId);
            const dateNow = new Date();

            const msg = {
                granter,
                grantee,
                grant: {
                    authorization: {
                        typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
                        value: toUtf8(msgTypeUrl)
                    },
                    expiration: new Date(
                        dateNow.getFullYear() + 1,
                        dateNow.getMonth(),
                        dateNow.getDate()
                    )
                }
            };
            // const encodedMsg = MsgGrant.encode(msg).finish();
            const msgAny = {
                typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
                value: msg
            };
            const fee = {
                amount: coins(0, chainInfo.stakeCurrency.coinMinimalDenom),
                gas: "2000000"
            };
            console.log("sending", [msgAny]);
            const broadcastRes = await stargateClient.signAndBroadcast(address, [msgAny], fee);
            console.log(broadcastRes.data);
            if (isBroadcastTxSuccess(broadcastRes)) {
                dispatch({
                    type: AuthzTypes.AUTH_SUCCESS,
                    payload: broadcastRes
                });
            } else {
                console.log("error:::", broadcastRes.rawLog);
                dispatch(setAuthzError(broadcastRes.rawLog || "error"));
            }
        } catch (e) {
            console.log("error:::", e);
            dispatch(setAuthzError(e.message || "error"));
        }
    };
};

export const revokeAuth = (granter: string, grantee: string, msgTypeUrl: string) => {
    return async (dispatch: Dispatch<AuthzAction>, getState: () => RootState) => {
        try {
            dispatch({ type: AuthzTypes.AUTH_CALL });
            const {
                settings,
                wallet: { stargateClient, isConnected, keplr }
            } = getState();

            if (!isConnected || !stargateClient || !keplr) {
                return dispatch(setAuthzError("Wallet is not connected"));
            }
            const address = await getWalletAddress(keplr, settings.chainId);
            const msg = {
                granter,
                grantee,
                msg_type_url: msgTypeUrl
            };
            const msgAny = {
                typeUrl: "/cosmos.authz.v1beta1.MsgRevoke",
                value: msg
            };
            const fee = {
                amount: coins(0, chainInfo.stakeCurrency.coinMinimalDenom),
                gas: "2000000"
            };

            const broadcastRes = await stargateClient.signAndBroadcast(address, [msgAny], fee);
            if (isBroadcastTxSuccess(broadcastRes)) {
                dispatch({
                    type: AuthzTypes.AUTH_SUCCESS,
                    payload: broadcastRes
                });
            } else {
                dispatch(setAuthzError(broadcastRes.rawLog || "error"));
            }
        } catch (e) {
            dispatch(setAuthzError(e.message || "error"));
        }
    };
};

const setAuthzError = (error: string): AuthzAction => {
    return {
        type: AuthzTypes.AUTH_ERROR,
        payload: error
    };
};

export const authReset = (): AuthzAction => {
    return {
        type: AuthzTypes.AUTH_RESET
    };
};
