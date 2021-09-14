import { Dispatch } from "redux";
// import { lcdClient, getKeplr } from "../../cosmos";
import { Bech32 } from "@cosmjs/encoding";
import { getWalletAddress } from "../../cosmos/keplr";
import {
    AdminActions,
    AdminListActionTypes,
    ClearErrorAction,
    ErrorAction
} from "../../types/adminList";
import { isBroadcastTxSuccess, SigningStargateClient } from "@cosmjs/stargate";
import { chainInfo } from "../../config";
import { coins } from "@cosmjs/launchpad";
import { Registry } from "@cosmjs/proto-signing";
import { Keplr } from "@keplr-wallet/types";
import { RootState } from "../reducers";
import { adminModuleConnected, getModulesList } from '../../utills/helper';

export const sendErrorNotification = (
    errMessage: string,
    dispatch: Dispatch<ErrorAction | ClearErrorAction>
): void => {
    dispatch({
        type: AdminListActionTypes.ERROR,
        payload: { error: errMessage }
    });
    setTimeout(() => {
        dispatch({
            type: AdminListActionTypes.CLEAR_ERROR
        });
    }, 5000);
};

export const fetchAdminList = () => {
    return async (dispatch: Dispatch<AdminActions>, getState: () => RootState): Promise<void> => {
        const { settings } = getState();
        try {
            dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: true } });

            const adminsResp: { admins: string[] } = await settings.lcdClient.get(
                "/cosmos/adminmodule/adminmodule/admins"
            );

            dispatch({
                type: AdminListActionTypes.SET_LIST,
                payload: { admins: adminsResp.admins }
            });

            dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: false } });
        } catch (error) {
            console.log("[Admin fetching error]", error);
            sendErrorNotification("Error fetching admins: " + error.message, dispatch);
        }
    };
};

export const deleteAdminAction = (
    adminAddress: string,
    stargateClient: SigningStargateClient,
    kepler: Keplr
) => {
    return async (dispatch: Dispatch<AdminActions>, getState: () => RootState): Promise<void> => {
        const { settings } = getState();
        try {
            const sender = await getWalletAddress(kepler, settings.chainId);

            const msgDeleteAdminRequest = {
                admin: adminAddress,
                creator: sender
            };
            const msgAny = {
                typeUrl: "/cosmos.adminmodule.adminmodule.MsgDeleteAdmin",
                value: msgDeleteAdminRequest
            };

            const fee = {
                amount: coins(0, chainInfo.stakeCurrency.coinMinimalDenom),
                gas: "2000000"
            };

            dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: true } });
            const broadcastRes = await stargateClient.signAndBroadcast(sender, [msgAny], fee);

            if (isBroadcastTxSuccess(broadcastRes)) {
                const adminsResp: { admins: string[] } = await settings.lcdClient.get(
                    "/cosmos/adminmodule/adminmodule/admins"
                );
                dispatch({
                    type: AdminListActionTypes.SET_LIST,
                    payload: { admins: adminsResp.admins }
                });
                dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: false } });
            } else {
                sendErrorNotification("Error during transaction broadcast", dispatch);
                dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: false } });
            }
        } catch (error) {
            console.log("[Admin deletion error]", error);
            dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: false } });
            sendErrorNotification("Error saving new admin: " + error.message, dispatch);
        }
    };
};

export const saveAdminAction = (
    adminAddress: string,
    stargateClient: SigningStargateClient,
    kepler: Keplr
) => {
    return async (dispatch: Dispatch<AdminActions>, getState: () => RootState): Promise<void> => {
        const { settings } = getState();
        try {
            // Address validation
            const resp = Bech32.decode(adminAddress);

            if (kepler) {
                const sender = await getWalletAddress(kepler, settings.chainId);

                const msgAddAdminRequest = {
                    admin: adminAddress,
                    creator: sender
                };
                const msgAny = {
                    typeUrl: "/cosmos.adminmodule.adminmodule.MsgAddAdmin",
                    value: msgAddAdminRequest
                };

                const fee = {
                    amount: coins(0, chainInfo.stakeCurrency.coinMinimalDenom),
                    gas: "2000000"
                };

                console.log("sending", msgAddAdminRequest);
                dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: true } });
                const broadcastRes = await stargateClient.signAndBroadcast(sender, [msgAny], fee);

                if (isBroadcastTxSuccess(broadcastRes)) {
                    const adminsResp: { admins: string[] } = await settings.lcdClient.get(
                        "/cosmos/adminmodule/adminmodule/admins"
                    );
                    dispatch({
                        type: AdminListActionTypes.SET_LIST,
                        payload: { admins: adminsResp.admins }
                    });
                } else {
                    sendErrorNotification("Error during transaction broadcast", dispatch);
                    dispatch({
                        type: AdminListActionTypes.SET_LOADING,
                        payload: { loading: false }
                    });
                }
                dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: false } });
            } else {
                sendErrorNotification("No Keplr wallet logged in", dispatch);
            }
        } catch (error) {
            console.log("[Admin saving error]", error);
            dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: false } });
            sendErrorNotification("Error saving new admin: " + error.message, dispatch);
        }
    };
};
