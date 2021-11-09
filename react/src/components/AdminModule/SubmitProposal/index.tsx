import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Coin } from "@cosmjs/stargate";
import CoinsForm from "./Coins/CoinsForm";
import CoinItem from "./Coins/CoinItem";
import TextProposal from "./TextProposal";
import ParameterChangeProposal from "./ParameterChangeProposal/ParameterChangeProposal";
import CommunityPoolSpendProposal from "./CommunityPoolSpendProposal";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import { TBaseSPMsg } from "../../../types/submitProposal";
import Spinner from "../../Loader/Spinner";
import { useDispatch } from "react-redux";
import {
    sendSubmitProposalError,
    submitProposalReset
} from "../../../redux/action-creator/submitProposal";
import { initSettings } from "../../../utills/initSettings";
import ModuleSwitch from "../../ModuleSwitch/ModuleSwitch";
import { ModuleNames } from "../../../types/settings";
import SoftwareUpgradeProposal from "./SoftwareUpgradeProposal";

const SubmitProposal: React.FC = () => {
    const { broadcastResponse, error, fetching } = useTypedSelector((s) => s.submitProposal);
    const { moduleName, chainName } = useTypedSelector((s) => s.settings);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deposit, setDeposit] = useState<Coin[]>([]);

    const dispatch = useDispatch();

    const validateDeposit = (dep: Coin[]): boolean => {
        for (const c of dep) {
            if (c.amount === "" || c.denom === "") {
                sendSubmitProposalError("No empty values allowed", dispatch);
                return false;
            }
        }
        return true;
    };

    const params: TBaseSPMsg = { title, description, deposit, validateDeposit };

    useEffect(() => {
        initSettings(dispatch);

        return () => {
            dispatch(submitProposalReset());
        };
    }, []);

    console.log("deposit", deposit);
    return (
        <div className="submit-proposal">
            <div className="header">
                <h4 className="title">
                    Submit Proposal
                    {fetching && <Spinner />}
                </h4>

                <ModuleSwitch />
            </div>

            {error && <div className={"error-label"}>Error: {error}</div>}
            {broadcastResponse && (
                <h1 className={"success-label"}>
                    Success,{" "}
                    {broadcastResponse.rawLog && moduleName === ModuleNames.gov && (
                        <a
                            href={
                                "https://www.mintscan.io/" +
                                chainName +
                                "/proposals/" +
                                JSON.parse(broadcastResponse.rawLog)[0].events[2].attributes[0]
                                    .value
                            }>
                            View your proposal on mintscan!
                        </a>
                    )}
                </h1>
            )}

            <div className="container">
                <div>
                    <div>
                        <label htmlFor={"title"}>Title</label>
                    </div>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type={"text"}
                        placeholder={"My Cool Proposal"}
                        id={"title"}
                        className="input-elem"
                    />
                </div>

                <div>
                    <div>
                        <label htmlFor={"description"}>Description</label>
                    </div>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={"A description with line breaks and `code formatting`"}
                        id={"description"}
                        className="input-elem"
                    />
                </div>

                {moduleName === ModuleNames.gov ? (
                    <div>
                        <div>
                            <label htmlFor={"deposit"}>Deposit</label>
                        </div>
                        <div id="deposit">
                            <CoinsForm deposit={deposit} setDeposit={setDeposit} />
                            {/* <div className={"coin-items"}>
                                {deposit.map((d, i) => (
                                    <CoinItem
                                        key={i}
                                        deposit={d}
                                        deleteDeposit={() =>
                                            setDeposit([
                                                ...deposit.slice(0, i),
                                                ...deposit.slice(i + 1)
                                            ])
                                        }
                                    />
                                ))}
                            </div> */}
                        </div>
                    </div>
                ) : null}

                <div>
                    <div>
                        <label htmlFor={"proposal-tabs"}>Type Proposal</label>
                    </div>

                    <Tabs id={"proposal-tabs"}>
                        <TabList>
                            <Tab>TextProposal</Tab>
                            <Tab>ParameterChangeProposal</Tab>
                            <Tab>CommunityPoolSpendProposal</Tab>
                            <Tab>SoftwareUpgradeProposal</Tab>
                        </TabList>

                        <TabPanel forceRender>
                            <div className={"tab-panel-content"}>
                                <TextProposal {...params} />
                            </div>
                        </TabPanel>

                        <TabPanel forceRender>
                            <div className={"tab-panel-content"}>
                                <ParameterChangeProposal {...params} />
                            </div>
                        </TabPanel>

                        <TabPanel forceRender>
                            <div className={"tab-panel-content"}>
                                <CommunityPoolSpendProposal {...params} />
                            </div>
                        </TabPanel>

                        <TabPanel forceRender>
                            <div className={"tab-panel-content"}>
                                <SoftwareUpgradeProposal {...params} />
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default SubmitProposal;
