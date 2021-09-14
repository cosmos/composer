import { chainInfo } from "../config";
import { ModuleNames, SettingsState } from "../types/settings";

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
            chainName: chainInfo.chainName,
            moduleName: ModuleNames.gov
        };

        window?.localStorage.setItem(SettingsLS.localSettings, JSON.stringify(newSettings));

        return newSettings;
    }

    return JSON.parse(unparsedSettings);
};

export const setLocalSettings = (settings: Omit<LocalSettings, "moduleName">): void => {
    const oldSettings = getLocalSettings();
    const newSettings = { ...oldSettings, ...settings };
    window?.localStorage.setItem(SettingsLS.localSettings, JSON.stringify(newSettings));
};

export const setLocalModule = (moduleName: ModuleNames): void => {
    const settings = getLocalSettings();
    settings.moduleName = moduleName;
    setLocalSettings(settings);
};
