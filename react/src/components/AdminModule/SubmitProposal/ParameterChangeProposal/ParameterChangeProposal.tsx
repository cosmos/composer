import React, { useRef, useState } from "react";
import {
    ParamChange,
    ParameterChangeProposal as ParameterChangeProposalProc
} from "../../../../cosmos/codec/cosmos/params/v1beta1/params";
import ChangeForm from "./ParamChange/ChangeForm";
import ChangeItem from "./ParamChange/ChangeItem";
import { TBaseSPMsg } from "../../../../types/submitProposal";
import { useDispatch } from "react-redux";
import {
    sendSubmitProposalError,
    setSubmitProposalError,
    submitProposal
} from "../../../../redux/action-creator/submitProposal";

const ParameterChangeProposal: React.FC<TBaseSPMsg> = ({
    title,
    description,
    deposit,
    validateDeposit
}) => {
    const [changes, setChanges] = useState<ParamChange[]>([
        { subspace: "staking", key: "", value: "" }
    ]);
    const dispatch = useDispatch();

    const validateChanges = (): boolean => {
        for (const c of changes) {
            if (c.value === "") {
                sendSubmitProposalError("No empty values allowed", dispatch);
                return false;
            }
        }
        return true;
    };

    const getModifiedChanges = () => {
        const shadowedChanges = [...changes];
        shadowedChanges.forEach(({ key, value }, i) => {
            let modifiedValue = value;
            // eslint-disable-next-line quotes
            if ((key === "UnbondingTime" || key === "DowntimeJailDuration") && value[0] !== '"') {
                modifiedValue = (+value * 1e9).toString();
            }

            if (
                value !== "true" &&
                value !== "false" &&
                value[0] !== "{" &&
                // eslint-disable-next-line quotes
                value[0] !== '"' &&
                key !== "MaxValidators" &&
                key !== "KeyMaxEntries" &&
                key !== "HistoricalEntries"
            ) {
                modifiedValue = `"${modifiedValue}"`;
            }
            shadowedChanges[i].value = modifiedValue;
        });
        console.log("modified", shadowedChanges);
        return shadowedChanges;
    };

    const submitParameterChangeProposal = () => {
        let valid = validateChanges();
        if (!valid) return;

        valid = validateDeposit(deposit);
        if (!valid) return;

        dispatch(
            submitProposal(
                {
                    typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
                    value: ParameterChangeProposalProc.encode({
                        title,
                        description,
                        changes: getModifiedChanges()
                    }).finish()
                },
                deposit
            )
        );
    };
    return (
        <div className={"param-change-proposal"}>
            <div>
                <label htmlFor="change-form">Add ParamChange</label>
                <div id={"change-form"}>
                    <ChangeForm changes={changes} setChanges={setChanges} />
                    {/* <div className="change-table-list">
                        {!!changes.length && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Subspace</th>
                                        <th>Key</th>
                                        <th>Value</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {changes.map((c, i) => (
                                        <ChangeItem
                                            key={i}
                                            change={c}
                                            deleteChange={() =>
                                                setChanges([
                                                    ...changes.slice(0, i),
                                                    ...changes.slice(i + 1)
                                                ])
                                            }
                                        />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div> */}
                </div>
            </div>
            <div>
                <button className={"btn-submit-proposal"} onClick={submitParameterChangeProposal}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ParameterChangeProposal;
