import { Dispatch } from "redux";
import { MsgSubmitProposal } from "../../cosmos/codec/cosmos/gov/v1beta1/tx";
import { ProposalAction, ProposalActionTypes, ArchivedProposal } from "../../types/proposal";
import { getProposalsHistory } from "../../utills/helper";
import { RootState } from "../reducers";
// import { lcdClient } from "../../cosmos";

export const fetchProposals = () => {
    return async (dispatch: Dispatch<ProposalAction>, getState: () => RootState) => {
        const { settings } = getState();
        const txs = await getProposalsHistory(settings.rpc);
        console.log("txs", txs);

        try {
            dispatch({ type: ProposalActionTypes.PROPOSAL_CALL });
            const archivedProposals: { proposals: ArchivedProposal[] } =
                await settings.lcdClient.get("/cosmos/adminmodule/adminmodule/archivedproposals");
            dispatch({
                type: ProposalActionTypes.PROPOSAL_SUCCESS,
                payload: archivedProposals.proposals.reverse()
            });
        } catch (e) {
            dispatch({ type: ProposalActionTypes.PROPOSAL_ERROR, payload: e.message || "error" });
        }
    };
};

// export const fetchProposalDetail = (id: string) => {
//     return async (dispatch: Dispatch<ProposalAction>) => {
//         try {
//             dispatch({ type: ProposalActionTypes.PROPOSAL_DETAIL_CALL });
//
//             const proposer = await lcdClient.gov
//                 .proposer(id)
//                 .then((data) => data.result.proposer)
//                 .catch((e) => null);
//
//             const deposits = await lcdClient.gov
//                 .deposits(id)
//                 .then((data) => data.result)
//                 .catch((e) => null);
//
//             dispatch({
//                 type: ProposalActionTypes.PROPOSAL_DETAIL_SUCCESS,
//                 payload: { proposer, deposits }
//             });
//         } catch (e) {
//             dispatch({
//                 type: ProposalActionTypes.PROPOSAL_DETAIL_ERROR,
//                 payload: e.message || "error"
//             });
//         }
//     };
// };
//
// export const proposalDetailReset = () => {
//     return { type: ProposalActionTypes.PROPOSAL_DETAIL_RESET };
// };
