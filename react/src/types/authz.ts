import { BroadcastTxSuccess } from "@cosmjs/stargate/build/stargateclient";

export type TBaseSPMsg = { title: string; description: string };

export interface AuthzState {
    broadcastResponse: BroadcastTxSuccess | null;
    error: string | null;
    fetching: boolean;
    grants: AuthzGrant[];
}

export interface AuthzGrant {
    authorization: {
        "@type": string;
        msg: string;
    };
    expiration: string;
}

export enum AuthzTypes {
    AUTH_CALL = "AUTH_CALL",
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_ERROR = "AUTH_ERROR",
    AUTH_RESET = "AUTH_RESET",
    SET_GRANTS = "SET_GRANTS"
}

interface AuthzCallAction {
    type: AuthzTypes.AUTH_CALL;
}
interface AuthzSuccessAction {
    type: AuthzTypes.AUTH_SUCCESS;
    payload: BroadcastTxSuccess;
}
interface AuthzErrorAction {
    type: AuthzTypes.AUTH_ERROR;
    payload: string;
}
interface AuthzResetAction {
    type: AuthzTypes.AUTH_RESET;
}

interface AuthzSetGrantsAction {
    type: AuthzTypes.SET_GRANTS;
    payload: AuthzGrant[];
}

export type AuthzAction =
    | AuthzCallAction
    | AuthzSuccessAction
    | AuthzErrorAction
    | AuthzResetAction
    | AuthzSetGrantsAction;
