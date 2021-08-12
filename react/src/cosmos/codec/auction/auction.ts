/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "auction";

export interface AuctionStatus {
    /** Pending is the status of the auction (active or not) */
    pending: boolean;
}

const baseAuctionStatus: object = { pending: false };

export const AuctionStatus = {
    encode(message: AuctionStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.pending === true) {
            writer.uint32(8).bool(message.pending);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): AuctionStatus {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseAuctionStatus } as AuctionStatus;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pending = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): AuctionStatus {
        const message = { ...baseAuctionStatus } as AuctionStatus;
        if (object.pending !== undefined && object.pending !== null) {
            message.pending = Boolean(object.pending);
        } else {
            message.pending = false;
        }
        return message;
    },

    toJSON(message: AuctionStatus): unknown {
        const obj: any = {};
        message.pending !== undefined && (obj.pending = message.pending);
        return obj;
    },

    fromPartial(object: DeepPartial<AuctionStatus>): AuctionStatus {
        const message = { ...baseAuctionStatus } as AuctionStatus;
        if (object.pending !== undefined && object.pending !== null) {
            message.pending = object.pending;
        } else {
            message.pending = false;
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
