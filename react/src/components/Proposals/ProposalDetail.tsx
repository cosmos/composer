import React, { useEffect } from "react";
import { Markdown } from "react-showdown";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import {
    // fetchProposalDetail,
    fetchProposals
    // proposalDetailReset
} from "../../redux/action-creator/proposal";
import { routes } from "../../router";
import Spinner from "../Loader/Spinner";
import { Deposit, Tally } from "@cosmjs/launchpad/build/lcdapi/gov";
import { CoinPretty, Dec } from "@keplr-wallet/unit";
import { toPrettyDate } from "../../utills/toPrettyDate";
import { chainInfo } from "../../config";
import { ScrollToTopOnMount } from "../ScrollToTopOnMount";
import { toPrettyCoin } from "../../utills/toPrettyCoin";
import { toProposalStatus } from "../../utills/toProposalStatus";
import { ParamChange } from "../../cosmos/codec/cosmos/params/v1beta1/params";
import {
    isACommunityPoolSpendProposalContent,
    isAParameterChangeProposalContent
} from "../../types/proposal";
import { ModuleNames } from "../../types/settings";

const ProposalDetail: React.FC = () => {
    const history = useHistory();
    const {
        params: { id }
    } = useRouteMatch<{ id: string }>();

    const { proposals, isFetchingProposals, isFetchingItem, error } = useTypedSelector(
        (state) => state.proposal
    );
    const settings = useTypedSelector((state) => state.settings);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!proposals) {
            dispatch(fetchProposals());
        }
        // dispatch(fetchProposalDetail(id));
        // return () => {
        //     dispatch(proposalDetailReset());
        // };
    }, [dispatch, id, proposals]);

    const proposal = proposals?.find((p) => p.proposal_id === id);
    if (!proposal && !isFetchingProposals && proposals) {
        history.push(routes.proposals);
    }

    return (
        <div className={"item-content"}>
            <ScrollToTopOnMount />
            {isFetchingProposals && <Spinner />}
            {error}
            {proposal && (
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <span> Proposal ID</span>
                            </td>
                            <td>{proposal.proposal_id}</td>
                        </tr>

                        {/*<tr>*/}
                        {/*    <td>*/}
                        {/*        <span>Proposer</span>*/}
                        {/*    </td>*/}
                        {/*    <td>*/}
                        {/*        {isFetchingItem ? (*/}
                        {/*            <Spinner />*/}
                        {/*        ) : (*/}
                        {/*            proposalDetail?.proposer || "no data"*/}
                        {/*        )}*/}
                        {/*    </td>*/}
                        {/*</tr>*/}

                        <tr>
                            <td>
                                <span>Title</span>
                            </td>
                            <td>{proposal.content.title}</td>
                        </tr>

                        <tr>
                            <td>
                                <span>Description</span>
                            </td>
                            <td>
                                <Markdown markdown={proposal.content.description} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <span>Proposal Type</span>
                            </td>
                            <td>{proposal.content["@type"]}</td>
                        </tr>

                        {/*<tr>*/}
                        {/*    <td>*/}
                        {/*        <span>Proposal Status</span>*/}
                        {/*    </td>*/}
                        {/*    <td>{toProposalStatus(proposal.proposal_status || proposal.status)}</td>*/}
                        {/*</tr>*/}

                        {isACommunityPoolSpendProposalContent(proposal.content) && (
                            <>
                                <tr>
                                    <td>
                                        <span>Recipient</span>
                                    </td>
                                    <td>{proposal.content.recipient}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Amount</span>
                                    </td>
                                    <td>
                                        {proposal.content.amount.map((am, i) => (
                                            <li key={i}>
                                                {toPrettyCoin(am.amount, am.denom).toString()}
                                            </li>
                                        ))}
                                    </td>
                                </tr>
                            </>
                        )}

                        {/*<tr>*/}
                        {/*    <td>*/}
                        {/*        <span>Deposit</span>*/}
                        {/*    </td>*/}
                        {/*    <td>*/}
                        {/*        {isFetchingItem ? (*/}
                        {/*            <Spinner />*/}
                        {/*        ) : (*/}
                        {/*            <Deposits deposits={proposalDetail?.deposits} />*/}
                        {/*        )}*/}
                        {/*    </td>*/}
                        {/*</tr>*/}

                        {/*<tr>*/}
                        {/*    <td>*/}
                        {/*        <span>Tally Result</span>*/}
                        {/*    </td>*/}
                        {/*    <td>{<TallyResultTable results={proposal.final_tally_result} />}</td>*/}
                        {/*</tr>*/}

                        {isAParameterChangeProposalContent(proposal.content) && (
                            <tr>
                                <td>
                                    <span>Changes</span>
                                </td>
                                <td>
                                    <ChangesTable changes={proposal.content.changes} />
                                </td>
                            </tr>
                        )}

                        <tr>
                            <td>
                                <span>
                                    {settings.moduleName === ModuleNames.admin
                                        ? "Submit Time"
                                        : "Height"}
                                </span>
                            </td>
                            <td>
                                {settings.moduleName === ModuleNames.admin
                                    ? toPrettyDate(proposal.submit_time)
                                    : proposal.height}
                            </td>
                        </tr>

                        {/*<tr>*/}
                        {/*    <td>*/}
                        {/*        <span>Deposit End Time</span>*/}
                        {/*    </td>*/}
                        {/*    <td>{toPrettyDate(proposal.deposit_end_time)}</td>*/}
                        {/*</tr>*/}

                        {/*<tr>*/}
                        {/*    <td>*/}
                        {/*        <span>Voting Start Time</span>*/}
                        {/*    </td>*/}
                        {/*    <td>{toPrettyDate(proposal.voting_start_time)}</td>*/}
                        {/*</tr>*/}

                        {/*<tr>*/}
                        {/*    <td>*/}
                        {/*        <span>End Voting Time</span>*/}
                        {/*    </td>*/}
                        {/*    <td>{toPrettyDate(proposal.deposit_end_time)}</td>*/}
                        {/*</tr>*/}
                    </tbody>
                </table>
            )}
        </div>
    );
};
const TallyResultTable: React.FC<{ results: Tally }> = ({ results }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Yes</td>
                    <td>{results.yes}</td>
                </tr>
                <tr>
                    <td>No</td>
                    <td>{results.no}</td>
                </tr>
                <tr>
                    <td>Abstain</td>
                    <td>{results.abstain}</td>
                </tr>
                <tr>
                    <td>No with veto</td>
                    <td>{results.no_with_veto}</td>
                </tr>
            </tbody>
        </table>
    );
};
const ChangesTable: React.FC<{ changes: ParamChange[] }> = ({ changes }) => {
    return (
        <div className="change-table">
            <table>
                <thead>
                    <tr>
                        <th>Subspace</th>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {changes.map((change, i) => (
                        <tr key={i}>
                            <td>{change.subspace}</td>
                            <td>{change.key}</td>
                            <td>{change.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Deposits: React.FC<{ deposits: readonly Deposit[] | null | undefined }> = ({ deposits }) => {
    if (!deposits) {
        return <>no data</>;
    }
    const decToCoin = (amount: Dec): string => {
        return new CoinPretty(chainInfo.currencies[0], amount).trim(true).toString();
    };
    let sum: Dec = new Dec(0);
    deposits.map((d) => d.amount.map((a) => (sum = sum.add(new Dec(a.amount)))));

    return (
        <div>
            {decToCoin(sum)}
            <ol>
                {deposits.map((d, i) => {
                    return (
                        <li key={i}>
                            <div>{d.depositor}</div>
                            {d.amount.map((amount, j) => {
                                return <div key={j}>{decToCoin(new Dec(amount.amount))}</div>;
                            })}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default ProposalDetail;
