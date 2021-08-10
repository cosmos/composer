import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TextProposal from "./TextProposal";
import ParameterChangeProposal from "./ParameterChangeProposal/ParameterChangeProposal";
import CommunityPoolSpendProposal from "./CommunityPoolSpendProposal";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import { Coin } from "@cosmjs/stargate";
import CoinsForm from "./Coins/CoinsForm";
import CoinItem from "./Coins/CoinItem";
import { TBaseSPMsg } from "../../../types/submitProposal";
import Spinner from "../../Loader/Spinner";
import { useDispatch } from "react-redux";
import { submitProposalReset } from "../../../redux/action-creator/submitProposal";

const SubmitProposal: React.FC = () => {
    const { broadcastResponse, error, fetching } = useTypedSelector((s) => s.submitProposal);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deposit, setDeposit] = useState<Coin[]>([]);

    const params: TBaseSPMsg = { title, description, deposit };

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(submitProposalReset());
        };
    }, []);
    return (
        <div className="submit-proposal">
            <h4 className="title">
                Submit Proposal
                {fetching && <Spinner />}
            </h4>

            {error && <div className={"error-label"}>Error: {error}</div>}
            {broadcastResponse && <h1 className={"success-label"}>Success</h1>}

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

                <div>
                    <div>
                        <label htmlFor={"deposit"}>Deposit</label>
                    </div>
                    <div id="deposit">
                        <CoinsForm addCoin={(d) => setDeposit([...deposit, d])} />
                        <div className={"coin-items"}>
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
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor={"proposal-tabs"}>Type Proposal</label>
                    </div>

                    <Tabs id={"proposal-tabs"}>
                        <TabList>
                            <Tab>TextProposal</Tab>
                            <Tab>ParameterChangeProposal</Tab>
                            <Tab>CommunityPoolSpendProposal</Tab>
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
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default SubmitProposal;
