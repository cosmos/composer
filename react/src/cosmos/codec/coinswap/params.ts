/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "coinswap";

export interface Exchange {
    from: string;
    to: string;
    rateMultiplier: string;
}

export interface Params {
    exchangeRates: Exchange[];
}

const baseExchange: object = { from: "", to: "", rateMultiplier: "" };

export const Exchange = {
    encode(message: Exchange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.from !== "") {
            writer.uint32(10).string(message.from);
        }
        if (message.to !== "") {
            writer.uint32(18).string(message.to);
        }
        if (message.rateMultiplier !== "") {
            writer.uint32(26).string(message.rateMultiplier);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Exchange {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseExchange } as Exchange;
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
                    message.rateMultiplier = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Exchange {
        const message = { ...baseExchange } as Exchange;
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
        if (object.rateMultiplier !== undefined && object.rateMultiplier !== null) {
            message.rateMultiplier = String(object.rateMultiplier);
        } else {
            message.rateMultiplier = "";
        }
        return message;
    },

    toJSON(message: Exchange): unknown {
        const obj: any = {};
        message.from !== undefined && (obj.from = message.from);
        message.to !== undefined && (obj.to = message.to);
        message.rateMultiplier !== undefined && (obj.rateMultiplier = message.rateMultiplier);
        return obj;
    },

    fromPartial(object: DeepPartial<Exchange>): Exchange {
        const message = { ...baseExchange } as Exchange;
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
        if (object.rateMultiplier !== undefined && object.rateMultiplier !== null) {
            message.rateMultiplier = object.rateMultiplier;
        } else {
            message.rateMultiplier = "";
        }
        return message;
    }
};

const baseParams: object = {};

export const Params = {
    encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.exchangeRates) {
            Exchange.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Params {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseParams } as Params;
        message.exchangeRates = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.exchangeRates.push(Exchange.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Params {
        const message = { ...baseParams } as Params;
        message.exchangeRates = [];
        if (object.exchangeRates !== undefined && object.exchangeRates !== null) {
            for (const e of object.exchangeRates) {
                message.exchangeRates.push(Exchange.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: Params): unknown {
        const obj: any = {};
        if (message.exchangeRates) {
            obj.exchangeRates = message.exchangeRates.map((e) =>
                e ? Exchange.toJSON(e) : undefined
            );
        } else {
            obj.exchangeRates = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<Params>): Params {
        const message = { ...baseParams } as Params;
        message.exchangeRates = [];
        if (object.exchangeRates !== undefined && object.exchangeRates !== null) {
            for (const e of object.exchangeRates) {
                message.exchangeRates.push(Exchange.fromPartial(e));
            }
        }
        return message;
    }
};

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
