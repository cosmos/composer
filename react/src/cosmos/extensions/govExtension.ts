import { createProtobufRpcClient } from "@cosmjs/stargate/build/queries/utils";
import { QueryClientImpl } from "../codec/cosmos/gov/v1beta1/query";
import { QueryClient } from "@cosmjs/stargate";
import { ProposalStatus } from "../codec/cosmos/gov/v1beta1/gov";
import Long from "long";

export function setupGovExtension(base: QueryClient) {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        gov: {
            unverified: {
                params: async (paramsType: string) => {
                    return await queryService.Params({ paramsType: paramsType });
                },
                proposals: async (
                    proposalStatus: ProposalStatus,
                    voter: string,
                    depositor: string
                ) => {
                    const { proposals } = await queryService.Proposals({
                        proposalStatus: proposalStatus,
                        voter: voter,
                        depositor: depositor
                    });
                    return proposals;
                },
                proposal: async (proposalId: Long) => {
                    return await queryService.Proposal({ proposalId: proposalId });
                },
                vote: async (proposalId: Long, voter: string) => {
                    return await queryService.Vote({ proposalId: proposalId, voter: voter });
                },
                votes: async (proposalId: Long) => {
                    const { votes } = await queryService.Votes({ proposalId: proposalId });
                    return votes;
                },
                deposit: async (proposalId: Long, depositor: string) => {
                    return await queryService.Deposit({
                        proposalId: proposalId,
                        depositor: depositor
                    });
                },
                deposits: async (proposalId: Long) => {
                    const { deposits } = await queryService.Deposits({ proposalId: proposalId });
                    return deposits;
                },
                tallyResult: async (proposalId: Long) => {
                    return await queryService.TallyResult({ proposalId: proposalId });
                }
            }
        }
    };
}

// export interface StakingExtension {
//     readonly staking: {
//         delegation: (delegatorAddress: string, validatorAddress: string) => Promise<QueryDelegationResponse>;
//         delegatorDelegations: (delegatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryDelegatorDelegationsResponse>;
//         delegatorUnbondingDelegations: (delegatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryDelegatorUnbondingDelegationsResponse>;
//         delegatorValidator: (delegatorAddress: string, validatorAddress: string) => Promise<QueryDelegatorValidatorResponse>;
//         delegatorValidators: (delegatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryDelegatorValidatorsResponse>;
//         historicalInfo: (height: number) => Promise<QueryHistoricalInfoResponse>;
//         params: () => Promise<QueryParamsResponse>;
//         pool: () => Promise<QueryPoolResponse>;
//         redelegations: (delegatorAddress: string, sourceValidatorAddress: string, destinationValidatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryRedelegationsResponse>;
//         unbondingDelegation: (delegatorAddress: string, validatorAddress: string) => Promise<QueryUnbondingDelegationResponse>;
//         validator: (validatorAddress: string) => Promise<QueryValidatorResponse>;
//         validatorDelegations: (validatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryValidatorDelegationsResponse>;
//         validators: (status: BondStatusString, paginationKey?: Uint8Array) => Promise<QueryValidatorsResponse>;
//         validatorUnbondingDelegations: (validatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryValidatorUnbondingDelegationsResponse>;
//     };
// }
