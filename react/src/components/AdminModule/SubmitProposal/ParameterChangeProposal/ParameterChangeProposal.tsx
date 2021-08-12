import React, { useRef, useState } from "react";
import {
    ParamChange,
    ParameterChangeProposal as ParameterChangeProposalProc
} from "../../../../cosmos/codec/cosmos/params/v1beta1/params";
import ChangeForm from "./ParamChange/ChangeForm";
import ChangeItem from "./ParamChange/ChangeItem";
import { TBaseSPMsg } from "../../../../types/submitProposal";
import { useDispatch } from "react-redux";
import { submitProposal } from "../../../../redux/action-creator/submitProposal";

const ParameterChangeProposal: React.FC<TBaseSPMsg> = ({ title, description, deposit }) => {
    const [changes, setChanges] = useState<ParamChange[]>([]);
    const dispatch = useDispatch();
    const submitParameterChangeProposal = () =>
        dispatch(
            submitProposal(
                {
                    typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
                    value: ParameterChangeProposalProc.encode({
                        title,
                        description,
                        changes
                    }).finish()
                },
                deposit
            )
        );
    return (
        <div className={"param-change-proposal"}>
            <div>
                <label htmlFor="change-form">Add ParamChange</label>
                <div id={"change-form"}>
                    <ChangeForm addChange={(c) => setChanges([...changes, c])} />
                    <div className="change-table-list">
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
                    </div>
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
