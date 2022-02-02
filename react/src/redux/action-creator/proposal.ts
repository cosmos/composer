import { Dispatch } from "redux";
import { ProposalAction, ProposalActionTypes, ArchivedProposal } from "../../types/proposal";
import { ModuleNames } from "../../types/settings";
import { getProposalsHistory } from "../../utills/helper";
import { RootState } from "../reducers";
// import { lcdClient } from "../../cosmos";

export const fetchProposals = () => {
    return async (dispatch: Dispatch<ProposalAction>, getState: () => RootState) => {
        const { settings, wallet } = getState();
        try {
            if (settings.moduleName === ModuleNames.gov) {
                if (!wallet.stargateClient) return;
                dispatch({ type: ProposalActionTypes.PROPOSAL_CALL });

                const proposals = await getProposalsHistory(
                    settings.rpc,
                    wallet.stargateClient?.registry
                );
                console.log("proposals", proposals);

                const mappedProposals: ArchivedProposal[] = proposals.map((p, i) => ({
                    proposal_id: (i + 1).toString(),
                    content: { "@type": p.content.typeUrl, ...p.content.value },
                    submit_time: "0",
                    height: p.height,
                    proposer: p.proposer
                }));
                dispatch({
                    type: ProposalActionTypes.PROPOSAL_SUCCESS,
                    payload: mappedProposals.reverse()
                });
            } else {
                dispatch({ type: ProposalActionTypes.PROPOSAL_CALL });
                const archivedProposals: { proposals: ArchivedProposal[] } =
                    await settings.lcdClient.get(
                        "/cosmos/adminmodule/adminmodule/archivedproposals"
                    );
                dispatch({
                    type: ProposalActionTypes.PROPOSAL_SUCCESS,
                    payload: archivedProposals.proposals.reverse()
                });
            }
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
