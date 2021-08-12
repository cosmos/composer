import { Dispatch } from "redux";
import { ProposalAction, ProposalActionTypes, Proposal } from "../../types/proposal";
import { lcdClient } from "../../cosmos";

export const fetchProposals = () => {
    return async (dispatch: Dispatch<ProposalAction>) => {
        try {
            dispatch({ type: ProposalActionTypes.PROPOSAL_CALL });
            const proposals = (await lcdClient.gov.proposals()).result.slice().reverse();
            dispatch({
                type: ProposalActionTypes.PROPOSAL_SUCCESS,
                payload: proposals as Proposal[]
            });
        } catch (e) {
            dispatch({ type: ProposalActionTypes.PROPOSAL_ERROR, payload: e.message || "error" });
        }
    };
};

export const fetchProposalDetail = (id: string) => {
    return async (dispatch: Dispatch<ProposalAction>) => {
        try {
            dispatch({ type: ProposalActionTypes.PROPOSAL_DETAIL_CALL });

            const proposer = await lcdClient.gov
                .proposer(id)
                .then((data) => data.result.proposer)
                .catch((e) => null);

            const deposits = await lcdClient.gov
                .deposits(id)
                .then((data) => data.result)
                .catch((e) => null);

            dispatch({
                type: ProposalActionTypes.PROPOSAL_DETAIL_SUCCESS,
                payload: { proposer, deposits }
            });
        } catch (e) {
            dispatch({
                type: ProposalActionTypes.PROPOSAL_DETAIL_ERROR,
                payload: e.message || "error"
            });
        }
    };
};

export const proposalDetailReset = () => {
    return { type: ProposalActionTypes.PROPOSAL_DETAIL_RESET };
};
