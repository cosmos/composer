import { chainInfo } from "../config";
import { SettingsState } from "../types/settings";

export enum SettingsLS {
    localSettings = "local-settings"
}

export type LocalSettings = Omit<SettingsState, "lcdClient">;

export const getLocalSettings = (): LocalSettings => {
    const unparsedSettings = window?.localStorage.getItem(SettingsLS.localSettings);
    if (!unparsedSettings) {
        const newSettings: LocalSettings = {
            rest: chainInfo.rest,
            rpc: chainInfo.rpc,
            chainId: chainInfo.chainId,
            chainName: chainInfo.chainName
        };

        window?.localStorage.setItem(SettingsLS.localSettings, JSON.stringify(newSettings));

        return newSettings;
    }

    return JSON.parse(unparsedSettings);
};

export const setLocalSettings = (settings: LocalSettings): void => {
    window?.localStorage.setItem(SettingsLS.localSettings, JSON.stringify(settings));
};
