import { Writer, Reader } from 'protobufjs/minimal';
import { Any } from '../google/protobuf/any';
export declare const protobufPackage = "cosmos.adminmodule.adminmodule";
/**
 * TextProposal defines a standard text proposal whose changes need to be
 * manually updated in case of approval.
 */
export interface TextProposal {
    title: string;
    description: string;
}
/** Proposal defines the core field members of a governance proposal. */
export interface Proposal {
    proposalId: number;
    content: Any | undefined;
    submitTime: Date | undefined;
}
export declare const TextProposal: {
    encode(message: TextProposal, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): TextProposal;
    fromJSON(object: any): TextProposal;
    toJSON(message: TextProposal): unknown;
    fromPartial(object: DeepPartial<TextProposal>): TextProposal;
};
export declare const Proposal: {
    encode(message: Proposal, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Proposal;
    fromJSON(object: any): Proposal;
    toJSON(message: Proposal): unknown;
    fromPartial(object: DeepPartial<Proposal>): Proposal;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
