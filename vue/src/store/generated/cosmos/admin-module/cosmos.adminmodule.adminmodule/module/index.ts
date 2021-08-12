// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgSubmitProposal } from "./types/adminmodule/tx";
import { MsgAddAdmin } from "./types/adminmodule/tx";
import { MsgDeleteAdmin } from "./types/adminmodule/tx";


const types = [
  ["/cosmos.adminmodule.adminmodule.MsgSubmitProposal", MsgSubmitProposal],
  ["/cosmos.adminmodule.adminmodule.MsgAddAdmin", MsgAddAdmin],
  ["/cosmos.adminmodule.adminmodule.MsgDeleteAdmin", MsgDeleteAdmin],
  
];
export const MissingWalletError = new Error("wallet is required");

const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;

  const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgSubmitProposal: (data: MsgSubmitProposal): EncodeObject => ({ typeUrl: "/cosmos.adminmodule.adminmodule.MsgSubmitProposal", value: data }),
    msgAddAdmin: (data: MsgAddAdmin): EncodeObject => ({ typeUrl: "/cosmos.adminmodule.adminmodule.MsgAddAdmin", value: data }),
    msgDeleteAdmin: (data: MsgDeleteAdmin): EncodeObject => ({ typeUrl: "/cosmos.adminmodule.adminmodule.MsgDeleteAdmin", value: data }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
