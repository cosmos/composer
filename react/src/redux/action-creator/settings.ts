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
import { ModuleNames, SettingsActions, SettingsActionTypes } from "../../types/settings";
import { setLocalModule } from "../../utills/localStorage";

export interface IUpdateSettings {
    rpc: string;
    rest: string;
    chainId: string;
    chainName: string;
    coinDenom: string;
    coinMinimalDenom: string;
}

export const updateSettings = ({
    rpc,
    rest,
    chainId,
    chainName,
    coinDenom,
    coinMinimalDenom
}: IUpdateSettings) => {
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
                    lcdClient,
                    coinDenom,
                    coinMinimalDenom
                }
            });
        } catch (error) {
            console.log("[Update Settings error]", error);
        }
    };
};

export const setModule = (moduleName: ModuleNames) => {
    return async (dispatch: Dispatch<SettingsActions>): Promise<void> => {
        try {
            setLocalModule(moduleName);

            dispatch({
                type: SettingsActionTypes.SET_MODULE,
                payload: {
                    moduleName
                }
            });
        } catch (error) {
            console.log("[Update Settings error]", error);
        }
    };
};
