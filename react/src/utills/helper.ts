import axios from "axios";

import { decodeTxRaw, Registry } from "@cosmjs/proto-signing";
import { ProposalUrls } from "../types/settings";
import { TextProposal } from "../cosmos/codec/cosmos/gov/v1beta1/gov";
import { ProposalTypes } from "../types/proposal";
import { CommunityPoolSpendProposal } from "@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/distribution";
import { SoftwareUpgradeProposal } from "../cosmos/codec/cosmos/upgrade/upgrade";
import { ParameterChangeProposal } from "../cosmos/codec/cosmos/params/v1beta1/params";

export const getModulesList = async (rpcEndpoint: string): Promise<string[]> => {
    const resp = await axios.get(`${rpcEndpoint}/genesis`);
    return Object.keys(resp.data.result.genesis.app_state);
};

export const adminModuleConnected = async (rpcEndpoint: string): Promise<boolean> => {
    const moduleList = await getModulesList(rpcEndpoint);
    return moduleList.includes("adminmodule");
};

export const getProposalsHistory = async (
    rpcEndpoint: string,
    registry: Registry
): Promise<any[]> => {
    const txs = await axios.get(
        `${rpcEndpoint}/tx_search?query="message.action='submit_proposal'"`
    );
    console.log("txs", txs);
    const parsedTxs = [];
    for (const tx of txs.data.result.txs) {
        parsedTxs.push(parseTx(tx.tx, registry));
    }

    return parsedTxs;
};

export const parseTx = (tx: any, registry: Registry) => {
    const decoded = decodeTxRaw(bytesFromBase64(tx));
    let parsedData;

    for (const message of decoded.body.messages) {
        if (message.typeUrl === ProposalUrls.gov || ProposalUrls.admin) {
            const decodedMsg = registry.decode(message);

            switch (decodedMsg.content.typeUrl) {
                case ProposalTypes.text:
                    decodedMsg.content.value = TextProposal.decode(decodedMsg.content.value);
                    break;
                case ProposalTypes.upgrade:
                    decodedMsg.content.value = SoftwareUpgradeProposal.decode(
                        decodedMsg.content.value
                    );
                    break;
                case ProposalTypes.poolSpend:
                    decodedMsg.content.value = CommunityPoolSpendProposal.decode(
                        decodedMsg.content.value
                    );
                    break;
                case ProposalTypes.paramChange:
                    decodedMsg.content.value = ParameterChangeProposal.decode(
                        decodedMsg.content.value
                    );
                    break;
                default:
                    break;
            }
            parsedData = decodedMsg;
        }
    }

    return parsedData;
};

function bytesFromBase64(b64: string): Uint8Array {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}


export const isAuthzEnabled = async (rpc: string): Promise<boolean> => {
    const { data } = await axios.get(`${rpc}/genesis`);
    if (!data.result.genesis.app_state.authz) return false;

    return true;
};

