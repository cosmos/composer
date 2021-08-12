import { StakingParams } from "@keplr-wallet/stores/build/query/cosmos/staking/types";
import {
    ReviewChangesActions,
    ReviewChangesActionTypes,
    ReviewChangesState
} from "../../types/reviewChanges";

const initialState: ReviewChangesState = {
    error: null,
    loading: false,
    modules: {
        bank: null!,
        distribution: null!,
        gov: null!,
        slashing: null!,
        staking: null!
    }
};

export const reviewChangesReducer = (
    state = initialState,
    action: ReviewChangesActions
): ReviewChangesState => {
    switch (action.type) {
        case ReviewChangesActionTypes.SET_PARAMS:
            return { ...state, modules: { ...action.payload } };
        case ReviewChangesActionTypes.SET_LOADING:
            return { ...state, loading: action.payload.loading };
        case ReviewChangesActionTypes.ERROR:
            return { ...state, error: action.payload.error };
        case ReviewChangesActionTypes.CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
};
