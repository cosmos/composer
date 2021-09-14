import {
    AuthExtension,
    BankExtension,
    DistributionExtension,
    GovExtension,
    LcdClient,
    MintExtension,
    SlashingExtension,
    StakingExtension,
    SupplyExtension
} from "@cosmjs/launchpad";

export enum ModuleNames {
    gov = "gov",
    admin = "admin"
}

export enum ProposalUrls {
    admin = "/cosmos.adminmodule.adminmodule.MsgSubmitProposal",
    gov = "/cosmos.gov.v1beta1.MsgSubmitProposal"
}

export interface FetchAction {
    type: SettingsActionTypes.SET_SETTINGS;
    payload: Omit<SettingsState, "moduleName">;
}

export interface ModuleNameAction {
    type: SettingsActionTypes.SET_MODULE;
    payload: {
        moduleName: ModuleNames;
    };
}

// export interface SetLoadingAction {
//     type: SettingsActionTypes.SET_LOADING;
//     payload: { loading: boolean };
// }

// export interface ErrorAction {
//     type: SettingsActionTypes.ERROR;
//     payload: { error: string };
// }

// export interface ClearErrorAction {
//     type: SettingsActionTypes.CLEAR_ERROR;
// }

export type SettingsActions = FetchAction | ModuleNameAction;

export enum SettingsActionTypes {
    SET_SETTINGS = "SET_SETTINGS",
    SET_MODULE = "SET_MODULE"
    // SET_LOADING = "SET_LOADING",
    // ERROR = "ERROR",
    // CLEAR_ERROR = "CLEAR_ERROR"
}

export interface SettingsState {
    rpc: string;
    rest: string;
    chainId: string;
    chainName: string;
    lcdClient: LcdClient &
        AuthExtension &
        BankExtension &
        DistributionExtension &
        GovExtension &
        MintExtension &
        SlashingExtension &
        StakingExtension &
        SupplyExtension;
    moduleName: ModuleNames;
}
