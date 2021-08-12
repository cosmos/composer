/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "mint";

export interface MintPool {
    /** treasury pool */
    treasuryPool: Coin[];
}

/** Minter represents the minting state. */
export interface Minter {
    /** current annual inflation rate */
    inflation: string;
    /** current annual expected provisions */
    annualProvisions: string;
}

const baseMintPool: object = {};

export const MintPool = {
    encode(message: MintPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.treasuryPool) {
            Coin.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MintPool {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMintPool } as MintPool;
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

    fromJSON(object: any): MintPool {
        const message = { ...baseMintPool } as MintPool;
        message.treasuryPool = [];
        if (object.treasuryPool !== undefined && object.treasuryPool !== null) {
            for (const e of object.treasuryPool) {
                message.treasuryPool.push(Coin.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: MintPool): unknown {
        const obj: any = {};
        if (message.treasuryPool) {
            obj.treasuryPool = message.treasuryPool.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.treasuryPool = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<MintPool>): MintPool {
        const message = { ...baseMintPool } as MintPool;
        message.treasuryPool = [];
        if (object.treasuryPool !== undefined && object.treasuryPool !== null) {
            for (const e of object.treasuryPool) {
                message.treasuryPool.push(Coin.fromPartial(e));
            }
        }
        return message;
    }
};

const baseMinter: object = { inflation: "", annualProvisions: "" };

export const Minter = {
    encode(message: Minter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.inflation !== "") {
            writer.uint32(10).string(message.inflation);
        }
        if (message.annualProvisions !== "") {
            writer.uint32(18).string(message.annualProvisions);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Minter {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMinter } as Minter;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inflation = reader.string();
                    break;
                case 2:
                    message.annualProvisions = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Minter {
        const message = { ...baseMinter } as Minter;
        if (object.inflation !== undefined && object.inflation !== null) {
            message.inflation = String(object.inflation);
        } else {
            message.inflation = "";
        }
        if (object.annualProvisions !== undefined && object.annualProvisions !== null) {
            message.annualProvisions = String(object.annualProvisions);
        } else {
            message.annualProvisions = "";
        }
        return message;
    },

    toJSON(message: Minter): unknown {
        const obj: any = {};
        message.inflation !== undefined && (obj.inflation = message.inflation);
        message.annualProvisions !== undefined && (obj.annualProvisions = message.annualProvisions);
        return obj;
    },

    fromPartial(object: DeepPartial<Minter>): Minter {
        const message = { ...baseMinter } as Minter;
        if (object.inflation !== undefined && object.inflation !== null) {
            message.inflation = object.inflation;
        } else {
            message.inflation = "";
        }
        if (object.annualProvisions !== undefined && object.annualProvisions !== null) {
            message.annualProvisions = object.annualProvisions;
        } else {
            message.annualProvisions = "";
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
