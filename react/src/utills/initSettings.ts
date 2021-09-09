import { Dispatch } from "redux";
import { updateSettings } from "../redux/action-creator/settings";
import { connectWallet, disconnectWallet } from "../redux/action-creator/wallet";
import { getLocalSettings } from "./localStorage";

export const initSettings = (dispatch: Dispatch<any>) => {
    const settings = getLocalSettings();
    dispatch(
        updateSettings({
            rpc: settings.rpc,
            rest: settings.rest,
            chainId: settings.chainId,
            chainName: settings.chainName
        })
    );

    disconnectWallet();
    dispatch(connectWallet(settings.rpc, settings.rest, settings.chainId, settings.chainName));
};
