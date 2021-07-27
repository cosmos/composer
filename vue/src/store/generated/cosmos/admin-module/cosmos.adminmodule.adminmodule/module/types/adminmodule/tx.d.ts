import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "cosmos.adminmodule.adminmodule";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgDeleteAdmin {
    creator: string;
    admin: string;
}
export interface MsgDeleteAdminResponse {
}
export interface MsgAddAdmin {
    creator: string;
    admin: string;
}
export interface MsgAddAdminResponse {
}
export declare const MsgDeleteAdmin: {
    encode(message: MsgDeleteAdmin, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteAdmin;
    fromJSON(object: any): MsgDeleteAdmin;
    toJSON(message: MsgDeleteAdmin): unknown;
    fromPartial(object: DeepPartial<MsgDeleteAdmin>): MsgDeleteAdmin;
};
export declare const MsgDeleteAdminResponse: {
    encode(_: MsgDeleteAdminResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteAdminResponse;
    fromJSON(_: any): MsgDeleteAdminResponse;
    toJSON(_: MsgDeleteAdminResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteAdminResponse>): MsgDeleteAdminResponse;
};
export declare const MsgAddAdmin: {
    encode(message: MsgAddAdmin, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddAdmin;
    fromJSON(object: any): MsgAddAdmin;
    toJSON(message: MsgAddAdmin): unknown;
    fromPartial(object: DeepPartial<MsgAddAdmin>): MsgAddAdmin;
};
export declare const MsgAddAdminResponse: {
    encode(_: MsgAddAdminResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddAdminResponse;
    fromJSON(_: any): MsgAddAdminResponse;
    toJSON(_: MsgAddAdminResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddAdminResponse>): MsgAddAdminResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    DeleteAdmin(request: MsgDeleteAdmin): Promise<MsgDeleteAdminResponse>;
    AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    DeleteAdmin(request: MsgDeleteAdmin): Promise<MsgDeleteAdminResponse>;
    AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
