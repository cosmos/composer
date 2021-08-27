import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { chainInfo } from "../../config";
import { coins, isBroadcastTxSuccess } from "@cosmjs/stargate";
import { getWalletAddress } from "../../cosmos/keplr";
import { AuthzAction, AuthzTypes } from "../../types/authz";

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
            const msg = {
                granter,
                grantee,
                grant: {
                    authorization: {
                        "@type": "/cosmos.authz.v1beta1.GenericAuthorization",
                        msg: msgTypeUrl
                    }
                }
            };
            const msgAny = {
                typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
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
