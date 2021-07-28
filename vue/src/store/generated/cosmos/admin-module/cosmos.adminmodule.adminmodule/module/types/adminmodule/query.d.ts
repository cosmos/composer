import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "cosmos.adminmodule.adminmodule";
/** this line is used by starport scaffolding # 3 */
export interface QueryAdminsRequest {
}
export interface QueryAdminsResponse {
    admins: string[];
}
export declare const QueryAdminsRequest: {
    encode(_: QueryAdminsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAdminsRequest;
    fromJSON(_: any): QueryAdminsRequest;
    toJSON(_: QueryAdminsRequest): unknown;
    fromPartial(_: DeepPartial<QueryAdminsRequest>): QueryAdminsRequest;
};
export declare const QueryAdminsResponse: {
    encode(message: QueryAdminsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAdminsResponse;
    fromJSON(object: any): QueryAdminsResponse;
    toJSON(message: QueryAdminsResponse): unknown;
    fromPartial(object: DeepPartial<QueryAdminsResponse>): QueryAdminsResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a list of admins items. */
    Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
