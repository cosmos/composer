import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// @ts-ignore
import DateTimePicker from "react-datetime-picker";
import { submitProposal } from "../../../redux/action-creator/submitProposal";
import {
    Plan,
    SoftwareUpgradeProposal as SoftwareUpgradeProposalProc
} from "../../../cosmos/codec/cosmos/upgrade/upgrade";
import { TBaseSPMsg } from "../../../types/submitProposal";

const SoftwareUpgradeProposal: React.FC<TBaseSPMsg> = ({
    title,
    description,
    deposit,
    validateDeposit
}) => {
    const [plan, setPlan] = useState({} as Plan);
    const dispatch = useDispatch();
    const submitSoftwareUpgradeProposal = () => {
        const valid = validateDeposit(deposit);
        if (!valid) return;

        dispatch(
            submitProposal(
                {
                    typeUrl: "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal",
                    value: SoftwareUpgradeProposalProc.encode({
                        title,
                        description,
                        plan
                    }).finish()
                },
                deposit
            )
        );
    };

    useEffect(() => {
        if (plan.time === null) {
            plan.time = undefined!;
        }
    }, [plan]);

    return (
        <div>
            <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                className="plan-form">
                <div style={{ fontWeight: "bold", fontSize: 20 }}>Plan</div>
                <label className="plan-form__label" htmlFor="plan-name">
                    Name
                    <input
                        id="plan-name"
                        name="plan-name"
                        value={plan.name}
                        onChange={({ target }) => setPlan({ ...plan, name: target.value })}
                        type="text"
                        className="plan-form__input"
                    />
                </label>
                <label className="plan-form__label" htmlFor="plan-height">
                    Height
                    <input
                        id="plan-height"
                        name="plan-height"
                        value={plan.height}
                        onChange={({ target }) => setPlan({ ...plan, height: +target.value })}
                        type="text"
                        className="plan-form__input"
                    />
                </label>
                <label className="plan-form__label" htmlFor="plan-info">
                    Info
                    <textarea
                        id="plan-info"
                        name="plan-info"
                        value={plan.info}
                        onChange={({ target }) => setPlan({ ...plan, info: target.value })}
                        cols={40}
                        rows={5}
                        className="plan-form__input"
                    />
                </label>
                <label className="plan-form__label" htmlFor="plan-time">
                    Time
                    <DateTimePicker
                        onChange={(val: Date) => setPlan({ ...plan, time: val })}
                        value={plan.time}
                    />
                </label>
            </div>
            <button className={"btn-submit-proposal"} onClick={submitSoftwareUpgradeProposal}>
                Submit
            </button>
        </div>
    );
};

export default SoftwareUpgradeProposal;
