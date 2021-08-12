export interface FetchAction {
    type: AdminListActionTypes.SET_LIST;
    payload: { admins: string[] };
}

export interface SetLoadingAction {
    type: AdminListActionTypes.SET_LOADING;
    payload: { loading: boolean };
}

export interface ErrorAction {
    type: AdminListActionTypes.ERROR;
    payload: { error: string };
}

export interface ClearErrorAction {
    type: AdminListActionTypes.CLEAR_ERROR;
}

export type AdminActions = FetchAction | SetLoadingAction | ErrorAction | ClearErrorAction;

export enum AdminListActionTypes {
    SET_LIST = "SET_LIST",
    SET_LOADING = "SET_LOADING",
    ERROR = "ERROR",
    CLEAR_ERROR = "CLEAR_ERROR"
}

export interface AdminListState {
    admins: string[];
    loading: boolean;
    error: string | null;
}
