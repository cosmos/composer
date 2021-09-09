import { combineReducers } from "redux";
import { adminListReducer } from "./adminList";
import { proposalReducer } from "./proposal";
import { walletReducer } from "./wallet";
import { reviewChangesReducer } from "./reviewChanges";
import { submitProposalReducer } from "./submitProposal";
import { settingsReducer } from "./settings";

export const rootReducer = combineReducers({
    proposal: proposalReducer,
    wallet: walletReducer,
    admin: adminListReducer,
    reviewChanges: reviewChangesReducer,
    submitProposal: submitProposalReducer,
    settings: settingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
