// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgDeleteAdmin } from "./types/adminmodule/tx";
import { MsgSubmitProposal } from "./types/adminmodule/tx";
import { MsgAddAdmin } from "./types/adminmodule/tx";
const types = [
    ["/cosmos.adminmodule.adminmodule.MsgDeleteAdmin", MsgDeleteAdmin],
    ["/cosmos.adminmodule.adminmodule.MsgSubmitProposal", MsgSubmitProposal],
    ["/cosmos.adminmodule.adminmodule.MsgAddAdmin", MsgAddAdmin],
];
export const MissingWalletError = new Error("wallet is required");
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgDeleteAdmin: (data) => ({ typeUrl: "/cosmos.adminmodule.adminmodule.MsgDeleteAdmin", value: data }),
        msgSubmitProposal: (data) => ({ typeUrl: "/cosmos.adminmodule.adminmodule.MsgSubmitProposal", value: data }),
        msgAddAdmin: (data) => ({ typeUrl: "/cosmos.adminmodule.adminmodule.MsgAddAdmin", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
