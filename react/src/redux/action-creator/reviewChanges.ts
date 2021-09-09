import { Dispatch } from "redux";
import {
    ReviewChangesActions,
    ReviewChangesActionTypes,
    ClearErrorAction,
    ErrorAction
} from "../../types/reviewChanges";
import { RootState } from "../reducers";
// import { Registry } from "@cosmjs/proto-signing";

export const sendErrorNotification = (
    errMessage: string,
    dispatch: Dispatch<ErrorAction | ClearErrorAction>
): void => {
    dispatch({
        type: ReviewChangesActionTypes.ERROR,
        payload: { error: errMessage }
    });
    setTimeout(() => {
        dispatch({
            type: ReviewChangesActionTypes.CLEAR_ERROR
        });
    }, 5000);
};

export const fetchParamsList = () => {
    return async (
        dispatch: Dispatch<ReviewChangesActions>,
        getState: () => RootState
    ): Promise<void> => {
        const { settings } = getState();
        try {
            dispatch({ type: ReviewChangesActionTypes.SET_LOADING, payload: { loading: true } });

            const bank = await settings.lcdClient.get("/cosmos/bank/v1beta1/params");

            const distribution = await settings.lcdClient.get(
                "/cosmos/distribution/v1beta1/params"
            );

            const govVoting = await settings.lcdClient.get("/cosmos/gov/v1beta1/params/voting");
            const govDeposit = await settings.lcdClient.get("/cosmos/gov/v1beta1/params/deposit");
            const govTally = await settings.lcdClient.get("/cosmos/gov/v1beta1/params/tallying");

            const slashing = await settings.lcdClient.get("/cosmos/slashing/v1beta1/params");

            const staking = await settings.lcdClient.get("/cosmos/staking/v1beta1/params");

            dispatch({
                type: ReviewChangesActionTypes.SET_PARAMS,
                payload: {
                    bank: bank.params,
                    distribution: distribution.params,
                    gov: {
                        voting_params: govVoting.voting_params,
                        deposit_params: govDeposit.deposit_params,
                        tally_params: govTally.tally_params
                    },
                    slashing: slashing.params,
                    staking: staking.params
                }
            });

            dispatch({ type: ReviewChangesActionTypes.SET_LOADING, payload: { loading: false } });
        } catch (error) {
            console.log("[Admin fetching error]", error);
            sendErrorNotification("Error fetching admins: " + error.message, dispatch);
        }
    };
};
