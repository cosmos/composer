/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "auction";

export interface MsgBuyCoins {
    from: string;
    to: string;
    amount?: Coin;
    requester: string;
}

export interface MsgBuyCoinsResponse {}

const baseMsgBuyCoins: object = { from: "", to: "", requester: "" };

export const MsgBuyCoins = {
    encode(message: MsgBuyCoins, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.from !== "") {
            writer.uint32(10).string(message.from);
        }
        if (message.to !== "") {
            writer.uint32(18).string(message.to);
        }
        if (message.amount !== undefined) {
            Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        if (message.requester !== "") {
            writer.uint32(34).string(message.requester);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyCoins {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBuyCoins } as MsgBuyCoins;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.from = reader.string();
                    break;
                case 2:
                    message.to = reader.string();
                    break;
                case 3:
                    message.amount = Coin.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.requester = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgBuyCoins {
        const message = { ...baseMsgBuyCoins } as MsgBuyCoins;
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
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromJSON(object.amount);
        } else {
            message.amount = undefined;
        }
        if (object.requester !== undefined && object.requester !== null) {
            message.requester = String(object.requester);
        } else {
            message.requester = "";
        }
        return message;
    },

    toJSON(message: MsgBuyCoins): unknown {
        const obj: any = {};
        message.from !== undefined && (obj.from = message.from);
        message.to !== undefined && (obj.to = message.to);
        message.amount !== undefined &&
            (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
        message.requester !== undefined && (obj.requester = message.requester);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgBuyCoins>): MsgBuyCoins {
        const message = { ...baseMsgBuyCoins } as MsgBuyCoins;
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
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromPartial(object.amount);
        } else {
            message.amount = undefined;
        }
        if (object.requester !== undefined && object.requester !== null) {
            message.requester = object.requester;
        } else {
            message.requester = "";
        }
        return message;
    }
};

const baseMsgBuyCoinsResponse: object = {};

export const MsgBuyCoinsResponse = {
    encode(_: MsgBuyCoinsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyCoinsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBuyCoinsResponse } as MsgBuyCoinsResponse;
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

    fromJSON(_: any): MsgBuyCoinsResponse {
        const message = { ...baseMsgBuyCoinsResponse } as MsgBuyCoinsResponse;
        return message;
    },

    toJSON(_: MsgBuyCoinsResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgBuyCoinsResponse>): MsgBuyCoinsResponse {
        const message = { ...baseMsgBuyCoinsResponse } as MsgBuyCoinsResponse;
        return message;
    }
};

/** Msg defines the auction Msg service. */
export interface Msg {
    BuyCoins(request: MsgBuyCoins): Promise<MsgBuyCoinsResponse>;
}

export class MsgClientImpl implements Msg {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
    }
    BuyCoins(request: MsgBuyCoins): Promise<MsgBuyCoinsResponse> {
        const data = MsgBuyCoins.encode(request).finish();
        const promise = this.rpc.request("auction.Msg", "BuyCoins", data);
        return promise.then((data) => MsgBuyCoinsResponse.decode(new _m0.Reader(data)));
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
