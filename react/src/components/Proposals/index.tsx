import React, { useEffect } from "react";
import ProposalItem from "./ProposalItem";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchProposals } from "../../redux/action-creator/proposal";
import Spinner from "../Loader/Spinner";
import { initSettings } from "../../utills/initSettings";
import ModuleSwitch from "../ModuleSwitch/ModuleSwitch";
import { ModuleNames } from "../../types/settings";

const ProposalsPage: React.FC = () => {
    const { isFetchingProposals, proposals, error } = useTypedSelector((state) => state.proposal);
    const { stargateClient } = useTypedSelector((state) => state.wallet);
    const { settings } = useTypedSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        initSettings(dispatch);
    }, [dispatch]);

    useEffect(() => {
        if (!stargateClient) {
            // console.log("no client");
            return;
        }
        // console.log("got client");
        dispatch(fetchProposals());
    }, [stargateClient, settings.moduleName]);

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
                                <th>
                                    {settings.moduleName === ModuleNames.admin
                                        ? "Submit Time"
                                        : "Height"}
                                </th>
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
