import { Dispatch } from "redux";
import { lcdClient, getKeplr } from "../../cosmos";
import { Bech32 } from "@cosmjs/encoding";
import { getWalletAddress } from "../../cosmos/keplr";
import {
    ReviewChangesActions,
    ReviewChangesActionTypes,
    ClearErrorAction,
    ErrorAction
} from "../../types/reviewChanges";
import { SigningStargateClient } from "@cosmjs/stargate";
import { chainInfo } from "../../config";
import { coins } from "@cosmjs/launchpad";
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
    return async (dispatch: Dispatch<ReviewChangesActions>): Promise<void> => {
        try {
            dispatch({ type: ReviewChangesActionTypes.SET_LOADING, payload: { loading: true } });

            const bank = await lcdClient.get("/cosmos/bank/v1beta1/params");
            console.log("bank", bank);

            const distribution = await lcdClient.get("/cosmos/distribution/v1beta1/params");
            console.log("distrib", distribution);

            const govVoting = await lcdClient.get("/cosmos/gov/v1beta1/params/voting");
            const govDeposit = await lcdClient.get("/cosmos/gov/v1beta1/params/deposit");
            const govTally = await lcdClient.get("/cosmos/gov/v1beta1/params/tallying");
            console.log("gov", govVoting, govDeposit, govTally);

            const slashing = await lcdClient.get("/cosmos/slashing/v1beta1/params");
            console.log("slashing", slashing);

            const staking = await lcdClient.get("/cosmos/staking/v1beta1/params");
            console.log("staking", staking);

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
