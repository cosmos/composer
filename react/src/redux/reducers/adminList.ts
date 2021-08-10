import { AdminActions, AdminListActionTypes, AdminListState } from "../../types/adminList";

const initialState: AdminListState = {
    admins: [],
    error: null,
    loading: false
};

export const adminListReducer = (state = initialState, action: AdminActions): AdminListState => {
    switch (action.type) {
        case AdminListActionTypes.SET_LIST:
            return { ...state, admins: action.payload.admins };
        case AdminListActionTypes.SET_LOADING:
            return { ...state, loading: action.payload.loading };
        case AdminListActionTypes.ERROR:
            return { ...state, error: action.payload.error };
        case AdminListActionTypes.CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
};
