import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSettings } from "../../redux/action-creator/settings";
import { connectWallet, disconnectWallet } from "../../redux/action-creator/wallet";
import { initSettings } from "../../utills/initSettings";
import { getLocalSettings, setLocalSettings } from "../../utills/localStorage";

const SettingsPage = () => {
    const [rest, setRest] = useState("");
    const [rpc, setRpc] = useState("");
    const [chainId, setChainId] = useState("");
    const [chainName, setChainName] = useState("");

    const dispatch = useDispatch();

    function saveSettings() {
        setLocalSettings({ rest, rpc, chainId, chainName });
        dispatch(updateSettings({ rpc, rest, chainId, chainName }));

        disconnectWallet();
        dispatch(connectWallet(rpc, rest, chainId, chainName));
    }

    useEffect(() => {
        const settings = getLocalSettings();
        setRest(settings.rest);
        setRpc(settings.rpc);
        setChainId(settings.chainId);
        setChainName(settings.chainName);

        initSettings(dispatch);
    }, []);

    return (
        <div className="settings-page">
            <div className="settings-page__header">Settings</div>
            <div className="settings-page__form">
                <label className="settings-page__label" htmlFor="rest">
                    REST endpoint:
                    <input
                        type="text"
                        name="rest"
                        id="rest"
                        className="settings-page__input"
                        value={rest}
                        onChange={({ target }) => setRest(target.value)}
                    />
                </label>

                <label className="settings-page__label" htmlFor="rpc">
                    RPC endpoint:
                    <input
                        type="text"
                        name="rpc"
                        id="rpc"
                        className="settings-page__input"
                        value={rpc}
                        onChange={({ target }) => setRpc(target.value)}
                    />
                </label>

                <label className="settings-page__label" htmlFor="chainId">
                    Chain ID:
                    <input
                        type="text"
                        name="chainId"
                        id="chainId"
                        className="settings-page__input"
                        value={chainId}
                        onChange={({ target }) => setChainId(target.value)}
                    />
                </label>

                <label className="settings-page__label" htmlFor="chainName">
                    Chain Name:
                    <input
                        type="text"
                        name="chainName"
                        id="chainName"
                        className="settings-page__input"
                        value={chainName}
                        onChange={({ target }) => setChainName(target.value)}
                    />
                </label>

                <button className="settings-page__btn" onClick={saveSettings}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
