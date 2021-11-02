import { AuthzAction, AuthzState, AuthzTypes } from "../../types/authz";

const initialState: AuthzState = {
    error: null,
    broadcastResponse: null,
    fetching: false,
    grants: []
};

export const authzReducer = (state = initialState, action: AuthzAction): AuthzState => {
    switch (action.type) {
        case AuthzTypes.AUTH_CALL:
            return { ...state, error: null, broadcastResponse: null, fetching: true };

        case AuthzTypes.AUTH_SUCCESS:
            return { ...state, fetching: false, broadcastResponse: action.payload };

        case AuthzTypes.AUTH_ERROR:
            return { ...state, fetching: false, error: action.payload };

        case AuthzTypes.AUTH_RESET:
            return { ...state, error: null, broadcastResponse: null, fetching: false };
        case AuthzTypes.SET_GRANTS:
            return { ...state, grants: action.payload };

        default:
            return state;
    }
};
