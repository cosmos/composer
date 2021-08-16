import React from "react";
import { useDispatch } from "react-redux";
import { submitProposal } from "../../../redux/action-creator/submitProposal";
import { TextProposal as TextProposalProc } from "../../../cosmos/codec/cosmos/adminmodule/adminmodule/adminmodule";
import { TBaseSPMsg } from "../../../types/submitProposal";

const TextProposal: React.FC<TBaseSPMsg> = ({ title, description }) => {
    const dispatch = useDispatch();
    const submitTextProposal = () => {
        dispatch(
            submitProposal({
                typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                value: TextProposalProc.encode({
                    title,
                    description
                }).finish()
            })
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
