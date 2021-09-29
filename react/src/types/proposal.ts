import { Deposit, Proposal as ProposalCosmJS } from "@cosmjs/launchpad/build/lcdapi/gov";
import { Coin } from "@cosmjs/stargate";
import { ParamChange } from "../cosmos/codec/cosmos/params/v1beta1/params";

export interface ArchivedProposal {
    proposal_id: string;
    content: AContent;
    submit_time: string;
}

interface AContent {
    "@type": string;
    title: string;
    description: string;
    changes?: { key: string; subspace: string; value: string }[];
}

export enum ProposalTypes {
    upgrade = "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal",
    text = "/cosmos.gov.v1beta1.TextProposal",
    poolSpend = "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal",
    paramChange = "/cosmos.params.v1beta1.ParameterChangeProposal"
}

export interface ATextProposalContent extends AContent {
    "@type": "/cosmos.adminmodule.adminmodule.TextProposal";
}
export interface AParameterChangeProposalContent extends AContent {
    "@type": "/cosmos.adminmodule.adminmodule.ParameterChangeProposal";
    changes: ParamChange[];
}
export interface ACommunityPoolSpendProposalContent extends AContent {
    "@type": "/cosmos.adminmodule.adminmodule.CommunityPoolSpendProposal";
    recipient: string;
    amount: Coin[];
}

export function isATextProposalContent(proposal: AContent): proposal is ATextProposalContent {
    return proposal["@type"] === "/cosmos.gov.v1beta1.TextProposal";
}
export function isAParameterChangeProposalContent(
    proposal: AContent
): proposal is AParameterChangeProposalContent {
    return proposal["@type"] === "/cosmos.params.v1beta1.ParameterChangeProposal";
}
export function isACommunityPoolSpendProposalContent(
    proposal: AContent
): proposal is ACommunityPoolSpendProposalContent {
    return proposal["@type"] === "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal";
}

// export interface Proposal extends ProposalCosmJS {
//     readonly status: string;
//     readonly content: {
//         readonly type: string;
//         readonly value: {
//             readonly title: string;
//             readonly description: string;
//
//             //only ParameterChangeProposal
//             readonly changes?: ParamChange[];
//
//             //only CommunityPoolSpendProposal
//             readonly recipient?: string;
//             readonly amount?: Coin[];
//         };
//     };
// }
//
// interface IProposalDetail {
//     proposer: string | null;
//     deposits: readonly Deposit[] | null;
// }

export interface ProposalState {
    proposals: ArchivedProposal[] | null;
    // proposalDetail: IProposalDetail | null;
    isFetchingProposals: boolean;
    isFetchingItem: boolean;
    error: null | string;
}

export enum ProposalActionTypes {
    PROPOSAL_CALL = "PROPOSAL_CALL",
    PROPOSAL_SUCCESS = "PROPOSAL_SUCCESS",
    PROPOSAL_ERROR = "PROPOSAL_ERROR"

    // PROPOSAL_DETAIL_CALL = "PROPOSAL_DETAIL_CALL",
    // PROPOSAL_DETAIL_SUCCESS = "PROPOSAL_DETAIL_SUCCESS",
    // PROPOSAL_DETAIL_ERROR = "PROPOSAL_DETAIL_ERROR",
    // PROPOSAL_DETAIL_RESET = "PROPOSAL_DETAIL_RESET"
}

interface ProposalCallAction {
    type: ProposalActionTypes.PROPOSAL_CALL;
}

interface ProposalSuccessAction {
    type: ProposalActionTypes.PROPOSAL_SUCCESS;
    payload: ArchivedProposal[];
}

interface ProposalErrorAction {
    type: ProposalActionTypes.PROPOSAL_ERROR;
    payload: string;
}

// interface ProposalDetailCallAction {
//     type: ProposalActionTypes.PROPOSAL_DETAIL_CALL;
// }
//
// interface ProposalDetailSuccessAction {
//     type: ProposalActionTypes.PROPOSAL_DETAIL_SUCCESS;
//     payload: IProposalDetail;
// }
//
// interface ProposalDetailErrorAction {
//     type: ProposalActionTypes.PROPOSAL_DETAIL_ERROR;
//     payload: string;
// }
//
// interface ProposalDetailResetAction {
//     type: ProposalActionTypes.PROPOSAL_DETAIL_RESET;
// }

export type ProposalAction = ProposalCallAction | ProposalSuccessAction | ProposalErrorAction;
// | ProposalDetailCallAction
// | ProposalDetailSuccessAction
// | ProposalDetailErrorAction
// | ProposalDetailResetAction;
