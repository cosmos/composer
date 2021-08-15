import { Reader, Writer } from 'protobufjs/minimal';
import { Proposal } from '../adminmodule/adminmodule';
export declare const protobufPackage = "cosmos.adminmodule.adminmodule";
/** this line is used by starport scaffolding # 3 */
export interface QueryAdminsRequest {
}
export interface QueryAdminsResponse {
    admins: string[];
}
export interface QueryArchivedProposalsRequest {
}
export interface QueryArchivedProposalsResponse {
    proposals: Proposal[];
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
export declare const QueryArchivedProposalsRequest: {
    encode(_: QueryArchivedProposalsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryArchivedProposalsRequest;
    fromJSON(_: any): QueryArchivedProposalsRequest;
    toJSON(_: QueryArchivedProposalsRequest): unknown;
    fromPartial(_: DeepPartial<QueryArchivedProposalsRequest>): QueryArchivedProposalsRequest;
};
export declare const QueryArchivedProposalsResponse: {
    encode(message: QueryArchivedProposalsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryArchivedProposalsResponse;
    fromJSON(object: any): QueryArchivedProposalsResponse;
    toJSON(message: QueryArchivedProposalsResponse): unknown;
    fromPartial(object: DeepPartial<QueryArchivedProposalsResponse>): QueryArchivedProposalsResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a list of admins items. */
    Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse>;
    /** Queries a list of archived proposals. */
    ArchivedProposals(request: QueryArchivedProposalsRequest): Promise<QueryArchivedProposalsResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse>;
    ArchivedProposals(request: QueryArchivedProposalsRequest): Promise<QueryArchivedProposalsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
