/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "../mint/params";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "mint";

/**
 * QueryParamsRequest is request type for the Query/QueryParams RPC
 * method.
 */
export interface QueryParamsRequest {}

/**
 * QueryParamsResponse is response type for the Query/QueryParams RPC
 * method.
 */
export interface QueryParamsResponse {
    params?: Params;
}

/**
 * QueryInflationRequest is request type for the Query/QueryInflation RPC
 * method.
 */
export interface QueryInflationRequest {}

/**
 * QueryInflationResponse is response type for the Query/QueryInflation RPC
 * method.
 */
export interface QueryInflationResponse {
    inflation: string;
}

/**
 * QueryAnnualProvisionsRequest is request type for the
 * Query/QueryAnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsRequest {}

/**
 * QueryAnnualProvisionsResponse is response type for the
 * Query/QueryAnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsResponse {
    annualProvisions: string;
}

/**
 * QueryEthIntegrationAddressRequest is request type for the
 * Query/QueryEthIntegrationAddress RPC method.
 */
export interface QueryEthIntegrationAddressRequest {}

/**
 * QueryEthIntegrationAddressResponse is response type for the
 * Query/QueryEthIntegrationAddress RPC method.
 */
export interface QueryEthIntegrationAddressResponse {
    ethIntegrationAddress: string;
}

/**
 * QueryTreasuryPoolRequest is request type for the Query/QueryTreasuryPool RPC
 * method.
 */
export interface QueryTreasuryPoolRequest {}

/**
 * QueryTreasuryPoolResponse is response type for the Query/QueryTreasuryPool
 * RPC method.
 */
