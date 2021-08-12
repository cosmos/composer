/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "../coinswap/params";

export const protobufPackage = "coinswap";

/** QueryCountsRequest is request type for the Query/Count RPC method. */
export interface QueryRateRequest {
    from: string;
    to: string;
}

/** QueryCountsResponse is response type for the Query/Count RPC method. */
export interface QueryRateResponse {
    rate: string;
    initialRate: string;
}

/** QueryCountsRequest is request type for the Query/Count RPC method. */
export interface QueryParamsRequest {}

/** QueryCountsResponse is response type for the Query/Count RPC method. */
export interface QueryParamsResponse {
    params?: Params;
}

const baseQueryRateRequest: object = { from: "", to: "" };

export const QueryRateRequest = {
    encode(message: QueryRateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.from !== "") {
            writer.uint32(10).string(message.from);
        }
        if (message.to !== "") {
            writer.uint32(18).string(message.to);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryRateRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryRateRequest } as QueryRateRequest;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.from = reader.string();
                    break;
                case 2:
                    message.to = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryRateRequest {
        const message = { ...baseQueryRateRequest } as QueryRateRequest;
        if (object.from !== undefined && object.from !== null) {
            message.from = String(object.from);
        } else {
            message.from = "";
        }
        if (object.to !== undefined && object.to !== null) {
            message.to = String(object.to);
        } else {
            message.to = "";
        }
        return message;
    },

    toJSON(message: QueryRateRequest): unknown {
        const obj: any = {};
        message.from !== undefined && (obj.from = message.from);
        message.to !== undefined && (obj.to = message.to);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryRateRequest>): QueryRateRequest {
        const message = { ...baseQueryRateRequest } as QueryRateRequest;
        if (object.from !== undefined && object.from !== null) {
            message.from = object.from;
        } else {
            message.from = "";
        }
        if (object.to !== undefined && object.to !== null) {
            message.to = object.to;
        } else {
            message.to = "";
        }
        return message;
    }
};

const baseQueryRateResponse: object = { rate: "", initialRate: "" };

export const QueryRateResponse = {
    encode(message: QueryRateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.rate !== "") {
            writer.uint32(10).string(message.rate);
        }
        if (message.initialRate !== "") {
            writer.uint32(18).string(message.initialRate);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryRateResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryRateResponse } as QueryRateResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rate = reader.string();
                    break;
                case 2:
                    message.initialRate = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryRateResponse {
        const message = { ...baseQueryRateResponse } as QueryRateResponse;
        if (object.rate !== undefined && object.rate !== null) {
            message.rate = String(object.rate);
        } else {
            message.rate = "";
        }
        if (object.initialRate !== undefined && object.initialRate !== null) {
            message.initialRate = String(object.initialRate);
        } else {
            message.initialRate = "";
        }
        return message;
    },

    toJSON(message: QueryRateResponse): unknown {
        const obj: any = {};
        message.rate !== undefined && (obj.rate = message.rate);
        message.initialRate !== undefined && (obj.initialRate = message.initialRate);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryRateResponse>): QueryRateResponse {
        const message = { ...baseQueryRateResponse } as QueryRateResponse;
        if (object.rate !== undefined && object.rate !== null) {
            message.rate = object.rate;
        } else {
            message.rate = "";
        }
        if (object.initialRate !== undefined && object.initialRate !== null) {
            message.initialRate = object.initialRate;
        } else {
            message.initialRate = "";
        }
        return message;
    }
};

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
    encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
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

    fromJSON(_: any): QueryParamsRequest {
        const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
        return message;
    },

    toJSON(_: QueryParamsRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
        const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
        return message;
    }
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
    encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryParamsResponse {
        const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params);
        } else {
            message.params = undefined;
        }
        return message;
    },

    toJSON(message: QueryParamsResponse): unknown {
        const obj: any = {};
        message.params !== undefined &&
            (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
        const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        } else {
            message.params = undefined;
        }
        return message;
    }
};

/** Query defines the gRPC querier service. */
export interface Query {
    /** Counts queries the number of data sources, oracle scripts, and requests. */
    Rate(request: QueryRateRequest): Promise<QueryRateResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
    }
    Rate(request: QueryRateRequest): Promise<QueryRateResponse> {
        const data = QueryRateRequest.encode(request).finish();
        const promise = this.rpc.request("coinswap.Query", "Rate", data);
        return promise.then((data) => QueryRateResponse.decode(new _m0.Reader(data)));
    }

    Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("coinswap.Query", "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
    }
}

interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export type DeepPartial<T> = T extends Builtin
    ? T
    : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T extends {}
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : Partial<T>;

if (_m0.util.Long !== Long) {
    _m0.util.Long = Long as any;
    _m0.configure();
}
