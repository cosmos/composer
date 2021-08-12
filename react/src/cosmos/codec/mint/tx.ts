/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "mint";

/**
 * MsgWithdrawCoinsToAccFromTreasury is a message for withdrawing from mint
 * module.
 */
export interface MsgWithdrawCoinsToAccFromTreasury {
    /** Amount is the amoutn of coins to withdraw */
    amount: Coin[];
    /** Receiver is for whom withdraw coins */
    receiver: string;
    /** Sender is the message signer who submits this report transaction */
    sender: string;
}

/** MsgWithdrawCoinsToAccFromTreasuryResponse */
export interface MsgWithdrawCoinsToAccFromTreasuryResponse {}

const baseMsgWithdrawCoinsToAccFromTreasury: object = {
    receiver: "",
    sender: ""
};

export const MsgWithdrawCoinsToAccFromTreasury = {
    encode(
        message: MsgWithdrawCoinsToAccFromTreasury,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        for (const v of message.amount) {
            Coin.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        if (message.receiver !== "") {
            writer.uint32(18).string(message.receiver);
        }
        if (message.sender !== "") {
            writer.uint32(26).string(message.sender);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawCoinsToAccFromTreasury {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgWithdrawCoinsToAccFromTreasury
        } as MsgWithdrawCoinsToAccFromTreasury;
        message.amount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.receiver = reader.string();
                    break;
                case 3:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgWithdrawCoinsToAccFromTreasury {
        const message = {
            ...baseMsgWithdrawCoinsToAccFromTreasury
        } as MsgWithdrawCoinsToAccFromTreasury;
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromJSON(e));
            }
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = String(object.receiver);
        } else {
            message.receiver = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        } else {
            message.sender = "";
        }
        return message;
    },

    toJSON(message: MsgWithdrawCoinsToAccFromTreasury): unknown {
        const obj: any = {};
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.amount = [];
        }
        message.receiver !== undefined && (obj.receiver = message.receiver);
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },

    fromPartial(
        object: DeepPartial<MsgWithdrawCoinsToAccFromTreasury>
    ): MsgWithdrawCoinsToAccFromTreasury {
        const message = {
            ...baseMsgWithdrawCoinsToAccFromTreasury
        } as MsgWithdrawCoinsToAccFromTreasury;
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromPartial(e));
            }
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = object.receiver;
        } else {
            message.receiver = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        } else {
            message.sender = "";
        }
        return message;
    }
};

const baseMsgWithdrawCoinsToAccFromTreasuryResponse: object = {};

export const MsgWithdrawCoinsToAccFromTreasuryResponse = {
    encode(
        _: MsgWithdrawCoinsToAccFromTreasuryResponse,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        return writer;
    },

    decode(
        input: _m0.Reader | Uint8Array,
        length?: number
    ): MsgWithdrawCoinsToAccFromTreasuryResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgWithdrawCoinsToAccFromTreasuryResponse
        } as MsgWithdrawCoinsToAccFromTreasuryResponse;
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

    fromJSON(_: any): MsgWithdrawCoinsToAccFromTreasuryResponse {
        const message = {
            ...baseMsgWithdrawCoinsToAccFromTreasuryResponse
        } as MsgWithdrawCoinsToAccFromTreasuryResponse;
        return message;
    },

    toJSON(_: MsgWithdrawCoinsToAccFromTreasuryResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(
        _: DeepPartial<MsgWithdrawCoinsToAccFromTreasuryResponse>
    ): MsgWithdrawCoinsToAccFromTreasuryResponse {
        const message = {
            ...baseMsgWithdrawCoinsToAccFromTreasuryResponse
        } as MsgWithdrawCoinsToAccFromTreasuryResponse;
        return message;
    }
};

/** Msg defines the mint Msg service. */
export interface Msg {
    /**
     * WithdrawCoinsToAccFromTreasury defines a method for withdrawing from mint
     * module.
     */
    WithdrawCoinsToAccFromTreasury(
        request: MsgWithdrawCoinsToAccFromTreasury
    ): Promise<MsgWithdrawCoinsToAccFromTreasuryResponse>;
}

export class MsgClientImpl implements Msg {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
    }
    WithdrawCoinsToAccFromTreasury(
        request: MsgWithdrawCoinsToAccFromTreasury
    ): Promise<MsgWithdrawCoinsToAccFromTreasuryResponse> {
        const data = MsgWithdrawCoinsToAccFromTreasury.encode(request).finish();
        const promise = this.rpc.request("mint.Msg", "WithdrawCoinsToAccFromTreasury", data);
        return promise.then((data) =>
            MsgWithdrawCoinsToAccFromTreasuryResponse.decode(new _m0.Reader(data))
        );
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
