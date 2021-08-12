/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.adminmodule.adminmodule";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgDeleteAdmin {
  creator: string;
  admin: string;
}

export interface MsgDeleteAdminResponse {}

export interface MsgAddAdmin {
  creator: string;
  admin: string;
}

export interface MsgAddAdminResponse {}

const baseMsgDeleteAdmin: object = { creator: "", admin: "" };

export const MsgDeleteAdmin = {
  encode(
    message: MsgDeleteAdmin,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteAdmin } as MsgDeleteAdmin;
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

  fromJSON(object: any): MsgDeleteAdmin {
    const message = { ...baseMsgDeleteAdmin } as MsgDeleteAdmin;
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

  toJSON(message: MsgDeleteAdmin): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.admin !== undefined && (obj.admin = message.admin);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteAdmin>): MsgDeleteAdmin {
    const message = { ...baseMsgDeleteAdmin } as MsgDeleteAdmin;
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
  },
};

const baseMsgDeleteAdminResponse: object = {};

export const MsgDeleteAdminResponse = {
  encode(
    _: MsgDeleteAdminResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeleteAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteAdminResponse } as MsgDeleteAdminResponse;
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

  fromJSON(_: any): MsgDeleteAdminResponse {
    const message = { ...baseMsgDeleteAdminResponse } as MsgDeleteAdminResponse;
    return message;
  },

  toJSON(_: MsgDeleteAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteAdminResponse>): MsgDeleteAdminResponse {
    const message = { ...baseMsgDeleteAdminResponse } as MsgDeleteAdminResponse;
    return message;
  },
};

const baseMsgAddAdmin: object = { creator: "", admin: "" };

export const MsgAddAdmin = {
  encode(
    message: MsgAddAdmin,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddAdmin } as MsgAddAdmin;
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

  fromJSON(object: any): MsgAddAdmin {
    const message = { ...baseMsgAddAdmin } as MsgAddAdmin;
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

  toJSON(message: MsgAddAdmin): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.admin !== undefined && (obj.admin = message.admin);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddAdmin>): MsgAddAdmin {
    const message = { ...baseMsgAddAdmin } as MsgAddAdmin;
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
  },
};

const baseMsgAddAdminResponse: object = {};

export const MsgAddAdminResponse = {
  encode(
    _: MsgAddAdminResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddAdminResponse } as MsgAddAdminResponse;
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

  fromJSON(_: any): MsgAddAdminResponse {
    const message = { ...baseMsgAddAdminResponse } as MsgAddAdminResponse;
    return message;
  },

  toJSON(_: MsgAddAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgAddAdminResponse>): MsgAddAdminResponse {
    const message = { ...baseMsgAddAdminResponse } as MsgAddAdminResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  DeleteAdmin(request: MsgDeleteAdmin): Promise<MsgDeleteAdminResponse>;
  AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DeleteAdmin = this.DeleteAdmin.bind(this);
    this.AddAdmin = this.AddAdmin.bind(this);
  }
  DeleteAdmin(request: MsgDeleteAdmin): Promise<MsgDeleteAdminResponse> {
    const data = MsgDeleteAdmin.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.adminmodule.adminmodule.Msg",
      "DeleteAdmin",
      data
    );
    return promise.then((data) =>
      MsgDeleteAdminResponse.decode(new _m0.Reader(data))
    );
  }

  AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse> {
    const data = MsgAddAdmin.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.adminmodule.adminmodule.Msg",
      "AddAdmin",
      data
    );
    return promise.then((data) =>
      MsgAddAdminResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
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
