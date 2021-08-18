/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp";
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Any } from "../google/protobuf/any";
export const protobufPackage = "cosmos.adminmodule.adminmodule";
const baseTextProposal = { title: "", description: "" };
export const TextProposal = {
    encode(message, writer = Writer.create()) {
        if (message.title !== "") {
            writer.uint32(10).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTextProposal };
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
    fromJSON(object) {
        const message = { ...baseTextProposal };
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
    toJSON(message) {
        const obj = {};
        message.title !== undefined && (obj.title = message.title);
        message.description !== undefined && (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTextProposal };
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
const baseProposal = { proposalId: 0 };
export const Proposal = {
    encode(message, writer = Writer.create()) {
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
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseProposal };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = longToNumber(reader.uint64());
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
    fromJSON(object) {
        const message = { ...baseProposal };
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
    toJSON(message) {
        const obj = {};
        message.proposalId !== undefined && (obj.proposalId = message.proposalId);
        message.content !== undefined &&
            (obj.content = message.content ? Any.toJSON(message.content) : undefined);
        message.submitTime !== undefined &&
            (obj.submitTime =
                message.submitTime !== undefined ? message.submitTime.toISOString() : null);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseProposal };
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
var globalThis = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    if (typeof global !== "undefined") return global;
    throw "Unable to locate global object";
})();
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    } else if (typeof o === "string") {
        return new Date(o);
    } else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
