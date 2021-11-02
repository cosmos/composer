import {
    AuthExtension,
    BankExtension,
    DistributionExtension,
    GovExtension,
    LcdClient,
    MintExtension,
    SlashingExtension,
    StakingExtension,
    SupplyExtension
} from "@cosmjs/launchpad";

export const remoteSettings: RemoteNode[] = [
    {
        rpc: "https://rpc-cosmoshub.keplr.app",
        rest: "https://lcd-cosmoshub.keplr.app",
        chainId: "cosmoshub-4",
        chainName: "Cosmos"
    },
    {
        rpc: "https://rpc-osmosis.keplr.app",
        rest: "https://lcd-osmosis.keplr.app",
        chainId: "osmosis-1",
        chainName: "Osmosis"
    },
    {
        rpc: "https://rpc-secret.keplr.app",
        rest: "https://lcd-secret.keplr.app",
        chainId: "secret-3",
        chainName: "Secret Network"
    },
    {
        rpc: "https://rpc-akash.keplr.app",
        rest: "https://lcd-akash.keplr.app",
        chainId: "akashnet-2",
        chainName: "Akash"
    },
    {
        rpc: "https://rpc-crypto-org.keplr.app",
        rest: "https://lcd-crypto-org.keplr.app",
        chainId: "crypto-org-chain-mainnet-1",
        chainName: "Crypto.org"
    },
    {
        rpc: "https://rpc-iov.keplr.app",
        rest: "https://lcd-iov.keplr.app",
        chainId: "iov-mainnet-ibc",
        chainName: "Starname"
    },
    {
        rpc: "https://rpc-sifchain.keplr.app",
        rest: "https://lcd-sifchain.keplr.app/",
        chainId: "sifchain-1",
        chainName: "Sifchain"
    },
    {
        rpc: "https://rpc-certik.keplr.app",
        rest: "https://lcd-certik.keplr.app",
        chainId: "shentu-2.2",
        chainName: "Certik"
    },
    {
        rpc: "https://rpc-iris.keplr.app",
        rest: "https://lcd-iris.keplr.app",
        chainId: "irishub-1",
        chainName: "IRISnet"
    },
    {
        rpc: "https://rpc-regen.keplr.app",
        rest: "https://lcd-regen.keplr.app",
        chainId: "regen-1",
        chainName: "Regen"
    },
    {
        rpc: "https://rpc-persistence.keplr.app",
        rest: "https://lcd-persistence.keplr.app",
        chainId: "core-1",
        chainName: "Persistence"
    },
    {
        rpc: "https://rpc-sentinel.keplr.app",
        rest: "https://lcd-sentinel.keplr.app",
        chainId: "sentinelhub-2",
        chainName: "Sentinel"
    },
    {
        rpc: "https://rpc-impacthub.keplr.app",
        rest: "https://lcd-impacthub.keplr.app",
        chainId: "impacthub-3",
        chainName: "ixo"
    },
    {
        rpc: "https://rpc-emoney.keplr.app",
        rest: "https://lcd-emoney.keplr.app",
        chainId: "emoney-3",
        chainName: "e-Money"
    }
];

export enum ModuleNames {
    gov = "gov",
    admin = "admin"
}

export enum ProposalUrls {
    admin = "/cosmos.adminmodule.adminmodule.MsgSubmitProposal",
    gov = "/cosmos.gov.v1beta1.MsgSubmitProposal"
}

export interface RemoteNode {
    chainId: string;
    chainName: string;
    rpc: string;
    rest: string;
}

export interface FetchAction {
    type: SettingsActionTypes.SET_SETTINGS;
    payload: Omit<SettingsState, "moduleName">;
}

export interface ModuleNameAction {
    type: SettingsActionTypes.SET_MODULE;
    payload: {
        moduleName: ModuleNames;
    };
}

// export interface SetLoadingAction {
//     type: SettingsActionTypes.SET_LOADING;
//     payload: { loading: boolean };
// }

// export interface ErrorAction {
//     type: SettingsActionTypes.ERROR;
//     payload: { error: string };
// }

// export interface ClearErrorAction {
//     type: SettingsActionTypes.CLEAR_ERROR;
// }

export type SettingsActions = FetchAction | ModuleNameAction;

export enum SettingsActionTypes {
    SET_SETTINGS = "SET_SETTINGS",
    SET_MODULE = "SET_MODULE"
    // SET_LOADING = "SET_LOADING",
    // ERROR = "ERROR",
    // CLEAR_ERROR = "CLEAR_ERROR"
}

export interface SettingsState {
    rpc: string;
    rest: string;
    chainId: string;
    chainName: string;
    lcdClient: LcdClient &
        AuthExtension &
        BankExtension &
        DistributionExtension &
        GovExtension &
        MintExtension &
        SlashingExtension &
        StakingExtension &
        SupplyExtension;
    moduleName: ModuleNames;
}
