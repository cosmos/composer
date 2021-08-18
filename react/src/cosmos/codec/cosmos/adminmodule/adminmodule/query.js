/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Proposal } from "../adminmodule/adminmodule";
export const protobufPackage = "cosmos.adminmodule.adminmodule";
const baseQueryAdminsRequest = {};
export const QueryAdminsRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAdminsRequest };
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
        const message = { ...baseQueryAdminsRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryAdminsRequest };
        return message;
    }
};
const baseQueryAdminsResponse = { admins: "" };
export const QueryAdminsResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.admins) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAdminsResponse };
        message.admins = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.admins.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAdminsResponse };
        message.admins = [];
        if (object.admins !== undefined && object.admins !== null) {
            for (const e of object.admins) {
                message.admins.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.admins) {
            obj.admins = message.admins.map((e) => e);
        } else {
            obj.admins = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAdminsResponse };
        message.admins = [];
        if (object.admins !== undefined && object.admins !== null) {
            for (const e of object.admins) {
                message.admins.push(e);
            }
        }
        return message;
    }
};
const baseQueryArchivedProposalsRequest = {};
export const QueryArchivedProposalsRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryArchivedProposalsRequest };
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
        const message = { ...baseQueryArchivedProposalsRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryArchivedProposalsRequest };
        return message;
    }
};
const baseQueryArchivedProposalsResponse = {};
export const QueryArchivedProposalsResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.proposals) {
            Proposal.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryArchivedProposalsResponse };
        message.proposals = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposals.push(Proposal.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryArchivedProposalsResponse };
        message.proposals = [];
        if (object.proposals !== undefined && object.proposals !== null) {
            for (const e of object.proposals) {
                message.proposals.push(Proposal.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.proposals) {
            obj.proposals = message.proposals.map((e) => (e ? Proposal.toJSON(e) : undefined));
        } else {
            obj.proposals = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryArchivedProposalsResponse };
        message.proposals = [];
        if (object.proposals !== undefined && object.proposals !== null) {
            for (const e of object.proposals) {
                message.proposals.push(Proposal.fromPartial(e));
            }
        }
        return message;
    }
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Admins(request) {
        const data = QueryAdminsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Query", "Admins", data);
        return promise.then((data) => QueryAdminsResponse.decode(new Reader(data)));
    }
    ArchivedProposals(request) {
        const data = QueryArchivedProposalsRequest.encode(request).finish();
        const promise = this.rpc.request(
            "cosmos.adminmodule.adminmodule.Query",
            "ArchivedProposals",
            data
        );
        return promise.then((data) => QueryArchivedProposalsResponse.decode(new Reader(data)));
    }
}
