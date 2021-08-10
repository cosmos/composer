import { combineReducers } from "redux";
import { adminListReducer } from "./adminList";
import { proposalReducer } from "./proposal";
import { walletReducer } from "./wallet";
import { reviewChangesReducer } from "./reviewChanges";
import { submitProposalReducer } from "./submitProposal";


export const rootReducer = combineReducers({
    proposal: proposalReducer,
    wallet: walletReducer,
    admin: adminListReducer,
    reviewChanges: reviewChangesReducer,
    submitProposal: submitProposalReducer

});

export type RootState = ReturnType<typeof rootReducer>;