export interface QueryTreasuryPoolResponse {
    treasuryPool: Coin[];
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

const baseQueryInflationRequest: object = {};

export const QueryInflationRequest = {
    encode(_: QueryInflationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInflationRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryInflationRequest } as QueryInflationRequest;
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

    fromJSON(_: any): QueryInflationRequest {
        const message = { ...baseQueryInflationRequest } as QueryInflationRequest;
        return message;
    },

    toJSON(_: QueryInflationRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<QueryInflationRequest>): QueryInflationRequest {
        const message = { ...baseQueryInflationRequest } as QueryInflationRequest;
        return message;
    }
};

const baseQueryInflationResponse: object = { inflation: "" };

export const QueryInflationResponse = {
    encode(message: QueryInflationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.inflation !== "") {
            writer.uint32(10).string(message.inflation);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInflationResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryInflationResponse } as QueryInflationResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inflation = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryInflationResponse {
        const message = { ...baseQueryInflationResponse } as QueryInflationResponse;
        if (object.inflation !== undefined && object.inflation !== null) {
            message.inflation = String(object.inflation);
        } else {
            message.inflation = "";
        }
        return message;
    },

    toJSON(message: QueryInflationResponse): unknown {
        const obj: any = {};
        message.inflation !== undefined && (obj.inflation = message.inflation);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryInflationResponse>): QueryInflationResponse {
        const message = { ...baseQueryInflationResponse } as QueryInflationResponse;
        if (object.inflation !== undefined && object.inflation !== null) {
            message.inflation = object.inflation;
        } else {
            message.inflation = "";
        }
        return message;
    }
};

const baseQueryAnnualProvisionsRequest: object = {};

export const QueryAnnualProvisionsRequest = {
    encode(_: QueryAnnualProvisionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAnnualProvisionsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAnnualProvisionsRequest
        } as QueryAnnualProvisionsRequest;
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

    fromJSON(_: any): QueryAnnualProvisionsRequest {
        const message = {
            ...baseQueryAnnualProvisionsRequest
        } as QueryAnnualProvisionsRequest;
        return message;
    },

    toJSON(_: QueryAnnualProvisionsRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<QueryAnnualProvisionsRequest>): QueryAnnualProvisionsRequest {
        const message = {
            ...baseQueryAnnualProvisionsRequest
        } as QueryAnnualProvisionsRequest;
        return message;
    }
};

const baseQueryAnnualProvisionsResponse: object = { annualProvisions: "" };

export const QueryAnnualProvisionsResponse = {
    encode(
        message: QueryAnnualProvisionsResponse,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.annualProvisions !== "") {
            writer.uint32(10).string(message.annualProvisions);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAnnualProvisionsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAnnualProvisionsResponse
        } as QueryAnnualProvisionsResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.annualProvisions = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryAnnualProvisionsResponse {
        const message = {
            ...baseQueryAnnualProvisionsResponse
        } as QueryAnnualProvisionsResponse;
        if (object.annualProvisions !== undefined && object.annualProvisions !== null) {
            message.annualProvisions = String(object.annualProvisions);
        } else {
            message.annualProvisions = "";
        }
        return message;
    },

    toJSON(message: QueryAnnualProvisionsResponse): unknown {
        const obj: any = {};
        message.annualProvisions !== undefined && (obj.annualProvisions = message.annualProvisions);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryAnnualProvisionsResponse>): QueryAnnualProvisionsResponse {
        const message = {
            ...baseQueryAnnualProvisionsResponse
        } as QueryAnnualProvisionsResponse;
        if (object.annualProvisions !== undefined && object.annualProvisions !== null) {
            message.annualProvisions = object.annualProvisions;
        } else {
            message.annualProvisions = "";
        }
        return message;
    }
};

const baseQueryEthIntegrationAddressRequest: object = {};

export const QueryEthIntegrationAddressRequest = {
    encode(
        _: QueryEthIntegrationAddressRequest,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryEthIntegrationAddressRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryEthIntegrationAddressRequest
        } as QueryEthIntegrationAddressRequest;
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

    fromJSON(_: any): QueryEthIntegrationAddressRequest {
        const message = {
            ...baseQueryEthIntegrationAddressRequest
        } as QueryEthIntegrationAddressRequest;
        return message;
    },

    toJSON(_: QueryEthIntegrationAddressRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(
        _: DeepPartial<QueryEthIntegrationAddressRequest>
    ): QueryEthIntegrationAddressRequest {
        const message = {
            ...baseQueryEthIntegrationAddressRequest
        } as QueryEthIntegrationAddressRequest;
        return message;
    }
};

const baseQueryEthIntegrationAddressResponse: object = {
    ethIntegrationAddress: ""
};

export const QueryEthIntegrationAddressResponse = {
    encode(
        message: QueryEthIntegrationAddressResponse,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.ethIntegrationAddress !== "") {
            writer.uint32(10).string(message.ethIntegrationAddress);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryEthIntegrationAddressResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryEthIntegrationAddressResponse
        } as QueryEthIntegrationAddressResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ethIntegrationAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryEthIntegrationAddressResponse {
        const message = {
            ...baseQueryEthIntegrationAddressResponse
        } as QueryEthIntegrationAddressResponse;
        if (object.ethIntegrationAddress !== undefined && object.ethIntegrationAddress !== null) {
            message.ethIntegrationAddress = String(object.ethIntegrationAddress);
        } else {
            message.ethIntegrationAddress = "";
        }
        return message;
    },

    toJSON(message: QueryEthIntegrationAddressResponse): unknown {
        const obj: any = {};
        message.ethIntegrationAddress !== undefined &&
            (obj.ethIntegrationAddress = message.ethIntegrationAddress);
        return obj;
    },

    fromPartial(
        object: DeepPartial<QueryEthIntegrationAddressResponse>
    ): QueryEthIntegrationAddressResponse {
        const message = {
            ...baseQueryEthIntegrationAddressResponse
        } as QueryEthIntegrationAddressResponse;
        if (object.ethIntegrationAddress !== undefined && object.ethIntegrationAddress !== null) {
            message.ethIntegrationAddress = object.ethIntegrationAddress;
        } else {
            message.ethIntegrationAddress = "";
        }
        return message;
    }
};

const baseQueryTreasuryPoolRequest: object = {};

export const QueryTreasuryPoolRequest = {
    encode(_: QueryTreasuryPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTreasuryPoolRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryTreasuryPoolRequest
        } as QueryTreasuryPoolRequest;
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

    fromJSON(_: any): QueryTreasuryPoolRequest {
        const message = {
            ...baseQueryTreasuryPoolRequest
        } as QueryTreasuryPoolRequest;
        return message;
    },

    toJSON(_: QueryTreasuryPoolRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<QueryTreasuryPoolRequest>): QueryTreasuryPoolRequest {
        const message = {
            ...baseQueryTreasuryPoolRequest
        } as QueryTreasuryPoolRequest;
        return message;
    }
};

const baseQueryTreasuryPoolResponse: object = {};

export const QueryTreasuryPoolResponse = {
    encode(
        message: QueryTreasuryPoolResponse,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        for (const v of message.treasuryPool) {
            Coin.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTreasuryPoolResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryTreasuryPoolResponse
        } as QueryTreasuryPoolResponse;
        message.treasuryPool = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.treasuryPool.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryTreasuryPoolResponse {
        const message = {
            ...baseQueryTreasuryPoolResponse
        } as QueryTreasuryPoolResponse;
        message.treasuryPool = [];
        if (object.treasuryPool !== undefined && object.treasuryPool !== null) {
            for (const e of object.treasuryPool) {
                message.treasuryPool.push(Coin.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: QueryTreasuryPoolResponse): unknown {
        const obj: any = {};
        if (message.treasuryPool) {
            obj.treasuryPool = message.treasuryPool.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.treasuryPool = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<QueryTreasuryPoolResponse>): QueryTreasuryPoolResponse {
        const message = {
            ...baseQueryTreasuryPoolResponse
        } as QueryTreasuryPoolResponse;
        message.treasuryPool = [];
        if (object.treasuryPool !== undefined && object.treasuryPool !== null) {
            for (const e of object.treasuryPool) {
                message.treasuryPool.push(Coin.fromPartial(e));
            }
        }
        return message;
    }
};

/** Query defines the gRPC querier service. */
export interface Query {
    /** Params returns the total set of minting parameters. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Inflation returns current inflation. */
    Inflation(request: QueryInflationRequest): Promise<QueryInflationResponse>;
    /** Inflation returns current annual provisions. */
    AnnualProvisions(request: QueryAnnualProvisionsRequest): Promise<QueryAnnualProvisionsResponse>;
    /** Inflation returns ethereum integration address. */
    EthIntegrationAddress(
        request: QueryEthIntegrationAddressRequest
    ): Promise<QueryEthIntegrationAddressResponse>;
    /** Inflation returns current treasury pool. */
    TreasuryPool(request: QueryTreasuryPoolRequest): Promise<QueryTreasuryPoolResponse>;
}

export class QueryClientImpl implements Query {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
    }
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("mint.Query", "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
    }

    Inflation(request: QueryInflationRequest): Promise<QueryInflationResponse> {
        const data = QueryInflationRequest.encode(request).finish();
        const promise = this.rpc.request("mint.Query", "Inflation", data);
        return promise.then((data) => QueryInflationResponse.decode(new _m0.Reader(data)));
    }

    AnnualProvisions(
        request: QueryAnnualProvisionsRequest
    ): Promise<QueryAnnualProvisionsResponse> {
        const data = QueryAnnualProvisionsRequest.encode(request).finish();
        const promise = this.rpc.request("mint.Query", "AnnualProvisions", data);
        return promise.then((data) => QueryAnnualProvisionsResponse.decode(new _m0.Reader(data)));
    }

    EthIntegrationAddress(
        request: QueryEthIntegrationAddressRequest
    ): Promise<QueryEthIntegrationAddressResponse> {
        const data = QueryEthIntegrationAddressRequest.encode(request).finish();
        const promise = this.rpc.request("mint.Query", "EthIntegrationAddress", data);
        return promise.then((data) =>
            QueryEthIntegrationAddressResponse.decode(new _m0.Reader(data))
        );
    }

    TreasuryPool(request: QueryTreasuryPoolRequest): Promise<QueryTreasuryPoolResponse> {
        const data = QueryTreasuryPoolRequest.encode(request).finish();
        const promise = this.rpc.request("mint.Query", "TreasuryPool", data);
        return promise.then((data) => QueryTreasuryPoolResponse.decode(new _m0.Reader(data)));
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
