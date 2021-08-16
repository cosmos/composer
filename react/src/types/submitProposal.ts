import { BroadcastTxSuccess } from "@cosmjs/stargate/build/stargateclient";

export type TBaseSPMsg = { title: string; description: string };

export interface SubmitProposalState {
    broadcastResponse: BroadcastTxSuccess | null;
    error: string | null;
    fetching: boolean;
}

export enum SubmitProposalTypes {
    SUBMIT_PROPOSAL_CALL = "SUBMIT_PROPOSAL_CALL",
    SUBMIT_PROPOSAL_SUCCESS = "SUBMIT_PROPOSAL_SUCCESS",
    SUBMIT_PROPOSAL_ERROR = "SUBMIT_PROPOSAL_ERROR",
    SUBMIT_PROPOSAL_RESET = "SUBMIT_PROPOSAL_RESET"
}

interface SubmitProposalCallAction {
    type: SubmitProposalTypes.SUBMIT_PROPOSAL_CALL;
}
interface SubmitProposalSuccessAction {
    type: SubmitProposalTypes.SUBMIT_PROPOSAL_SUCCESS;
    payload: BroadcastTxSuccess;
}
interface SubmitProposalErrorAction {
    type: SubmitProposalTypes.SUBMIT_PROPOSAL_ERROR;
    payload: string;
}
interface SubmitProposalResetAction {
    type: SubmitProposalTypes.SUBMIT_PROPOSAL_RESET;
}

export type SubmitProposalAction =
    | SubmitProposalCallAction
    | SubmitProposalSuccessAction
    | SubmitProposalErrorAction
    | SubmitProposalResetAction;
