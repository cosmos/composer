import { ChainInfo } from "@keplr-wallet/types";
import { Bech32Address } from "@keplr-wallet/cosmos";

//testnet
const chainInfo: ChainInfo = {
    rpc: "http://localhost:26657",
    rest: "http://localhost:1317",
    chainId: "adminmodule",
    chainName: "TESTNET",
    stakeCurrency: {
        coinDenom: "STAKE",
        coinMinimalDenom: "stake",
        coinDecimals: 6
    },
    bip44: {
        coinType: 118
    },
    bech32Config: Bech32Address.defaultBech32Config("cosmos"),
    currencies: [
        {
            coinDenom: "STAKE",
            coinMinimalDenom: "stake",
            coinDecimals: 6
        }
    ],
    feeCurrencies: [
        {
            coinDenom: "STAKE",
            coinMinimalDenom: "stake",
            coinDecimals: 6
        }
    ],
    features: ["stargate", "ibc-transfer"]
};

// mainnet
// const chainInfo: ChainInfo = {
//     rpc: "https://rpc-cosmoshub.keplr.app",
//     rest: "https://lcd-cosmoshub.keplr.app",
//     chainId: "cosmoshub-4",
//     chainName: "Cosmos Hub",
//     stakeCurrency: {
//         coinDenom: "ATOM",
//         coinMinimalDenom: "uatom",
//         coinDecimals: 6,
//         coinGeckoId: "cosmos",
//         coinImageUrl: window.location.origin + "/public/assets/tokens/cosmos.svg"
//     },
//     bip44: {
//         coinType: 118
//     },
//     bech32Config: Bech32Address.defaultBech32Config("cosmos"),
//     currencies: [
//         {
//             coinDenom: "ATOM",
//             coinMinimalDenom: "uatom",
//             coinDecimals: 6,
//             coinGeckoId: "cosmos",
//             coinImageUrl: window.location.origin + "/public/assets/tokens/cosmos.svg"
//         }
//     ],
//     feeCurrencies: [
//         {
//             coinDenom: "ATOM",
//             coinMinimalDenom: "uatom",
//             coinDecimals: 6,
//             coinGeckoId: "cosmos",
//             coinImageUrl: window.location.origin + "/public/assets/tokens/cosmos.svg"
//         }
//     ],
//     coinType: 118,
//     features: ["stargate", "ibc-transfer"]
// };

export { chainInfo };
