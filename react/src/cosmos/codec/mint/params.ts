/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "mint";

/** Params holds parameters for the mint module. */
export interface Params {
    /** type of coin to mint */
    mintDenom: string;
    /** maximum annual change in inflation rate */
    inflationRateChange: string;
    /** maximum inflation rate */
    inflationMax: string;
    /** minimum inflation rate */
    inflationMin: string;
    /** goal of percent bonded atoms */
    goalBonded: string;
    /** expected blocks per year */
    blocksPerYear: Long;
    /** max amount to withdraw per time */
    maxWithdrawalPerTime: Coin[];
    /** the address of the smart contract */
    ethIntegrationAddress: string;
    /** flag if minting from air */
    mintAir: boolean;
    /** eligible to withdraw accounts */
    eligibleAccountsPool: string[];
}

const baseParams: object = {
    mintDenom: "",
    inflationRateChange: "",
    inflationMax: "",
    inflationMin: "",
    goalBonded: "",
    blocksPerYear: Long.UZERO,
    ethIntegrationAddress: "",
    mintAir: false,
    eligibleAccountsPool: ""
};

export const Params = {
    encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.mintDenom !== "") {
            writer.uint32(10).string(message.mintDenom);
        }
        if (message.inflationRateChange !== "") {
            writer.uint32(18).string(message.inflationRateChange);
        }
        if (message.inflationMax !== "") {
            writer.uint32(26).string(message.inflationMax);
        }
        if (message.inflationMin !== "") {
            writer.uint32(34).string(message.inflationMin);
        }
        if (message.goalBonded !== "") {
            writer.uint32(42).string(message.goalBonded);
        }
        if (!message.blocksPerYear.isZero()) {
            writer.uint32(48).uint64(message.blocksPerYear);
        }
        for (const v of message.maxWithdrawalPerTime) {
            Coin.encode(v!, writer.uint32(58).fork()).ldelim();
        }
        if (message.ethIntegrationAddress !== "") {
            writer.uint32(66).string(message.ethIntegrationAddress);
        }
        if (message.mintAir === true) {
            writer.uint32(72).bool(message.mintAir);
        }
        for (const v of message.eligibleAccountsPool) {
            writer.uint32(82).string(v!);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Params {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseParams } as Params;
        message.maxWithdrawalPerTime = [];
        message.eligibleAccountsPool = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.mintDenom = reader.string();
                    break;
                case 2:
                    message.inflationRateChange = reader.string();
                    break;
                case 3:
                    message.inflationMax = reader.string();
                    break;
                case 4:
                    message.inflationMin = reader.string();
                    break;
                case 5:
                    message.goalBonded = reader.string();
                    break;
                case 6:
                    message.blocksPerYear = reader.uint64() as Long;
                    break;
                case 7:
                    message.maxWithdrawalPerTime.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.ethIntegrationAddress = reader.string();
                    break;
                case 9:
                    message.mintAir = reader.bool();
                    break;
                case 10:
                    message.eligibleAccountsPool.push(reader.string());
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
        message.maxWithdrawalPerTime = [];
        message.eligibleAccountsPool = [];
        if (object.mintDenom !== undefined && object.mintDenom !== null) {
            message.mintDenom = String(object.mintDenom);
        } else {
            message.mintDenom = "";
        }
        if (object.inflationRateChange !== undefined && object.inflationRateChange !== null) {
            message.inflationRateChange = String(object.inflationRateChange);
        } else {
            message.inflationRateChange = "";
        }
        if (object.inflationMax !== undefined && object.inflationMax !== null) {
            message.inflationMax = String(object.inflationMax);
        } else {
            message.inflationMax = "";
        }
        if (object.inflationMin !== undefined && object.inflationMin !== null) {
            message.inflationMin = String(object.inflationMin);
        } else {
            message.inflationMin = "";
        }
        if (object.goalBonded !== undefined && object.goalBonded !== null) {
            message.goalBonded = String(object.goalBonded);
        } else {
            message.goalBonded = "";
        }
        if (object.blocksPerYear !== undefined && object.blocksPerYear !== null) {
            message.blocksPerYear = Long.fromString(object.blocksPerYear);
        } else {
            message.blocksPerYear = Long.UZERO;
        }
        if (object.maxWithdrawalPerTime !== undefined && object.maxWithdrawalPerTime !== null) {
            for (const e of object.maxWithdrawalPerTime) {
                message.maxWithdrawalPerTime.push(Coin.fromJSON(e));
            }
        }
        if (object.ethIntegrationAddress !== undefined && object.ethIntegrationAddress !== null) {
            message.ethIntegrationAddress = String(object.ethIntegrationAddress);
        } else {
            message.ethIntegrationAddress = "";
        }
        if (object.mintAir !== undefined && object.mintAir !== null) {
            message.mintAir = Boolean(object.mintAir);
        } else {
            message.mintAir = false;
        }
        if (object.eligibleAccountsPool !== undefined && object.eligibleAccountsPool !== null) {
            for (const e of object.eligibleAccountsPool) {
                message.eligibleAccountsPool.push(String(e));
            }
        }
        return message;
    },

    toJSON(message: Params): unknown {
        const obj: any = {};
        message.mintDenom !== undefined && (obj.mintDenom = message.mintDenom);
        message.inflationRateChange !== undefined &&
            (obj.inflationRateChange = message.inflationRateChange);
        message.inflationMax !== undefined && (obj.inflationMax = message.inflationMax);
        message.inflationMin !== undefined && (obj.inflationMin = message.inflationMin);
        message.goalBonded !== undefined && (obj.goalBonded = message.goalBonded);
        message.blocksPerYear !== undefined &&
            (obj.blocksPerYear = (message.blocksPerYear || Long.UZERO).toString());
        if (message.maxWithdrawalPerTime) {
            obj.maxWithdrawalPerTime = message.maxWithdrawalPerTime.map((e) =>
                e ? Coin.toJSON(e) : undefined
            );
        } else {
            obj.maxWithdrawalPerTime = [];
        }
        message.ethIntegrationAddress !== undefined &&
            (obj.ethIntegrationAddress = message.ethIntegrationAddress);
        message.mintAir !== undefined && (obj.mintAir = message.mintAir);
        if (message.eligibleAccountsPool) {
            obj.eligibleAccountsPool = message.eligibleAccountsPool.map((e) => e);
        } else {
            obj.eligibleAccountsPool = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<Params>): Params {
        const message = { ...baseParams } as Params;
        message.maxWithdrawalPerTime = [];
        message.eligibleAccountsPool = [];
        if (object.mintDenom !== undefined && object.mintDenom !== null) {
            message.mintDenom = object.mintDenom;
        } else {
            message.mintDenom = "";
        }
        if (object.inflationRateChange !== undefined && object.inflationRateChange !== null) {
            message.inflationRateChange = object.inflationRateChange;
        } else {
            message.inflationRateChange = "";
        }
        if (object.inflationMax !== undefined && object.inflationMax !== null) {
            message.inflationMax = object.inflationMax;
        } else {
            message.inflationMax = "";
        }
        if (object.inflationMin !== undefined && object.inflationMin !== null) {
            message.inflationMin = object.inflationMin;
        } else {
            message.inflationMin = "";
        }
        if (object.goalBonded !== undefined && object.goalBonded !== null) {
            message.goalBonded = object.goalBonded;
        } else {
            message.goalBonded = "";
        }
        if (object.blocksPerYear !== undefined && object.blocksPerYear !== null) {
            message.blocksPerYear = object.blocksPerYear as Long;
        } else {
            message.blocksPerYear = Long.UZERO;
        }
        if (object.maxWithdrawalPerTime !== undefined && object.maxWithdrawalPerTime !== null) {
            for (const e of object.maxWithdrawalPerTime) {
                message.maxWithdrawalPerTime.push(Coin.fromPartial(e));
            }
        }
        if (object.ethIntegrationAddress !== undefined && object.ethIntegrationAddress !== null) {
            message.ethIntegrationAddress = object.ethIntegrationAddress;
        } else {
            message.ethIntegrationAddress = "";
        }
        if (object.mintAir !== undefined && object.mintAir !== null) {
            message.mintAir = object.mintAir;
        } else {
            message.mintAir = false;
        }
        if (object.eligibleAccountsPool !== undefined && object.eligibleAccountsPool !== null) {
            for (const e of object.eligibleAccountsPool) {
                message.eligibleAccountsPool.push(e);
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
