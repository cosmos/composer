import { lcdClient } from "../../cosmos";
import { SettingsActions, SettingsState, SettingsActionTypes } from "../../types/settings";
import { getLocalSettings } from "../../utills/localStorage";

const initialState: SettingsState = {
    rpc: getLocalSettings().rpc,
    rest: getLocalSettings().rest,
    chainId: getLocalSettings().chainId,
    chainName: getLocalSettings().chainName,
    lcdClient: lcdClient,
    moduleName: getLocalSettings().moduleName,
    coinDenom: getLocalSettings().coinDenom,
    coinMinimalDenom: getLocalSettings().coinMinimalDenom
};

export const settingsReducer = (state = initialState, action: SettingsActions): SettingsState => {
    switch (action.type) {
        case SettingsActionTypes.SET_SETTINGS:
            return { ...state, ...action.payload };
        case SettingsActionTypes.SET_MODULE:
            return { ...state, moduleName: action.payload.moduleName };
        default:
            return state;
    }
};
