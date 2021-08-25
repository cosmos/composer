import {
    LcdClient,
    setupAuthExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupGovExtension,
    setupMintExtension,
    setupSlashingExtension,
    setupStakingExtension,
    setupSupplyExtension
} from "@cosmjs/launchpad";
import { Dispatch } from "redux";
import { SettingsActions, SettingsActionTypes } from "../../types/settings";

export interface IUpdateSettings {
    rpc: string;
    rest: string;
    chainId: string;
    chainName: string;
}

export const updateSettings = ({ rpc, rest, chainId, chainName }: IUpdateSettings) => {
    return async (dispatch: Dispatch<SettingsActions>): Promise<void> => {
        try {
            const lcdClient = LcdClient.withExtensions(
                { apiUrl: rest },
                setupAuthExtension,
                setupBankExtension,
                setupDistributionExtension,
                setupGovExtension,
                setupMintExtension,
                setupSlashingExtension,
                setupStakingExtension,
                setupSupplyExtension
            );

            dispatch({
                type: SettingsActionTypes.SET_SETTINGS,
                payload: {
                    rpc,
                    rest,
                    chainId,
                    chainName,
                    lcdClient
                }
            });
        } catch (error) {
            console.log("[Update Settings error]", error);
            // sendErrorNotification("Error fetching admins: " + error.message, dispatch);
        }
    };
};
