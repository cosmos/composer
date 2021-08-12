import {
    SubmitProposalAction,
    SubmitProposalState,
    SubmitProposalTypes
} from "../../types/submitProposal";

const initialState: SubmitProposalState = {
    error: null,
    broadcastResponse: null,
    fetching: false
};

export const submitProposalReducer = (
    state = initialState,
    action: SubmitProposalAction
): SubmitProposalState => {
    switch (action.type) {
        case SubmitProposalTypes.SUBMIT_PROPOSAL_CALL:
            return { ...state, error: null, broadcastResponse: null, fetching: true };

        case SubmitProposalTypes.SUBMIT_PROPOSAL_SUCCESS:
            return { ...state, fetching: false, broadcastResponse: action.payload };

        case SubmitProposalTypes.SUBMIT_PROPOSAL_ERROR:
            return { ...state, fetching: false, error: action.payload };

        case SubmitProposalTypes.SUBMIT_PROPOSAL_RESET:
            return { ...state, error: null, broadcastResponse: null, fetching: false };

        default:
            return state;
    }
};
