import React, { useEffect } from "react";
import ProposalItem from "./ProposalItem";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchProposals } from "../../redux/action-creator/proposal";
import Spinner from "../Loader/Spinner";
import { initSettings } from "../../utills/initSettings";
import ModuleSwitch from "../ModuleSwitch/ModuleSwitch";

const ProposalsPage: React.FC = () => {
    const { isFetchingProposals, proposals, error } = useTypedSelector((state) => state.proposal);
    const dispatch = useDispatch();

    useEffect(() => {
        initSettings(dispatch);

        dispatch(fetchProposals());
    }, [dispatch]);

    return (
        <div className="proposals">
            <div className="header">
                <h4 className="title">
                    Proposals
                    {isFetchingProposals && <Spinner />}
                </h4>

                <ModuleSwitch />
            </div>

            <div className="container">
                {error ? error : null}
                {proposals && (
                    <table>
                        <thead>
                            <tr>
                                <th>Proposal ID</th>
                                <th>Title</th>
                                <th>Proposal Type</th>
                                <th>Submit Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proposals.map((p) => (
                                <ProposalItem proposal={p} key={p.proposal_id} />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProposalsPage;
