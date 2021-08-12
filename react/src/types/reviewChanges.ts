export interface ReviewChangesState {
    loading: boolean;
    error: string | null;
    modules: IModules;
}

export enum ReviewChangesActionTypes {
    SET_PARAMS = "SET_PARAMS",
    SET_LOADING = "SET_LOADING",
    ERROR = "ERROR",
    CLEAR_ERROR = "CLEAR_ERROR"
}

export type ReviewChangesActions = FetchAction | SetLoadingAction | ErrorAction | ClearErrorAction;

export interface FetchAction {
    type: ReviewChangesActionTypes.SET_PARAMS;
    payload: {
        bank: BankParams;
        distribution: DistributionParams;
        gov: GovParams;
        slashing: SlashingParams;
        staking: StakingParams;
    };
}

export interface SetLoadingAction {
    type: ReviewChangesActionTypes.SET_LOADING;
    payload: { loading: boolean };
}

export interface ErrorAction {
    type: ReviewChangesActionTypes.ERROR;
    payload: { error: string };
}

export interface ClearErrorAction {
    type: ReviewChangesActionTypes.CLEAR_ERROR;
}

export interface IModules {
    bank: BankParams;
    distribution: DistributionParams;
    gov: GovParams;
    slashing: SlashingParams;
    staking: StakingParams;
}

export interface BankParams {
    send_enabled: {
        denom: string;
        enabled: boolean;
    }[];
    default_send_enabled: boolean;
}

export interface DistributionParams {
    community_tax: string;
    base_proposer_reward: string;
    bonus_proposer_reward: string;
    withdraw_addr_enabled: boolean;
}

export interface GovParams {
    voting_params: {
        voting_period: string;
    };
    deposit_params: {
        min_deposit: {
            denom: string;
            amount: string;
        }[];
        max_deposit_period: string;
    };
    tally_params: {
        quorum: string;
        threshold: string;
        veto_threshold: string;
    };
}

export interface SlashingParams {
    signed_blocks_window: string;
    min_signed_per_window: string;
    downtime_jail_duration: string;
    slash_fraction_double_sign: string;
    slash_fraction_downtime: string;
}

export interface StakingParams {
    unbonding_time: string;
    max_validators: number;
    max_entries: number;
    historical_entries: number;
    bond_denom: string;
}
