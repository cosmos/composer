import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { updateSettings } from "../../redux/action-creator/settings";
import { connectWallet, disconnectWallet } from "../../redux/action-creator/wallet";
import { remoteSettings } from "../../types/settings";
import { initSettings } from "../../utills/initSettings";
import { getLocalSettings, setLocalSettings } from "../../utills/localStorage";

const SettingsPage = () => {
    const [rest, setRest] = useState("");
    const [rpc, setRpc] = useState("");
    const [chainId, setChainId] = useState("");
    const [chainName, setChainName] = useState("");
    const [coinDenom, setCoinDenom] = useState("");
    const [coinMinimalDenom, setCoinMinimalDenom] = useState("");

    const dispatch = useDispatch();

    function saveSettings(
        rest: string,
        rpc: string,
        chainId: string,
        chainName: string,
        coinDenom: string,
        coinMinimalDenom: string
    ) {
        setLocalSettings({ rest, rpc, chainId, chainName, coinDenom, coinMinimalDenom });
        dispatch(updateSettings({ rpc, rest, chainId, chainName, coinDenom, coinMinimalDenom }));

        dispatch(disconnectWallet());
        dispatch(connectWallet(rpc, rest, chainId, chainName, coinDenom, coinMinimalDenom));
    }

    useEffect(() => {
        const settings = getLocalSettings();
        setRest(settings.rest);
        setRpc(settings.rpc);
        setChainId(settings.chainId);
        setChainName(settings.chainName);
        setCoinDenom(settings.coinDenom);
        setCoinMinimalDenom(settings.coinMinimalDenom);

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
                <label className="settings-page__label" htmlFor="coinDenom">
                    Coin Denom:
                    <input
                        type="text"
                        name="coinDenom"
                        id="coinDenom"
                        className="settings-page__input"
                        value={coinDenom}
                        onChange={({ target }) => setCoinDenom(target.value)}
                    />
                </label>
                <label className="settings-page__label" htmlFor="coinMinimalDenom">
                    Coin Minimal Denom:
                    <input
                        type="text"
                        name="coinMinimalDenom"
                        id="coinMinimalDenom"
                        className="settings-page__input"
                        value={coinMinimalDenom}
                        onChange={({ target }) => setCoinMinimalDenom(target.value)}
                    />
                </label>
                <div className="settings-page__label" style={{ width: 350 }}>
                    Select chain preset:
                    <Select
                        onChange={(s) => {
                            if (s) {
                                setRest(s.value.rest);
                                setRpc(s.value.rpc);
                                setChainId(s.value.chainId);
                                setChainName(s.value.chainName);
                                setCoinDenom(s.value.coinDenom);
                                setCoinMinimalDenom(s.value.coinMinimalDenom);
                                saveSettings(
                                    s.value.rest,
                                    s.value.rpc,
                                    s.value.chainId,
                                    s.value.chainName,
                                    s.value.coinDenom,
                                    s.value.coinMinimalDenom
                                );
                            }
                        }}
                        options={remoteSettings.map((s) => ({ value: s, label: s.chainName }))}
                    />
                </div>

                <button
                    className="settings-page__btn"
                    onClick={() =>
                        saveSettings(rest, rpc, chainId, chainName, coinDenom, coinMinimalDenom)
                    }>
                    Save
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
