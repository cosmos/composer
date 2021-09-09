import { Reader, Writer } from "protobufjs/minimal";
import { Any } from "../google/protobuf/any";
export declare const protobufPackage = "cosmos.adminmodule.adminmodule";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgDeleteAdmin {
    creator: string;
    admin: string;
}
export interface MsgDeleteAdminResponse {}
export interface MsgAddAdmin {
    creator: string;
    admin: string;
}
export interface MsgAddAdminResponse {}
/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export interface MsgSubmitProposal {
    content: Any | undefined;
    proposer: string;
}
/** MsgSubmitProposalResponse defines the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
    proposalId: number;
}
export declare const MsgDeleteAdmin: {
    encode(message: MsgDeleteAdmin, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteAdmin;
    fromJSON(object: any): MsgDeleteAdmin;
    toJSON(message: MsgDeleteAdmin): unknown;
    fromPartial(object: DeepPartial<MsgDeleteAdmin>): MsgDeleteAdmin;
};
export declare const MsgDeleteAdminResponse: {
    encode(_: MsgDeleteAdminResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteAdminResponse;
    fromJSON(_: any): MsgDeleteAdminResponse;
    toJSON(_: MsgDeleteAdminResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteAdminResponse>): MsgDeleteAdminResponse;
};
export declare const MsgAddAdmin: {
    encode(message: MsgAddAdmin, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddAdmin;
    fromJSON(object: any): MsgAddAdmin;
    toJSON(message: MsgAddAdmin): unknown;
    fromPartial(object: DeepPartial<MsgAddAdmin>): MsgAddAdmin;
};
export declare const MsgAddAdminResponse: {
    encode(_: MsgAddAdminResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddAdminResponse;
    fromJSON(_: any): MsgAddAdminResponse;
    toJSON(_: MsgAddAdminResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddAdminResponse>): MsgAddAdminResponse;
};
export declare const MsgSubmitProposal: {
    encode(message: MsgSubmitProposal, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSubmitProposal;
    fromJSON(object: any): MsgSubmitProposal;
    toJSON(message: MsgSubmitProposal): unknown;
    fromPartial(object: DeepPartial<MsgSubmitProposal>): MsgSubmitProposal;
};
export declare const MsgSubmitProposalResponse: {
    encode(message: MsgSubmitProposalResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSubmitProposalResponse;
    fromJSON(object: any): MsgSubmitProposalResponse;
    toJSON(message: MsgSubmitProposalResponse): unknown;
    fromPartial(object: DeepPartial<MsgSubmitProposalResponse>): MsgSubmitProposalResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    DeleteAdmin(request: MsgDeleteAdmin): Promise<MsgDeleteAdminResponse>;
    AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse>;
    /** this line is used by starport scaffolding # proto/tx/rpc */
    SubmitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    DeleteAdmin(request: MsgDeleteAdmin): Promise<MsgDeleteAdminResponse>;
    AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse>;
    SubmitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin
    ? T
    : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T extends {}
    ? {
          [K in keyof T]?: DeepPartial<T[K]>;
      }
    : Partial<T>;
export {};
