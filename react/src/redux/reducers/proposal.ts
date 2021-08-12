import { ProposalAction, ProposalActionTypes, ProposalState } from "../../types/proposal";

const initialState: ProposalState = {
    proposals: null,
    proposalDetail: null,
    isFetchingProposals: false,
    isFetchingItem: false,
    error: null
};

export const proposalReducer = (state = initialState, action: ProposalAction): ProposalState => {
    switch (action.type) {
        case ProposalActionTypes.PROPOSAL_CALL:
            return { ...state, isFetchingProposals: true, error: null };
        case ProposalActionTypes.PROPOSAL_SUCCESS:
            return { ...state, isFetchingProposals: false, proposals: action.payload };
        case ProposalActionTypes.PROPOSAL_ERROR:
            return { ...state, isFetchingProposals: false, error: action.payload };

        case ProposalActionTypes.PROPOSAL_DETAIL_CALL:
            return { ...state, isFetchingItem: true, error: null };
        case ProposalActionTypes.PROPOSAL_DETAIL_SUCCESS:
            return { ...state, isFetchingItem: false, proposalDetail: action.payload };
        case ProposalActionTypes.PROPOSAL_DETAIL_ERROR:
            return { ...state, isFetchingItem: false, error: action.payload };

        case ProposalActionTypes.PROPOSAL_DETAIL_RESET:
            return { ...state, proposalDetail: null };
        default:
            return state;
    }
};
