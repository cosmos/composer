import React from "react";
import { useDispatch } from "react-redux";
import { submitProposal } from "../../../redux/action-creator/submitProposal";
import { TextProposal as TextProposalProc } from "../../../cosmos/codec/cosmos/adminmodule/adminmodule/adminmodule";
import { TBaseSPMsg } from "../../../types/submitProposal";

const TextProposal: React.FC<TBaseSPMsg> = ({ title, description, deposit, validateDeposit }) => {
    const dispatch = useDispatch();
    const submitTextProposal = () => {
        const valid = validateDeposit(deposit);
        if (!valid) return;

        dispatch(
            submitProposal(
                {
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: TextProposalProc.encode({
                        title,
                        description
                    }).finish()
                },
                deposit
            )
        );
    };
    return (
        <div>
            <button className={"btn-submit-proposal"} onClick={submitTextProposal}>
                Submit
            </button>
        </div>
    );
};

export default TextProposal;
