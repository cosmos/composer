/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "cosmos.base.v1beta1";

export interface Balance {
    /** address is the address of the balance holder. */
    address: string;
    /** coins defines the different coins this balance holds. */
    coins: Coin[];
}

const baseBalance: object = { address: "" };

export const Balance = {
    encode(message: Balance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        for (const v of message.coins) {
            Coin.encode(v!, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Balance {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseBalance } as Balance;
        message.coins = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.coins.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Balance {
        const message = { ...baseBalance } as Balance;
        message.coins = [];
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        } else {
            message.address = "";
        }
        if (object.coins !== undefined && object.coins !== null) {
            for (const e of object.coins) {
                message.coins.push(Coin.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: Balance): unknown {
        const obj: any = {};
        message.address !== undefined && (obj.address = message.address);
        if (message.coins) {
            obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.coins = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<Balance>): Balance {
        const message = { ...baseBalance } as Balance;
        message.coins = [];
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        } else {
            message.address = "";
        }
        if (object.coins !== undefined && object.coins !== null) {
            for (const e of object.coins) {
                message.coins.push(Coin.fromPartial(e));
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
