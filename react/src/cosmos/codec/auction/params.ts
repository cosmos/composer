/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { Exchange } from "../coinswap/params";

export const protobufPackage = "auction";

/** Params is the data structure that keeps the parameters of the auction module. */
export interface Params {
    /** AuctionStartThreshold is the threshold at which the auction starts */
    auctionStartThreshold: Coin[];
    /** ExchangeRate is a rate for buying coins throw the auction */
    exchangeRates: Exchange[];
}

const baseParams: object = {};

export const Params = {
    encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.auctionStartThreshold) {
            Coin.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.exchangeRates) {
            Exchange.encode(v!, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Params {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseParams } as Params;
        message.auctionStartThreshold = [];
        message.exchangeRates = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.auctionStartThreshold.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
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
        message.auctionStartThreshold = [];
        message.exchangeRates = [];
        if (object.auctionStartThreshold !== undefined && object.auctionStartThreshold !== null) {
            for (const e of object.auctionStartThreshold) {
                message.auctionStartThreshold.push(Coin.fromJSON(e));
            }
        }
        if (object.exchangeRates !== undefined && object.exchangeRates !== null) {
            for (const e of object.exchangeRates) {
                message.exchangeRates.push(Exchange.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: Params): unknown {
        const obj: any = {};
        if (message.auctionStartThreshold) {
            obj.auctionStartThreshold = message.auctionStartThreshold.map((e) =>
                e ? Coin.toJSON(e) : undefined
            );
        } else {
            obj.auctionStartThreshold = [];
        }
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
        message.auctionStartThreshold = [];
        message.exchangeRates = [];
        if (object.auctionStartThreshold !== undefined && object.auctionStartThreshold !== null) {
            for (const e of object.auctionStartThreshold) {
                message.auctionStartThreshold.push(Coin.fromPartial(e));
            }
        }
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
