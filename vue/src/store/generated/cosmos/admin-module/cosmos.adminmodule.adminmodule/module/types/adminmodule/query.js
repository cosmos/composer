/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';
export const protobufPackage = 'cosmos.adminmodule.adminmodule';
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
const baseQueryAdminsResponse = { admins: '' };
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
        }
        else {
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
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Admins(request) {
        const data = QueryAdminsRequest.encode(request).finish();
        const promise = this.rpc.request('cosmos.adminmodule.adminmodule.Query', 'Admins', data);
        return promise.then((data) => QueryAdminsResponse.decode(new Reader(data)));
    }
}
