/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Any } from "../google/protobuf/any";
export const protobufPackage = "cosmos.adminmodule.adminmodule";
const baseMsgDeleteAdmin = { creator: "", admin: "" };
export const MsgDeleteAdmin = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.admin !== "") {
            writer.uint32(18).string(message.admin);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteAdmin };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.admin = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteAdmin };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        } else {
            message.creator = "";
        }
        if (object.admin !== undefined && object.admin !== null) {
            message.admin = String(object.admin);
        } else {
            message.admin = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.admin !== undefined && (obj.admin = message.admin);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteAdmin };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        } else {
            message.creator = "";
        }
        if (object.admin !== undefined && object.admin !== null) {
            message.admin = object.admin;
        } else {
            message.admin = "";
        }
        return message;
    }
};
const baseMsgDeleteAdminResponse = {};
export const MsgDeleteAdminResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteAdminResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgDeleteAdminResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteAdminResponse };
        return message;
    }
};
const baseMsgAddAdmin = { creator: "", admin: "" };
export const MsgAddAdmin = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.admin !== "") {
            writer.uint32(18).string(message.admin);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddAdmin };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.admin = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAddAdmin };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        } else {
            message.creator = "";
        }
        if (object.admin !== undefined && object.admin !== null) {
            message.admin = String(object.admin);
        } else {
            message.admin = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.admin !== undefined && (obj.admin = message.admin);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddAdmin };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        } else {
            message.creator = "";
        }
        if (object.admin !== undefined && object.admin !== null) {
            message.admin = object.admin;
        } else {
            message.admin = "";
        }
        return message;
    }
};
const baseMsgAddAdminResponse = {};
export const MsgAddAdminResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddAdminResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgAddAdminResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgAddAdminResponse };
        return message;
    }
};
const baseMsgSubmitProposal = { proposer: "" };
export const MsgSubmitProposal = {
    encode(message, writer = Writer.create()) {
        if (message.content !== undefined) {
            Any.encode(message.content, writer.uint32(10).fork()).ldelim();
        }
        if (message.proposer !== "") {
            writer.uint32(18).string(message.proposer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSubmitProposal };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.content = Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proposer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSubmitProposal };
        if (object.content !== undefined && object.content !== null) {
            message.content = Any.fromJSON(object.content);
        } else {
            message.content = undefined;
        }
        if (object.proposer !== undefined && object.proposer !== null) {
            message.proposer = String(object.proposer);
        } else {
            message.proposer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.content !== undefined &&
            (obj.content = message.content ? Any.toJSON(message.content) : undefined);
        message.proposer !== undefined && (obj.proposer = message.proposer);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSubmitProposal };
        if (object.content !== undefined && object.content !== null) {
            message.content = Any.fromPartial(object.content);
        } else {
            message.content = undefined;
        }
        if (object.proposer !== undefined && object.proposer !== null) {
            message.proposer = object.proposer;
        } else {
            message.proposer = "";
        }
        return message;
    }
};
const baseMsgSubmitProposalResponse = { proposalId: 0 };
export const MsgSubmitProposalResponse = {
    encode(message, writer = Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSubmitProposalResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSubmitProposalResponse };
        if (object.proposalId !== undefined && object.proposalId !== null) {
            message.proposalId = Number(object.proposalId);
        } else {
            message.proposalId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.proposalId !== undefined && (obj.proposalId = message.proposalId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSubmitProposalResponse };
        if (object.proposalId !== undefined && object.proposalId !== null) {
            message.proposalId = object.proposalId;
        } else {
            message.proposalId = 0;
        }
        return message;
    }
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    DeleteAdmin(request) {
        const data = MsgDeleteAdmin.encode(request).finish();
        const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Msg", "DeleteAdmin", data);
        return promise.then((data) => MsgDeleteAdminResponse.decode(new Reader(data)));
    }
    AddAdmin(request) {
        const data = MsgAddAdmin.encode(request).finish();
        const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Msg", "AddAdmin", data);
        return promise.then((data) => MsgAddAdminResponse.decode(new Reader(data)));
    }
    SubmitProposal(request) {
        const data = MsgSubmitProposal.encode(request).finish();
        const promise = this.rpc.request(
            "cosmos.adminmodule.adminmodule.Msg",
            "SubmitProposal",
            data
        );
        return promise.then((data) => MsgSubmitProposalResponse.decode(new Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    if (typeof global !== "undefined") return global;
    throw "Unable to locate global object";
})();
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
