/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp";
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Any } from "../google/protobuf/any";

export const protobufPackage = "cosmos.adminmodule.adminmodule";

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

const baseTextProposal: object = { title: "", description: "" };

export const TextProposal = {
    encode(message: TextProposal, writer: Writer = Writer.create()): Writer {
        if (message.title !== "") {
            writer.uint32(10).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        return writer;
    },

    decode(input: Reader | Uint8Array, length?: number): TextProposal {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTextProposal } as TextProposal;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.title = reader.string();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): TextProposal {
        const message = { ...baseTextProposal } as TextProposal;
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title);
        } else {
            message.title = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        } else {
            message.description = "";
        }
        return message;
    },

    toJSON(message: TextProposal): unknown {
        const obj: any = {};
        message.title !== undefined && (obj.title = message.title);
        message.description !== undefined && (obj.description = message.description);
        return obj;
    },

    fromPartial(object: DeepPartial<TextProposal>): TextProposal {
        const message = { ...baseTextProposal } as TextProposal;
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title;
        } else {
            message.title = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        } else {
            message.description = "";
        }
        return message;
    }
};

const baseProposal: object = { proposalId: 0 };

export const Proposal = {
    encode(message: Proposal, writer: Writer = Writer.create()): Writer {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.content !== undefined) {
            Any.encode(message.content, writer.uint32(18).fork()).ldelim();
        }
        if (message.submitTime !== undefined) {
            Timestamp.encode(toTimestamp(message.submitTime), writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },

    decode(input: Reader | Uint8Array, length?: number): Proposal {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseProposal } as Proposal;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = longToNumber(reader.uint64() as Long);
                    break;
                case 2:
                    message.content = Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.submitTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Proposal {
        const message = { ...baseProposal } as Proposal;
        if (object.proposalId !== undefined && object.proposalId !== null) {
            message.proposalId = Number(object.proposalId);
        } else {
            message.proposalId = 0;
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = Any.fromJSON(object.content);
        } else {
            message.content = undefined;
        }
        if (object.submitTime !== undefined && object.submitTime !== null) {
            message.submitTime = fromJsonTimestamp(object.submitTime);
        } else {
            message.submitTime = undefined;
        }
        return message;
    },

    toJSON(message: Proposal): unknown {
        const obj: any = {};
        message.proposalId !== undefined && (obj.proposalId = message.proposalId);
        message.content !== undefined &&
            (obj.content = message.content ? Any.toJSON(message.content) : undefined);
        message.submitTime !== undefined &&
            (obj.submitTime =
                message.submitTime !== undefined ? message.submitTime.toISOString() : null);
        return obj;
    },

    fromPartial(object: DeepPartial<Proposal>): Proposal {
        const message = { ...baseProposal } as Proposal;
        if (object.proposalId !== undefined && object.proposalId !== null) {
            message.proposalId = object.proposalId;
        } else {
            message.proposalId = 0;
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = Any.fromPartial(object.content);
        } else {
            message.content = undefined;
        }
        if (object.submitTime !== undefined && object.submitTime !== null) {
            message.submitTime = object.submitTime;
        } else {
            message.submitTime = undefined;
        }
        return message;
    }
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    if (typeof global !== "undefined") return global;
    throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
    ? T
    : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T extends {}
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : Partial<T>;

function toTimestamp(date: Date): Timestamp {
    const seconds = date.getTime() / 1_000;
    const nanos = (date.getTime() % 1_000) * 1_000_000;
    return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
    let millis = t.seconds * 1_000;
    millis += t.nanos / 1_000_000;
    return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
    if (o instanceof Date) {
        return o;
    } else if (typeof o === "string") {
        return new Date(o);
    } else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}

function longToNumber(long: Long): number {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}

// if (util.Long !== Long) {
util.Long = Long as any;
configure();
// }
