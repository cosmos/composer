/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "../auction/params";
import { AuctionStatus } from "../auction/auction";

export const protobufPackage = "auction";

/** QueryCountsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryCountsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    params?: Params;
}

/** QueryAuctionStatusRequest is request type for the Query/Status RPC method. */
export interface QueryAuctionStatusRequest {}

/** QueryAuctionStatusResponse is response type for the Query/Status RPC method. */
export interface QueryAuctionStatusResponse {
    auctionStatus?: AuctionStatus;
}

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

const baseQueryAuctionStatusRequest: object = {};

export const QueryAuctionStatusRequest = {
    encode(_: QueryAuctionStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionStatusRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAuctionStatusRequest
        } as QueryAuctionStatusRequest;
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

    fromJSON(_: any): QueryAuctionStatusRequest {
        const message = {
            ...baseQueryAuctionStatusRequest
        } as QueryAuctionStatusRequest;
        return message;
    },

    toJSON(_: QueryAuctionStatusRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<QueryAuctionStatusRequest>): QueryAuctionStatusRequest {
        const message = {
            ...baseQueryAuctionStatusRequest
        } as QueryAuctionStatusRequest;
        return message;
    }
};

const baseQueryAuctionStatusResponse: object = {};

export const QueryAuctionStatusResponse = {
    encode(
        message: QueryAuctionStatusResponse,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.auctionStatus !== undefined) {
            AuctionStatus.encode(message.auctionStatus, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionStatusResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAuctionStatusResponse
        } as QueryAuctionStatusResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.auctionStatus = AuctionStatus.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryAuctionStatusResponse {
        const message = {
            ...baseQueryAuctionStatusResponse
        } as QueryAuctionStatusResponse;
        if (object.auctionStatus !== undefined && object.auctionStatus !== null) {
            message.auctionStatus = AuctionStatus.fromJSON(object.auctionStatus);
        } else {
            message.auctionStatus = undefined;
        }
        return message;
    },

    toJSON(message: QueryAuctionStatusResponse): unknown {
        const obj: any = {};
        message.auctionStatus !== undefined &&
            (obj.auctionStatus = message.auctionStatus
                ? AuctionStatus.toJSON(message.auctionStatus)
                : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryAuctionStatusResponse>): QueryAuctionStatusResponse {
        const message = {
            ...baseQueryAuctionStatusResponse
        } as QueryAuctionStatusResponse;
        if (object.auctionStatus !== undefined && object.auctionStatus !== null) {
            message.auctionStatus = AuctionStatus.fromPartial(object.auctionStatus);
        } else {
            message.auctionStatus = undefined;
        }
        return message;
    }
};

/** Query defines the gRPC querier service. */
export interface Query {
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    AuctionStatus(request: QueryAuctionStatusRequest): Promise<QueryAuctionStatusResponse>;
}

export class QueryClientImpl implements Query {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
    }
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("auction.Query", "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
    }

    AuctionStatus(request: QueryAuctionStatusRequest): Promise<QueryAuctionStatusResponse> {
        const data = QueryAuctionStatusRequest.encode(request).finish();
        const promise = this.rpc.request("auction.Query", "AuctionStatus", data);
        return promise.then((data) => QueryAuctionStatusResponse.decode(new _m0.Reader(data)));
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
