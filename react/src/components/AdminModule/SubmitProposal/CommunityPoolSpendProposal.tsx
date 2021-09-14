import React, { useState } from "react";
import { Coin } from "@cosmjs/stargate";
import CoinsForm from "./Coins/CoinsForm";
import CoinItem from "./Coins/CoinItem";
import { TBaseSPMsg } from "../../../types/submitProposal";
import { submitProposal } from "../../../redux/action-creator/submitProposal";
import { useDispatch } from "react-redux";
import { CommunityPoolSpendProposal as CPSProposalProc } from "@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/distribution";

const CommunityPoolSpendProposal: React.FC<TBaseSPMsg> = ({ title, description, deposit }) => {
    const [amount, setAmount] = useState<Coin[]>([]);
    const [recipient, setRecipient] = useState("");

    const dispatch = useDispatch();
    const submitCPSProposal = () =>
        dispatch(
            submitProposal(
                {
                    typeUrl: "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal",
                    value: CPSProposalProc.encode({
                        title,
                        description,
                        amount,
                        recipient
                    }).finish()
                },
                deposit
            )
        );
    return (
        <div className={"cps-proposal"}>
            <div>
                <div>
                    <label htmlFor={"recipient"}>Recipient</label>
                </div>

                <input
                    className={"input-elem"}
                    id={"recipient"}
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    type={"text"}
                    placeholder={"cosmosxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
                />
            </div>
            <div>
                <div>
                    <label htmlFor={"amount"}>Amount</label>
                </div>
                <div id={"amount"}>
                    <CoinsForm addCoin={(d) => setAmount([...amount, d])} />
                    <div className={"coin-items"}>
                        {amount.map((a, i) => (
                            <CoinItem
                                key={i}
                                deposit={a}
                                deleteDeposit={() =>
                                    setAmount([...amount.slice(0, i), ...amount.slice(i + 1)])
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <button className={"btn-submit-proposal"} onClick={submitCPSProposal}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CommunityPoolSpendProposal;
