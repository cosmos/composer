import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchParamsList } from "../../redux/action-creator/reviewChanges";
import { useTypedSelector } from "../../redux/useTypedSelector";
import Spinner from "../Loader/Spinner";
import ModuleSection from "./ModuleSection";

const ReviewState = () => {
    const dispatch = useDispatch();
    const { bank, distribution, gov, slashing, staking } = useTypedSelector(
        (state) => state.reviewChanges.modules
    );
    const { error, loading } = useTypedSelector((state) => state.reviewChanges);
    useEffect(() => {
        dispatch(fetchParamsList());
    }, []);
    return (
        <div className="review-changes">
            <h4 className="review-changes__title">Review State Changes {loading && <Spinner />}</h4>
            {error}
            <div className="review-changes__list">
                <ModuleSection title="Bank">
                    <ul>
                        <li>Default Send Enabled: {bank?.default_send_enabled.toString()}</li>
                        <li>Send Enabled(array): {bank?.send_enabled?.toString()}</li>
                    </ul>
                </ModuleSection>

                <ModuleSection title="Distribution">
                    <ul>
                        <li>Base Proposer Reward: {distribution?.base_proposer_reward}</li>
                        <li>Bonus Proposer Reward: {distribution?.bonus_proposer_reward}</li>
                        <li>Community Tax: {distribution?.community_tax}</li>
                        <li>
                            Withdraw Addr Enabled: {distribution?.withdraw_addr_enabled?.toString()}
                        </li>
                    </ul>
                </ModuleSection>

                <ModuleSection title="Governance">
                    <ul>
                        <li>
                            Deposit Params:
                            <ul>
                                <li>
                                    Min Deposit:{" "}
                                    <ul>
                                        {gov?.deposit_params?.min_deposit?.map((d) => (
                                            <>
                                                <li>Amount: {d.amount}</li>
                                                <li>Denom: {d.denom}</li>
                                            </>
                                        ))}
                                    </ul>{" "}
                                </li>
                                <li>
                                    Max Deposit Period: {gov?.deposit_params?.max_deposit_period}
                                </li>
                            </ul>
                        </li>
                        <li>
                            Voting Params:
                            <ul>
                                <li>Voting Period: {gov?.voting_params?.voting_period}</li>
                            </ul>
                        </li>
                        <li>
                            Tallying Params:
                            <ul>
                                <li>Quorum: {gov?.tally_params?.quorum}</li>
                                <li>Threshold: {gov?.tally_params?.threshold}</li>
                                <li>Veto Theshold: {gov?.tally_params?.veto_threshold}</li>
                            </ul>
                        </li>
                    </ul>
                </ModuleSection>

                <ModuleSection title="Slashing">
                    <ul>
                        <li>Downtime Jail Duration: {slashing?.downtime_jail_duration}</li>
                        <li>Min Signed Per Window: {slashing?.min_signed_per_window}</li>
                        <li>Signed Blocks Window: {slashing?.signed_blocks_window}</li>
                        <li>Slash Fraction Double Sign: {slashing?.slash_fraction_double_sign}</li>
                        <li>Slash Fraction Downtime: {slashing?.slash_fraction_downtime}</li>
                    </ul>
                </ModuleSection>

                <ModuleSection title="Staking">
                    <ul>
                        <li>Bond Denom: {staking?.bond_denom}</li>
                        <li>Historical Entries: {staking?.historical_entries}</li>
                        <li>Max Entries: {staking?.max_entries}</li>
                        <li>Max Validators: {staking?.max_validators}</li>
                        <li>Unbonding Time: {staking?.unbonding_time}</li>
                    </ul>
                </ModuleSection>
            </div>
        </div>
    );
};

export default ReviewState;
