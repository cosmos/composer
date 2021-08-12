/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "oracle.v1";

/** ResolveStatus encodes the status of an oracle request. */
export enum ResolveStatus {
    /** RESOLVE_STATUS_OPEN_UNSPECIFIED - Open - the request is not yet resolved. */
    RESOLVE_STATUS_OPEN_UNSPECIFIED = 0,
    /** RESOLVE_STATUS_SUCCESS - Success - the request has been resolved successfully with no errors. */
    RESOLVE_STATUS_SUCCESS = 1,
    /** RESOLVE_STATUS_FAILURE - Failure - an error occured during the request's resolve call. */
    RESOLVE_STATUS_FAILURE = 2,
    /**
     * RESOLVE_STATUS_EXPIRED - Expired - the request does not get enough reports from validator within the
     * timeframe.
     */
    RESOLVE_STATUS_EXPIRED = 3,
    UNRECOGNIZED = -1
}

export function resolveStatusFromJSON(object: any): ResolveStatus {
    switch (object) {
        case 0:
        case "RESOLVE_STATUS_OPEN_UNSPECIFIED":
            return ResolveStatus.RESOLVE_STATUS_OPEN_UNSPECIFIED;
        case 1:
        case "RESOLVE_STATUS_SUCCESS":
            return ResolveStatus.RESOLVE_STATUS_SUCCESS;
        case 2:
        case "RESOLVE_STATUS_FAILURE":
            return ResolveStatus.RESOLVE_STATUS_FAILURE;
        case 3:
        case "RESOLVE_STATUS_EXPIRED":
            return ResolveStatus.RESOLVE_STATUS_EXPIRED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResolveStatus.UNRECOGNIZED;
    }
}

export function resolveStatusToJSON(object: ResolveStatus): string {
    switch (object) {
        case ResolveStatus.RESOLVE_STATUS_OPEN_UNSPECIFIED:
            return "RESOLVE_STATUS_OPEN_UNSPECIFIED";
        case ResolveStatus.RESOLVE_STATUS_SUCCESS:
            return "RESOLVE_STATUS_SUCCESS";
        case ResolveStatus.RESOLVE_STATUS_FAILURE:
            return "RESOLVE_STATUS_FAILURE";
        case ResolveStatus.RESOLVE_STATUS_EXPIRED:
            return "RESOLVE_STATUS_EXPIRED";
        default:
            return "UNKNOWN";
    }
}

/** DataSource is the data structure for storing data sources in the storage. */
export interface DataSource {
    id: Long;
    owner: string;
    name: string;
    description: string;
    filename: string;
    fee: Coin[];
}

/** OracleScript is the data structure for storing oracle scripts in the storage. */
export interface OracleScript {
    id: Long;
    owner: string;
    name: string;
    description: string;
    filename: string;
    schema: string;
    sourceCodeUrl: string;
}

/** RawRequest is the data structure for storing raw requests in the storage. */
export interface RawRequest {
    externalId: Long;
    dataSourceId: Long;
    calldata: Uint8Array;
}

/** RawRequest is the data structure for storing raw reporter in the storage. */
export interface RawReport {
    externalId: Long;
    exitCode: number;
    data: Uint8Array;
}

/** Request is the data structure for storing requests in the storage. */
export interface Request {
    id: Long;
    oracleScriptId: Long;
    calldata: Uint8Array;
    requestedValidators: string[];
    minCount: Long;
    requestHeight: Long;
    requestTime: Long;
    clientId: string;
    rawRequests: RawRequest[];
    ibcSource?: IBCSource;
    executeGas: Long;
}

/** Report is the data structure for storing reports in the storage. */
export interface Report {
    validator: string;
    inBeforeResolve: boolean;
    rawReports: RawReport[];
}

/**
 * OracleRequestPacketData encodes an oracle request sent from other blockchains
 * to BandChain.
 */
export interface OracleRequestPacketData {
    /**
     * ClientID is the unique identifier of this oracle request, as specified by
     * the client. This same unique ID will be sent back to the requester with the
     * oracle response.
     */
    clientId: string;
    /**
     * OracleScriptID is the unique identifier of the oracle script to be
     * executed.
     */
    oracleScriptId: Long;
    /** Calldata is the calldata bytes available for oracle executor to read. */
    calldata: Uint8Array;
    /**
     * AskCount is the number of validators that are requested to respond to this
     * oracle request. Higher value means more security, at a higher gas cost.
     */
    askCount: Long;
    /**
     * MinCount is the minimum number of validators necessary for the request to
     * proceed to the execution phase. Higher value means more security, at the
     * cost of liveness.
     */
    minCount: Long;
    /**
     * FeeLimit is the maximum tokens that will be paid to all data source
     * providers.
     */
    feeLimit: Coin[];
    /**
     * RequestKey is the key from request chain to match data source fee payer on
     * Bandchain
     */
    requestKey: string;
    /** PrepareGas is amount of gas to pay to prepare raw requests */
    prepareGas: Long;
    /** ExecuteGas is amount of gas to reserve for executing */
    executeGas: Long;
}

/**
 * OracleRequestPacketAcknowledgement encodes an oracle request acknowledgement
 * send back to requester chain.
 */
export interface OracleRequestPacketAcknowledgement {
    /** RequestID is BandChain's unique identifier for this oracle request. */
    requestId: Long;
}

/**
 * OracleResponsePacketData encodes an oracle response from BandChain to the
 * requester.
 */
export interface OracleResponsePacketData {
    /**
     * ClientID is the unique identifier matched with that of the oracle request
     * packet.
     */
    clientId: string;
    /** RequestID is BandChain's unique identifier for this oracle request. */
    requestId: Long;
    /**
     * AnsCount is the number of validators among to the asked validators that
     * actually responded to this oracle request prior to this oracle request
     * being resolved.
     */
    ansCount: Long;
    /**
     * RequestTime is the UNIX epoch time at which the request was sent to
     * BandChain.
     */
    requestTime: Long;
    /**
     * ResolveTime is the UNIX epoch time at which the request was resolved to the
     * final result.
     */
    resolveTime: Long;
    /**
     * ResolveStatus is the status of this oracle request, which can be OK,
     * FAILURE, or EXPIRED.
     */
    resolveStatus: ResolveStatus;
    /** Result is the final aggregated value only available if status if OK. */
    result: Uint8Array;
}

export interface RequestResult {
    requestPacketData?: OracleRequestPacketData;
    responsePacketData?: OracleResponsePacketData;
}

/** Result encodes a result of request and store in chain */
export interface Result {
    /**
     * ClientID is the unique identifier of this oracle request, as specified by
     * the client. This same unique ID will be sent back to the requester with the
     * oracle response.
     */
    clientId: string;
    /**
     * OracleScriptID is the unique identifier of the oracle script to be
     * executed.
     */
    oracleScriptId: Long;
    /** Calldata is the calldata bytes available for oracle executor to read. */
    calldata: Uint8Array;
    /**
     * AskCount is the number of validators that are requested to respond to this
     * oracle request. Higher value means more security, at a higher gas cost.
     */
    askCount: Long;
    /**
     * MinCount is the minimum number of validators necessary for the request to
     * proceed to the execution phase. Higher value means more security, at the
     * cost of liveness.
     */
    minCount: Long;
    /** RequestID is BandChain's unique identifier for this oracle request. */
    requestId: Long;
    /**
     * AnsCount is the number of validators among to the asked validators that
     * actually responded to this oracle request prior to this oracle request
     * being resolved.
     */
    ansCount: Long;
    /**
     * RequestTime is the UNIX epoch time at which the request was sent to
     * BandChain.
     */
    requestTime: Long;
    /**
     * ResolveTime is the UNIX epoch time at which the request was resolved to the
     * final result.
     */
    resolveTime: Long;
    /**
     * ResolveStatus is the status of this oracle request, which can be OK,
     * FAILURE, or EXPIRED.
     */
    resolveStatus: ResolveStatus;
    /** Result is the final aggregated value only available if status if OK. */
    result: Uint8Array;
}

/** ValidatorStatus maintains whether a validator is an active oracle provider. */
export interface ValidatorStatus {
    isActive: boolean;
    since?: Date;
}

/** PendingResolveList */
export interface PendingResolveList {
    requestIds: Long[];
}

/** IBCSource */
export interface IBCSource {
    /** SourceChannel */
    sourceChannel: string;
    /** SourcePort */
    sourcePort: string;
}

export interface OraclePool {
    dataProvidersPool: Coin[];
}

export interface DataProviderAccumulatedReward {
    dataProvider: string;
    dataProviderReward: Coin[];
}

export interface DataProvidersAccumulatedRewards {
    currentRewardPerByte: Coin[];
    accumulatedAmount: Coin[];
}

export interface AccumulatedPaymentsForData {
    accumulatedAmount: Coin[];
}

const baseDataSource: object = {
    id: Long.ZERO,
    owner: "",
    name: "",
    description: "",
    filename: ""
};

export const DataSource = {
    encode(message: DataSource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.id.isZero()) {
            writer.uint32(8).int64(message.id);
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.description !== "") {
            writer.uint32(34).string(message.description);
        }
        if (message.filename !== "") {
            writer.uint32(42).string(message.filename);
        }
        for (const v of message.fee) {
            Coin.encode(v!, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): DataSource {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDataSource } as DataSource;
        message.fee = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.int64() as Long;
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.description = reader.string();
                    break;
                case 5:
                    message.filename = reader.string();
                    break;
                case 6:
                    message.fee.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): DataSource {
        const message = { ...baseDataSource } as DataSource;
        message.fee = [];
        if (object.id !== undefined && object.id !== null) {
            message.id = Long.fromString(object.id);
        } else {
            message.id = Long.ZERO;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        } else {
            message.owner = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        } else {
            message.name = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        } else {
            message.description = "";
        }
        if (object.filename !== undefined && object.filename !== null) {
            message.filename = String(object.filename);
        } else {
            message.filename = "";
        }
        if (object.fee !== undefined && object.fee !== null) {
            for (const e of object.fee) {
                message.fee.push(Coin.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: DataSource): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = (message.id || Long.ZERO).toString());
        message.owner !== undefined && (obj.owner = message.owner);
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.filename !== undefined && (obj.filename = message.filename);
        if (message.fee) {
            obj.fee = message.fee.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.fee = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<DataSource>): DataSource {
        const message = { ...baseDataSource } as DataSource;
        message.fee = [];
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id as Long;
        } else {
            message.id = Long.ZERO;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        } else {
            message.owner = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        } else {
            message.name = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        } else {
            message.description = "";
        }
        if (object.filename !== undefined && object.filename !== null) {
            message.filename = object.filename;
        } else {
            message.filename = "";
        }
        if (object.fee !== undefined && object.fee !== null) {
            for (const e of object.fee) {
                message.fee.push(Coin.fromPartial(e));
            }
        }
        return message;
    }
};

const baseOracleScript: object = {
    id: Long.ZERO,
    owner: "",
    name: "",
    description: "",
    filename: "",
    schema: "",
    sourceCodeUrl: ""
};

export const OracleScript = {
    encode(message: OracleScript, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.id.isZero()) {
            writer.uint32(8).int64(message.id);
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.description !== "") {
            writer.uint32(34).string(message.description);
        }
        if (message.filename !== "") {
            writer.uint32(42).string(message.filename);
        }
        if (message.schema !== "") {
            writer.uint32(50).string(message.schema);
        }
        if (message.sourceCodeUrl !== "") {
            writer.uint32(58).string(message.sourceCodeUrl);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): OracleScript {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseOracleScript } as OracleScript;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.int64() as Long;
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.description = reader.string();
                    break;
                case 5:
                    message.filename = reader.string();
                    break;
                case 6:
                    message.schema = reader.string();
                    break;
                case 7:
                    message.sourceCodeUrl = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): OracleScript {
        const message = { ...baseOracleScript } as OracleScript;
        if (object.id !== undefined && object.id !== null) {
            message.id = Long.fromString(object.id);
        } else {
            message.id = Long.ZERO;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        } else {
            message.owner = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        } else {
            message.name = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        } else {
            message.description = "";
        }
        if (object.filename !== undefined && object.filename !== null) {
            message.filename = String(object.filename);
        } else {
            message.filename = "";
        }
        if (object.schema !== undefined && object.schema !== null) {
            message.schema = String(object.schema);
        } else {
            message.schema = "";
        }
        if (object.sourceCodeUrl !== undefined && object.sourceCodeUrl !== null) {
            message.sourceCodeUrl = String(object.sourceCodeUrl);
        } else {
            message.sourceCodeUrl = "";
        }
        return message;
    },

    toJSON(message: OracleScript): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = (message.id || Long.ZERO).toString());
        message.owner !== undefined && (obj.owner = message.owner);
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.filename !== undefined && (obj.filename = message.filename);
        message.schema !== undefined && (obj.schema = message.schema);
        message.sourceCodeUrl !== undefined && (obj.sourceCodeUrl = message.sourceCodeUrl);
        return obj;
    },

    fromPartial(object: DeepPartial<OracleScript>): OracleScript {
        const message = { ...baseOracleScript } as OracleScript;
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id as Long;
        } else {
            message.id = Long.ZERO;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        } else {
            message.owner = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        } else {
            message.name = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        } else {
            message.description = "";
        }
        if (object.filename !== undefined && object.filename !== null) {
            message.filename = object.filename;
        } else {
            message.filename = "";
        }
        if (object.schema !== undefined && object.schema !== null) {
            message.schema = object.schema;
        } else {
            message.schema = "";
        }
        if (object.sourceCodeUrl !== undefined && object.sourceCodeUrl !== null) {
            message.sourceCodeUrl = object.sourceCodeUrl;
        } else {
            message.sourceCodeUrl = "";
        }
        return message;
    }
};

const baseRawRequest: object = {
    externalId: Long.ZERO,
    dataSourceId: Long.ZERO
};

export const RawRequest = {
    encode(message: RawRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.externalId.isZero()) {
            writer.uint32(8).int64(message.externalId);
        }
        if (!message.dataSourceId.isZero()) {
            writer.uint32(16).int64(message.dataSourceId);
        }
        if (message.calldata.length !== 0) {
            writer.uint32(26).bytes(message.calldata);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): RawRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseRawRequest } as RawRequest;
        message.calldata = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.externalId = reader.int64() as Long;
                    break;
                case 2:
                    message.dataSourceId = reader.int64() as Long;
                    break;
                case 3:
                    message.calldata = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): RawRequest {
        const message = { ...baseRawRequest } as RawRequest;
        message.calldata = new Uint8Array();
        if (object.externalId !== undefined && object.externalId !== null) {
            message.externalId = Long.fromString(object.externalId);
        } else {
            message.externalId = Long.ZERO;
        }
        if (object.dataSourceId !== undefined && object.dataSourceId !== null) {
            message.dataSourceId = Long.fromString(object.dataSourceId);
        } else {
            message.dataSourceId = Long.ZERO;
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = bytesFromBase64(object.calldata);
        }
        return message;
    },

    toJSON(message: RawRequest): unknown {
        const obj: any = {};
        message.externalId !== undefined &&
            (obj.externalId = (message.externalId || Long.ZERO).toString());
        message.dataSourceId !== undefined &&
            (obj.dataSourceId = (message.dataSourceId || Long.ZERO).toString());
        message.calldata !== undefined &&
            (obj.calldata = base64FromBytes(
                message.calldata !== undefined ? message.calldata : new Uint8Array()
            ));
        return obj;
    },

    fromPartial(object: DeepPartial<RawRequest>): RawRequest {
        const message = { ...baseRawRequest } as RawRequest;
        if (object.externalId !== undefined && object.externalId !== null) {
            message.externalId = object.externalId as Long;
        } else {
            message.externalId = Long.ZERO;
        }
        if (object.dataSourceId !== undefined && object.dataSourceId !== null) {
            message.dataSourceId = object.dataSourceId as Long;
        } else {
            message.dataSourceId = Long.ZERO;
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = object.calldata;
        } else {
            message.calldata = new Uint8Array();
        }
        return message;
    }
};

const baseRawReport: object = { externalId: Long.ZERO, exitCode: 0 };

export const RawReport = {
    encode(message: RawReport, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.externalId.isZero()) {
            writer.uint32(8).int64(message.externalId);
        }
        if (message.exitCode !== 0) {
            writer.uint32(16).uint32(message.exitCode);
        }
        if (message.data.length !== 0) {
            writer.uint32(26).bytes(message.data);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): RawReport {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseRawReport } as RawReport;
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.externalId = reader.int64() as Long;
                    break;
                case 2:
                    message.exitCode = reader.uint32();
                    break;
                case 3:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): RawReport {
        const message = { ...baseRawReport } as RawReport;
        message.data = new Uint8Array();
        if (object.externalId !== undefined && object.externalId !== null) {
            message.externalId = Long.fromString(object.externalId);
        } else {
            message.externalId = Long.ZERO;
        }
        if (object.exitCode !== undefined && object.exitCode !== null) {
            message.exitCode = Number(object.exitCode);
        } else {
            message.exitCode = 0;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        return message;
    },

    toJSON(message: RawReport): unknown {
        const obj: any = {};
        message.externalId !== undefined &&
            (obj.externalId = (message.externalId || Long.ZERO).toString());
        message.exitCode !== undefined && (obj.exitCode = message.exitCode);
        message.data !== undefined &&
            (obj.data = base64FromBytes(
                message.data !== undefined ? message.data : new Uint8Array()
            ));
        return obj;
    },

    fromPartial(object: DeepPartial<RawReport>): RawReport {
        const message = { ...baseRawReport } as RawReport;
        if (object.externalId !== undefined && object.externalId !== null) {
            message.externalId = object.externalId as Long;
        } else {
            message.externalId = Long.ZERO;
        }
        if (object.exitCode !== undefined && object.exitCode !== null) {
            message.exitCode = object.exitCode;
        } else {
            message.exitCode = 0;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        } else {
            message.data = new Uint8Array();
        }
        return message;
    }
};

const baseRequest: object = {
    id: Long.ZERO,
    oracleScriptId: Long.ZERO,
    requestedValidators: "",
    minCount: Long.UZERO,
    requestHeight: Long.ZERO,
    requestTime: Long.UZERO,
    clientId: "",
    executeGas: Long.UZERO
};

export const Request = {
    encode(message: Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.id.isZero()) {
            writer.uint32(8).int64(message.id);
        }
        if (!message.oracleScriptId.isZero()) {
            writer.uint32(16).int64(message.oracleScriptId);
        }
        if (message.calldata.length !== 0) {
            writer.uint32(26).bytes(message.calldata);
        }
        for (const v of message.requestedValidators) {
            writer.uint32(34).string(v!);
        }
        if (!message.minCount.isZero()) {
            writer.uint32(40).uint64(message.minCount);
        }
        if (!message.requestHeight.isZero()) {
            writer.uint32(48).int64(message.requestHeight);
        }
        if (!message.requestTime.isZero()) {
            writer.uint32(56).uint64(message.requestTime);
        }
        if (message.clientId !== "") {
            writer.uint32(66).string(message.clientId);
        }
        for (const v of message.rawRequests) {
            RawRequest.encode(v!, writer.uint32(74).fork()).ldelim();
        }
        if (message.ibcSource !== undefined) {
            IBCSource.encode(message.ibcSource, writer.uint32(82).fork()).ldelim();
        }
        if (!message.executeGas.isZero()) {
            writer.uint32(88).uint64(message.executeGas);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Request {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseRequest } as Request;
        message.requestedValidators = [];
        message.rawRequests = [];
        message.calldata = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.int64() as Long;
                    break;
                case 2:
                    message.oracleScriptId = reader.int64() as Long;
                    break;
                case 3:
                    message.calldata = reader.bytes();
                    break;
                case 4:
                    message.requestedValidators.push(reader.string());
                    break;
                case 5:
                    message.minCount = reader.uint64() as Long;
                    break;
                case 6:
                    message.requestHeight = reader.int64() as Long;
                    break;
                case 7:
                    message.requestTime = reader.uint64() as Long;
                    break;
                case 8:
                    message.clientId = reader.string();
                    break;
                case 9:
                    message.rawRequests.push(RawRequest.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.ibcSource = IBCSource.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.executeGas = reader.uint64() as Long;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Request {
        const message = { ...baseRequest } as Request;
        message.requestedValidators = [];
        message.rawRequests = [];
        message.calldata = new Uint8Array();
        if (object.id !== undefined && object.id !== null) {
            message.id = Long.fromString(object.id);
        } else {
            message.id = Long.ZERO;
        }
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = Long.fromString(object.oracleScriptId);
        } else {
            message.oracleScriptId = Long.ZERO;
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = bytesFromBase64(object.calldata);
        }
        if (object.requestedValidators !== undefined && object.requestedValidators !== null) {
            for (const e of object.requestedValidators) {
                message.requestedValidators.push(String(e));
            }
        }
        if (object.minCount !== undefined && object.minCount !== null) {
            message.minCount = Long.fromString(object.minCount);
        } else {
            message.minCount = Long.UZERO;
        }
        if (object.requestHeight !== undefined && object.requestHeight !== null) {
            message.requestHeight = Long.fromString(object.requestHeight);
        } else {
            message.requestHeight = Long.ZERO;
        }
        if (object.requestTime !== undefined && object.requestTime !== null) {
            message.requestTime = Long.fromString(object.requestTime);
        } else {
            message.requestTime = Long.UZERO;
        }
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = String(object.clientId);
        } else {
            message.clientId = "";
        }
        if (object.rawRequests !== undefined && object.rawRequests !== null) {
            for (const e of object.rawRequests) {
                message.rawRequests.push(RawRequest.fromJSON(e));
            }
        }
        if (object.ibcSource !== undefined && object.ibcSource !== null) {
            message.ibcSource = IBCSource.fromJSON(object.ibcSource);
        } else {
            message.ibcSource = undefined;
        }
        if (object.executeGas !== undefined && object.executeGas !== null) {
            message.executeGas = Long.fromString(object.executeGas);
        } else {
            message.executeGas = Long.UZERO;
        }
        return message;
    },

    toJSON(message: Request): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = (message.id || Long.ZERO).toString());
        message.oracleScriptId !== undefined &&
            (obj.oracleScriptId = (message.oracleScriptId || Long.ZERO).toString());
        message.calldata !== undefined &&
            (obj.calldata = base64FromBytes(
                message.calldata !== undefined ? message.calldata : new Uint8Array()
            ));
        if (message.requestedValidators) {
            obj.requestedValidators = message.requestedValidators.map((e) => e);
        } else {
            obj.requestedValidators = [];
        }
        message.minCount !== undefined &&
            (obj.minCount = (message.minCount || Long.UZERO).toString());
        message.requestHeight !== undefined &&
            (obj.requestHeight = (message.requestHeight || Long.ZERO).toString());
        message.requestTime !== undefined &&
            (obj.requestTime = (message.requestTime || Long.UZERO).toString());
        message.clientId !== undefined && (obj.clientId = message.clientId);
        if (message.rawRequests) {
            obj.rawRequests = message.rawRequests.map((e) =>
                e ? RawRequest.toJSON(e) : undefined
            );
        } else {
            obj.rawRequests = [];
        }
        message.ibcSource !== undefined &&
            (obj.ibcSource = message.ibcSource ? IBCSource.toJSON(message.ibcSource) : undefined);
        message.executeGas !== undefined &&
            (obj.executeGas = (message.executeGas || Long.UZERO).toString());
        return obj;
    },

    fromPartial(object: DeepPartial<Request>): Request {
        const message = { ...baseRequest } as Request;
        message.requestedValidators = [];
        message.rawRequests = [];
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id as Long;
        } else {
            message.id = Long.ZERO;
        }
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = object.oracleScriptId as Long;
        } else {
            message.oracleScriptId = Long.ZERO;
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = object.calldata;
        } else {
            message.calldata = new Uint8Array();
        }
        if (object.requestedValidators !== undefined && object.requestedValidators !== null) {
            for (const e of object.requestedValidators) {
                message.requestedValidators.push(e);
            }
        }
        if (object.minCount !== undefined && object.minCount !== null) {
            message.minCount = object.minCount as Long;
        } else {
            message.minCount = Long.UZERO;
        }
        if (object.requestHeight !== undefined && object.requestHeight !== null) {
            message.requestHeight = object.requestHeight as Long;
        } else {
            message.requestHeight = Long.ZERO;
        }
        if (object.requestTime !== undefined && object.requestTime !== null) {
            message.requestTime = object.requestTime as Long;
        } else {
            message.requestTime = Long.UZERO;
        }
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = object.clientId;
        } else {
            message.clientId = "";
        }
        if (object.rawRequests !== undefined && object.rawRequests !== null) {
            for (const e of object.rawRequests) {
                message.rawRequests.push(RawRequest.fromPartial(e));
            }
        }
        if (object.ibcSource !== undefined && object.ibcSource !== null) {
            message.ibcSource = IBCSource.fromPartial(object.ibcSource);
        } else {
            message.ibcSource = undefined;
        }
        if (object.executeGas !== undefined && object.executeGas !== null) {
            message.executeGas = object.executeGas as Long;
        } else {
            message.executeGas = Long.UZERO;
        }
        return message;
    }
};

const baseReport: object = { validator: "", inBeforeResolve: false };

export const Report = {
    encode(message: Report, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        if (message.inBeforeResolve === true) {
            writer.uint32(16).bool(message.inBeforeResolve);
        }
        for (const v of message.rawReports) {
            RawReport.encode(v!, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Report {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseReport } as Report;
        message.rawReports = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                case 2:
                    message.inBeforeResolve = reader.bool();
                    break;
                case 3:
                    message.rawReports.push(RawReport.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Report {
        const message = { ...baseReport } as Report;
        message.rawReports = [];
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = String(object.validator);
        } else {
            message.validator = "";
        }
        if (object.inBeforeResolve !== undefined && object.inBeforeResolve !== null) {
            message.inBeforeResolve = Boolean(object.inBeforeResolve);
        } else {
            message.inBeforeResolve = false;
        }
        if (object.rawReports !== undefined && object.rawReports !== null) {
            for (const e of object.rawReports) {
                message.rawReports.push(RawReport.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: Report): unknown {
        const obj: any = {};
        message.validator !== undefined && (obj.validator = message.validator);
        message.inBeforeResolve !== undefined && (obj.inBeforeResolve = message.inBeforeResolve);
        if (message.rawReports) {
            obj.rawReports = message.rawReports.map((e) => (e ? RawReport.toJSON(e) : undefined));
        } else {
            obj.rawReports = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<Report>): Report {
        const message = { ...baseReport } as Report;
        message.rawReports = [];
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = object.validator;
        } else {
            message.validator = "";
        }
        if (object.inBeforeResolve !== undefined && object.inBeforeResolve !== null) {
            message.inBeforeResolve = object.inBeforeResolve;
        } else {
            message.inBeforeResolve = false;
        }
        if (object.rawReports !== undefined && object.rawReports !== null) {
            for (const e of object.rawReports) {
                message.rawReports.push(RawReport.fromPartial(e));
            }
        }
        return message;
    }
};

const baseOracleRequestPacketData: object = {
    clientId: "",
    oracleScriptId: Long.ZERO,
    askCount: Long.UZERO,
    minCount: Long.UZERO,
    requestKey: "",
    prepareGas: Long.UZERO,
    executeGas: Long.UZERO
};

export const OracleRequestPacketData = {
    encode(message: OracleRequestPacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (!message.oracleScriptId.isZero()) {
            writer.uint32(16).int64(message.oracleScriptId);
        }
        if (message.calldata.length !== 0) {
            writer.uint32(26).bytes(message.calldata);
        }
        if (!message.askCount.isZero()) {
            writer.uint32(32).uint64(message.askCount);
        }
        if (!message.minCount.isZero()) {
            writer.uint32(40).uint64(message.minCount);
        }
        for (const v of message.feeLimit) {
            Coin.encode(v!, writer.uint32(50).fork()).ldelim();
        }
        if (message.requestKey !== "") {
            writer.uint32(58).string(message.requestKey);
        }
        if (!message.prepareGas.isZero()) {
            writer.uint32(64).uint64(message.prepareGas);
        }
        if (!message.executeGas.isZero()) {
            writer.uint32(72).uint64(message.executeGas);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): OracleRequestPacketData {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseOracleRequestPacketData
        } as OracleRequestPacketData;
        message.feeLimit = [];
        message.calldata = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.oracleScriptId = reader.int64() as Long;
                    break;
                case 3:
                    message.calldata = reader.bytes();
                    break;
                case 4:
                    message.askCount = reader.uint64() as Long;
                    break;
                case 5:
                    message.minCount = reader.uint64() as Long;
                    break;
                case 6:
                    message.feeLimit.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.requestKey = reader.string();
                    break;
                case 8:
                    message.prepareGas = reader.uint64() as Long;
                    break;
                case 9:
                    message.executeGas = reader.uint64() as Long;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): OracleRequestPacketData {
        const message = {
            ...baseOracleRequestPacketData
        } as OracleRequestPacketData;
        message.feeLimit = [];
        message.calldata = new Uint8Array();
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = String(object.clientId);
        } else {
            message.clientId = "";
        }
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = Long.fromString(object.oracleScriptId);
        } else {
            message.oracleScriptId = Long.ZERO;
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = bytesFromBase64(object.calldata);
        }
        if (object.askCount !== undefined && object.askCount !== null) {
            message.askCount = Long.fromString(object.askCount);
        } else {
            message.askCount = Long.UZERO;
        }
        if (object.minCount !== undefined && object.minCount !== null) {
            message.minCount = Long.fromString(object.minCount);
        } else {
            message.minCount = Long.UZERO;
        }
        if (object.feeLimit !== undefined && object.feeLimit !== null) {
            for (const e of object.feeLimit) {
                message.feeLimit.push(Coin.fromJSON(e));
            }
        }
        if (object.requestKey !== undefined && object.requestKey !== null) {
            message.requestKey = String(object.requestKey);
        } else {
            message.requestKey = "";
        }
        if (object.prepareGas !== undefined && object.prepareGas !== null) {
            message.prepareGas = Long.fromString(object.prepareGas);
        } else {
            message.prepareGas = Long.UZERO;
        }
        if (object.executeGas !== undefined && object.executeGas !== null) {
            message.executeGas = Long.fromString(object.executeGas);
        } else {
            message.executeGas = Long.UZERO;
        }
        return message;
    },

    toJSON(message: OracleRequestPacketData): unknown {
        const obj: any = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.oracleScriptId !== undefined &&
            (obj.oracleScriptId = (message.oracleScriptId || Long.ZERO).toString());
        message.calldata !== undefined &&
            (obj.calldata = base64FromBytes(
                message.calldata !== undefined ? message.calldata : new Uint8Array()
            ));
        message.askCount !== undefined &&
            (obj.askCount = (message.askCount || Long.UZERO).toString());
        message.minCount !== undefined &&
            (obj.minCount = (message.minCount || Long.UZERO).toString());
        if (message.feeLimit) {
            obj.feeLimit = message.feeLimit.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.feeLimit = [];
        }
        message.requestKey !== undefined && (obj.requestKey = message.requestKey);
        message.prepareGas !== undefined &&
            (obj.prepareGas = (message.prepareGas || Long.UZERO).toString());
        message.executeGas !== undefined &&
            (obj.executeGas = (message.executeGas || Long.UZERO).toString());
        return obj;
    },

    fromPartial(object: DeepPartial<OracleRequestPacketData>): OracleRequestPacketData {
        const message = {
            ...baseOracleRequestPacketData
        } as OracleRequestPacketData;
        message.feeLimit = [];
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = object.clientId;
        } else {
            message.clientId = "";
        }
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = object.oracleScriptId as Long;
        } else {
            message.oracleScriptId = Long.ZERO;
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = object.calldata;
        } else {
            message.calldata = new Uint8Array();
        }
        if (object.askCount !== undefined && object.askCount !== null) {
            message.askCount = object.askCount as Long;
        } else {
            message.askCount = Long.UZERO;
        }
        if (object.minCount !== undefined && object.minCount !== null) {
            message.minCount = object.minCount as Long;
        } else {
            message.minCount = Long.UZERO;
        }
        if (object.feeLimit !== undefined && object.feeLimit !== null) {
            for (const e of object.feeLimit) {
                message.feeLimit.push(Coin.fromPartial(e));
            }
        }
        if (object.requestKey !== undefined && object.requestKey !== null) {
            message.requestKey = object.requestKey;
        } else {
            message.requestKey = "";
        }
        if (object.prepareGas !== undefined && object.prepareGas !== null) {
            message.prepareGas = object.prepareGas as Long;
        } else {
            message.prepareGas = Long.UZERO;
        }
        if (object.executeGas !== undefined && object.executeGas !== null) {
            message.executeGas = object.executeGas as Long;
        } else {
            message.executeGas = Long.UZERO;
        }
        return message;
    }
};

const baseOracleRequestPacketAcknowledgement: object = { requestId: Long.ZERO };

export const OracleRequestPacketAcknowledgement = {
    encode(
        message: OracleRequestPacketAcknowledgement,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (!message.requestId.isZero()) {
            writer.uint32(8).int64(message.requestId);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): OracleRequestPacketAcknowledgement {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseOracleRequestPacketAcknowledgement
        } as OracleRequestPacketAcknowledgement;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requestId = reader.int64() as Long;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): OracleRequestPacketAcknowledgement {
        const message = {
            ...baseOracleRequestPacketAcknowledgement
        } as OracleRequestPacketAcknowledgement;
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = Long.fromString(object.requestId);
        } else {
            message.requestId = Long.ZERO;
        }
        return message;
    },

    toJSON(message: OracleRequestPacketAcknowledgement): unknown {
        const obj: any = {};
        message.requestId !== undefined &&
            (obj.requestId = (message.requestId || Long.ZERO).toString());
        return obj;
    },

    fromPartial(
        object: DeepPartial<OracleRequestPacketAcknowledgement>
    ): OracleRequestPacketAcknowledgement {
        const message = {
            ...baseOracleRequestPacketAcknowledgement
        } as OracleRequestPacketAcknowledgement;
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = object.requestId as Long;
        } else {
            message.requestId = Long.ZERO;
        }
        return message;
    }
};

const baseOracleResponsePacketData: object = {
    clientId: "",
    requestId: Long.ZERO,
    ansCount: Long.UZERO,
    requestTime: Long.ZERO,
    resolveTime: Long.ZERO,
    resolveStatus: 0
};

export const OracleResponsePacketData = {
    encode(
        message: OracleResponsePacketData,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (!message.requestId.isZero()) {
            writer.uint32(16).int64(message.requestId);
        }
        if (!message.ansCount.isZero()) {
            writer.uint32(24).uint64(message.ansCount);
        }
        if (!message.requestTime.isZero()) {
            writer.uint32(32).int64(message.requestTime);
        }
        if (!message.resolveTime.isZero()) {
            writer.uint32(40).int64(message.resolveTime);
        }
        if (message.resolveStatus !== 0) {
            writer.uint32(48).int32(message.resolveStatus);
        }
        if (message.result.length !== 0) {
            writer.uint32(58).bytes(message.result);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): OracleResponsePacketData {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseOracleResponsePacketData
        } as OracleResponsePacketData;
        message.result = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.requestId = reader.int64() as Long;
                    break;
                case 3:
                    message.ansCount = reader.uint64() as Long;
                    break;
                case 4:
                    message.requestTime = reader.int64() as Long;
                    break;
                case 5:
                    message.resolveTime = reader.int64() as Long;
                    break;
                case 6:
                    message.resolveStatus = reader.int32() as any;
                    break;
                case 7:
                    message.result = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): OracleResponsePacketData {
        const message = {
            ...baseOracleResponsePacketData
        } as OracleResponsePacketData;
        message.result = new Uint8Array();
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = String(object.clientId);
        } else {
            message.clientId = "";
        }
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = Long.fromString(object.requestId);
        } else {
            message.requestId = Long.ZERO;
        }
        if (object.ansCount !== undefined && object.ansCount !== null) {
            message.ansCount = Long.fromString(object.ansCount);
        } else {
            message.ansCount = Long.UZERO;
        }
        if (object.requestTime !== undefined && object.requestTime !== null) {
            message.requestTime = Long.fromString(object.requestTime);
        } else {
            message.requestTime = Long.ZERO;
        }
        if (object.resolveTime !== undefined && object.resolveTime !== null) {
            message.resolveTime = Long.fromString(object.resolveTime);
        } else {
            message.resolveTime = Long.ZERO;
        }
        if (object.resolveStatus !== undefined && object.resolveStatus !== null) {
            message.resolveStatus = resolveStatusFromJSON(object.resolveStatus);
        } else {
            message.resolveStatus = 0;
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = bytesFromBase64(object.result);
        }
        return message;
    },

    toJSON(message: OracleResponsePacketData): unknown {
        const obj: any = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.requestId !== undefined &&
            (obj.requestId = (message.requestId || Long.ZERO).toString());
        message.ansCount !== undefined &&
            (obj.ansCount = (message.ansCount || Long.UZERO).toString());
        message.requestTime !== undefined &&
            (obj.requestTime = (message.requestTime || Long.ZERO).toString());
        message.resolveTime !== undefined &&
            (obj.resolveTime = (message.resolveTime || Long.ZERO).toString());
        message.resolveStatus !== undefined &&
            (obj.resolveStatus = resolveStatusToJSON(message.resolveStatus));
        message.result !== undefined &&
            (obj.result = base64FromBytes(
                message.result !== undefined ? message.result : new Uint8Array()
            ));
        return obj;
    },

    fromPartial(object: DeepPartial<OracleResponsePacketData>): OracleResponsePacketData {
        const message = {
            ...baseOracleResponsePacketData
        } as OracleResponsePacketData;
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = object.clientId;
        } else {
            message.clientId = "";
        }
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = object.requestId as Long;
        } else {
            message.requestId = Long.ZERO;
        }
        if (object.ansCount !== undefined && object.ansCount !== null) {
            message.ansCount = object.ansCount as Long;
        } else {
            message.ansCount = Long.UZERO;
        }
        if (object.requestTime !== undefined && object.requestTime !== null) {
            message.requestTime = object.requestTime as Long;
        } else {
            message.requestTime = Long.ZERO;
        }
        if (object.resolveTime !== undefined && object.resolveTime !== null) {
            message.resolveTime = object.resolveTime as Long;
        } else {
            message.resolveTime = Long.ZERO;
        }
        if (object.resolveStatus !== undefined && object.resolveStatus !== null) {
            message.resolveStatus = object.resolveStatus;
        } else {
            message.resolveStatus = 0;
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        } else {
            message.result = new Uint8Array();
        }
        return message;
    }
};

const baseRequestResult: object = {};

export const RequestResult = {
    encode(message: RequestResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.requestPacketData !== undefined) {
            OracleRequestPacketData.encode(
                message.requestPacketData,
                writer.uint32(10).fork()
            ).ldelim();
        }
        if (message.responsePacketData !== undefined) {
            OracleResponsePacketData.encode(
                message.responsePacketData,
                writer.uint32(18).fork()
            ).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): RequestResult {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseRequestResult } as RequestResult;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requestPacketData = OracleRequestPacketData.decode(
                        reader,
                        reader.uint32()
                    );
                    break;
                case 2:
                    message.responsePacketData = OracleResponsePacketData.decode(
                        reader,
                        reader.uint32()
                    );
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): RequestResult {
        const message = { ...baseRequestResult } as RequestResult;
        if (object.requestPacketData !== undefined && object.requestPacketData !== null) {
            message.requestPacketData = OracleRequestPacketData.fromJSON(object.requestPacketData);
        } else {
            message.requestPacketData = undefined;
        }
        if (object.responsePacketData !== undefined && object.responsePacketData !== null) {
            message.responsePacketData = OracleResponsePacketData.fromJSON(
                object.responsePacketData
            );
        } else {
            message.responsePacketData = undefined;
        }
        return message;
    },

    toJSON(message: RequestResult): unknown {
        const obj: any = {};
        message.requestPacketData !== undefined &&
            (obj.requestPacketData = message.requestPacketData
                ? OracleRequestPacketData.toJSON(message.requestPacketData)
                : undefined);
        message.responsePacketData !== undefined &&
            (obj.responsePacketData = message.responsePacketData
                ? OracleResponsePacketData.toJSON(message.responsePacketData)
                : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<RequestResult>): RequestResult {
        const message = { ...baseRequestResult } as RequestResult;
        if (object.requestPacketData !== undefined && object.requestPacketData !== null) {
            message.requestPacketData = OracleRequestPacketData.fromPartial(
                object.requestPacketData
            );
        } else {
            message.requestPacketData = undefined;
        }
        if (object.responsePacketData !== undefined && object.responsePacketData !== null) {
            message.responsePacketData = OracleResponsePacketData.fromPartial(
                object.responsePacketData
            );
        } else {
            message.responsePacketData = undefined;
        }
        return message;
    }
};

const baseResult: object = {
    clientId: "",
    oracleScriptId: Long.ZERO,
    askCount: Long.UZERO,
    minCount: Long.UZERO,
    requestId: Long.ZERO,
    ansCount: Long.UZERO,
    requestTime: Long.ZERO,
    resolveTime: Long.ZERO,
    resolveStatus: 0
};

export const Result = {
    encode(message: Result, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (!message.oracleScriptId.isZero()) {
            writer.uint32(16).int64(message.oracleScriptId);
        }
        if (message.calldata.length !== 0) {
            writer.uint32(26).bytes(message.calldata);
        }
        if (!message.askCount.isZero()) {
            writer.uint32(32).uint64(message.askCount);
        }
        if (!message.minCount.isZero()) {
            writer.uint32(40).uint64(message.minCount);
        }
        if (!message.requestId.isZero()) {
            writer.uint32(48).int64(message.requestId);
        }
        if (!message.ansCount.isZero()) {
            writer.uint32(56).uint64(message.ansCount);
        }
        if (!message.requestTime.isZero()) {
            writer.uint32(64).int64(message.requestTime);
        }
        if (!message.resolveTime.isZero()) {
            writer.uint32(72).int64(message.resolveTime);
        }
        if (message.resolveStatus !== 0) {
            writer.uint32(80).int32(message.resolveStatus);
        }
        if (message.result.length !== 0) {
            writer.uint32(90).bytes(message.result);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Result {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseResult } as Result;
        message.calldata = new Uint8Array();
        message.result = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.oracleScriptId = reader.int64() as Long;
                    break;
                case 3:
                    message.calldata = reader.bytes();
                    break;
                case 4:
                    message.askCount = reader.uint64() as Long;
                    break;
                case 5:
                    message.minCount = reader.uint64() as Long;
                    break;
                case 6:
                    message.requestId = reader.int64() as Long;
                    break;
                case 7:
                    message.ansCount = reader.uint64() as Long;
                    break;
                case 8:
                    message.requestTime = reader.int64() as Long;
                    break;
                case 9:
                    message.resolveTime = reader.int64() as Long;
                    break;
                case 10:
                    message.resolveStatus = reader.int32() as any;
                    break;
                case 11:
                    message.result = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Result {
        const message = { ...baseResult } as Result;
        message.calldata = new Uint8Array();
        message.result = new Uint8Array();
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = String(object.clientId);
        } else {
            message.clientId = "";
        }
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = Long.fromString(object.oracleScriptId);
        } else {
            message.oracleScriptId = Long.ZERO;
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = bytesFromBase64(object.calldata);
        }
        if (object.askCount !== undefined && object.askCount !== null) {
            message.askCount = Long.fromString(object.askCount);
        } else {
            message.askCount = Long.UZERO;
        }
        if (object.minCount !== undefined && object.minCount !== null) {
            message.minCount = Long.fromString(object.minCount);
        } else {
            message.minCount = Long.UZERO;
        }
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = Long.fromString(object.requestId);
        } else {
            message.requestId = Long.ZERO;
        }
        if (object.ansCount !== undefined && object.ansCount !== null) {
            message.ansCount = Long.fromString(object.ansCount);
        } else {
            message.ansCount = Long.UZERO;
        }
        if (object.requestTime !== undefined && object.requestTime !== null) {
            message.requestTime = Long.fromString(object.requestTime);
        } else {
            message.requestTime = Long.ZERO;
        }
        if (object.resolveTime !== undefined && object.resolveTime !== null) {
            message.resolveTime = Long.fromString(object.resolveTime);
        } else {
            message.resolveTime = Long.ZERO;
        }
        if (object.resolveStatus !== undefined && object.resolveStatus !== null) {
            message.resolveStatus = resolveStatusFromJSON(object.resolveStatus);
        } else {
            message.resolveStatus = 0;
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = bytesFromBase64(object.result);
        }
        return message;
    },

    toJSON(message: Result): unknown {
        const obj: any = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.oracleScriptId !== undefined &&
            (obj.oracleScriptId = (message.oracleScriptId || Long.ZERO).toString());
        message.calldata !== undefined &&
            (obj.calldata = base64FromBytes(
                message.calldata !== undefined ? message.calldata : new Uint8Array()
            ));
        message.askCount !== undefined &&
            (obj.askCount = (message.askCount || Long.UZERO).toString());
        message.minCount !== undefined &&
            (obj.minCount = (message.minCount || Long.UZERO).toString());
        message.requestId !== undefined &&
            (obj.requestId = (message.requestId || Long.ZERO).toString());
        message.ansCount !== undefined &&
            (obj.ansCount = (message.ansCount || Long.UZERO).toString());
        message.requestTime !== undefined &&
            (obj.requestTime = (message.requestTime || Long.ZERO).toString());
        message.resolveTime !== undefined &&
            (obj.resolveTime = (message.resolveTime || Long.ZERO).toString());
        message.resolveStatus !== undefined &&
            (obj.resolveStatus = resolveStatusToJSON(message.resolveStatus));
        message.result !== undefined &&
            (obj.result = base64FromBytes(
                message.result !== undefined ? message.result : new Uint8Array()
            ));
        return obj;
    },

    fromPartial(object: DeepPartial<Result>): Result {
        const message = { ...baseResult } as Result;
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = object.clientId;
        } else {
            message.clientId = "";
        }
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = object.oracleScriptId as Long;
        } else {
            message.oracleScriptId = Long.ZERO;
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = object.calldata;
        } else {
            message.calldata = new Uint8Array();
        }
        if (object.askCount !== undefined && object.askCount !== null) {
            message.askCount = object.askCount as Long;
        } else {
            message.askCount = Long.UZERO;
        }
        if (object.minCount !== undefined && object.minCount !== null) {
            message.minCount = object.minCount as Long;
        } else {
            message.minCount = Long.UZERO;
        }
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = object.requestId as Long;
        } else {
            message.requestId = Long.ZERO;
        }
        if (object.ansCount !== undefined && object.ansCount !== null) {
            message.ansCount = object.ansCount as Long;
        } else {
            message.ansCount = Long.UZERO;
        }
        if (object.requestTime !== undefined && object.requestTime !== null) {
            message.requestTime = object.requestTime as Long;
        } else {
            message.requestTime = Long.ZERO;
        }
        if (object.resolveTime !== undefined && object.resolveTime !== null) {
            message.resolveTime = object.resolveTime as Long;
        } else {
            message.resolveTime = Long.ZERO;
        }
        if (object.resolveStatus !== undefined && object.resolveStatus !== null) {
            message.resolveStatus = object.resolveStatus;
        } else {
            message.resolveStatus = 0;
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        } else {
            message.result = new Uint8Array();
        }
        return message;
    }
};

const baseValidatorStatus: object = { isActive: false };

export const ValidatorStatus = {
    encode(message: ValidatorStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.isActive === true) {
            writer.uint32(8).bool(message.isActive);
        }
        if (message.since !== undefined) {
            Timestamp.encode(toTimestamp(message.since), writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorStatus {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseValidatorStatus } as ValidatorStatus;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.isActive = reader.bool();
                    break;
                case 2:
                    message.since = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): ValidatorStatus {
        const message = { ...baseValidatorStatus } as ValidatorStatus;
        if (object.isActive !== undefined && object.isActive !== null) {
            message.isActive = Boolean(object.isActive);
        } else {
            message.isActive = false;
        }
        if (object.since !== undefined && object.since !== null) {
            message.since = fromJsonTimestamp(object.since);
        } else {
            message.since = undefined;
        }
        return message;
    },

    toJSON(message: ValidatorStatus): unknown {
        const obj: any = {};
        message.isActive !== undefined && (obj.isActive = message.isActive);
        message.since !== undefined && (obj.since = message.since.toISOString());
        return obj;
    },

    fromPartial(object: DeepPartial<ValidatorStatus>): ValidatorStatus {
        const message = { ...baseValidatorStatus } as ValidatorStatus;
        if (object.isActive !== undefined && object.isActive !== null) {
            message.isActive = object.isActive;
        } else {
            message.isActive = false;
        }
        if (object.since !== undefined && object.since !== null) {
            message.since = object.since;
        } else {
            message.since = undefined;
        }
        return message;
    }
};

const basePendingResolveList: object = { requestIds: Long.ZERO };

export const PendingResolveList = {
    encode(message: PendingResolveList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        writer.uint32(10).fork();
        for (const v of message.requestIds) {
            writer.int64(v);
        }
        writer.ldelim();
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): PendingResolveList {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePendingResolveList } as PendingResolveList;
        message.requestIds = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.requestIds.push(reader.int64() as Long);
                        }
                    } else {
                        message.requestIds.push(reader.int64() as Long);
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): PendingResolveList {
        const message = { ...basePendingResolveList } as PendingResolveList;
        message.requestIds = [];
        if (object.requestIds !== undefined && object.requestIds !== null) {
            for (const e of object.requestIds) {
                message.requestIds.push(Long.fromString(e));
            }
        }
        return message;
    },

    toJSON(message: PendingResolveList): unknown {
        const obj: any = {};
        if (message.requestIds) {
            obj.requestIds = message.requestIds.map((e) => (e || Long.ZERO).toString());
        } else {
            obj.requestIds = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<PendingResolveList>): PendingResolveList {
        const message = { ...basePendingResolveList } as PendingResolveList;
        message.requestIds = [];
        if (object.requestIds !== undefined && object.requestIds !== null) {
            for (const e of object.requestIds) {
                message.requestIds.push(e);
            }
        }
        return message;
    }
};

const baseIBCSource: object = { sourceChannel: "", sourcePort: "" };

export const IBCSource = {
    encode(message: IBCSource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.sourceChannel !== "") {
            writer.uint32(10).string(message.sourceChannel);
        }
        if (message.sourcePort !== "") {
            writer.uint32(18).string(message.sourcePort);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): IBCSource {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIBCSource } as IBCSource;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sourceChannel = reader.string();
                    break;
                case 2:
                    message.sourcePort = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): IBCSource {
        const message = { ...baseIBCSource } as IBCSource;
        if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
            message.sourceChannel = String(object.sourceChannel);
        } else {
            message.sourceChannel = "";
        }
        if (object.sourcePort !== undefined && object.sourcePort !== null) {
            message.sourcePort = String(object.sourcePort);
        } else {
            message.sourcePort = "";
        }
        return message;
    },

    toJSON(message: IBCSource): unknown {
        const obj: any = {};
        message.sourceChannel !== undefined && (obj.sourceChannel = message.sourceChannel);
        message.sourcePort !== undefined && (obj.sourcePort = message.sourcePort);
        return obj;
    },

    fromPartial(object: DeepPartial<IBCSource>): IBCSource {
        const message = { ...baseIBCSource } as IBCSource;
        if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
            message.sourceChannel = object.sourceChannel;
        } else {
            message.sourceChannel = "";
        }
        if (object.sourcePort !== undefined && object.sourcePort !== null) {
            message.sourcePort = object.sourcePort;
        } else {
            message.sourcePort = "";
        }
        return message;
    }
};

const baseOraclePool: object = {};

export const OraclePool = {
    encode(message: OraclePool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.dataProvidersPool) {
            Coin.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): OraclePool {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseOraclePool } as OraclePool;
        message.dataProvidersPool = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.dataProvidersPool.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): OraclePool {
        const message = { ...baseOraclePool } as OraclePool;
        message.dataProvidersPool = [];
        if (object.dataProvidersPool !== undefined && object.dataProvidersPool !== null) {
            for (const e of object.dataProvidersPool) {
                message.dataProvidersPool.push(Coin.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: OraclePool): unknown {
        const obj: any = {};
        if (message.dataProvidersPool) {
            obj.dataProvidersPool = message.dataProvidersPool.map((e) =>
                e ? Coin.toJSON(e) : undefined
            );
        } else {
            obj.dataProvidersPool = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<OraclePool>): OraclePool {
        const message = { ...baseOraclePool } as OraclePool;
        message.dataProvidersPool = [];
        if (object.dataProvidersPool !== undefined && object.dataProvidersPool !== null) {
            for (const e of object.dataProvidersPool) {
                message.dataProvidersPool.push(Coin.fromPartial(e));
            }
        }
        return message;
    }
};

const baseDataProviderAccumulatedReward: object = { dataProvider: "" };

export const DataProviderAccumulatedReward = {
    encode(
        message: DataProviderAccumulatedReward,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.dataProvider !== "") {
            writer.uint32(10).string(message.dataProvider);
        }
        for (const v of message.dataProviderReward) {
            Coin.encode(v!, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): DataProviderAccumulatedReward {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseDataProviderAccumulatedReward
        } as DataProviderAccumulatedReward;
        message.dataProviderReward = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.dataProvider = reader.string();
                    break;
                case 2:
                    message.dataProviderReward.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): DataProviderAccumulatedReward {
        const message = {
            ...baseDataProviderAccumulatedReward
        } as DataProviderAccumulatedReward;
        message.dataProviderReward = [];
        if (object.dataProvider !== undefined && object.dataProvider !== null) {
            message.dataProvider = String(object.dataProvider);
        } else {
            message.dataProvider = "";
        }
        if (object.dataProviderReward !== undefined && object.dataProviderReward !== null) {
            for (const e of object.dataProviderReward) {
                message.dataProviderReward.push(Coin.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: DataProviderAccumulatedReward): unknown {
        const obj: any = {};
        message.dataProvider !== undefined && (obj.dataProvider = message.dataProvider);
        if (message.dataProviderReward) {
            obj.dataProviderReward = message.dataProviderReward.map((e) =>
                e ? Coin.toJSON(e) : undefined
            );
        } else {
            obj.dataProviderReward = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<DataProviderAccumulatedReward>): DataProviderAccumulatedReward {
        const message = {
            ...baseDataProviderAccumulatedReward
        } as DataProviderAccumulatedReward;
        message.dataProviderReward = [];
        if (object.dataProvider !== undefined && object.dataProvider !== null) {
            message.dataProvider = object.dataProvider;
        } else {
            message.dataProvider = "";
        }
        if (object.dataProviderReward !== undefined && object.dataProviderReward !== null) {
            for (const e of object.dataProviderReward) {
                message.dataProviderReward.push(Coin.fromPartial(e));
            }
        }
        return message;
    }
};

const baseDataProvidersAccumulatedRewards: object = {};

export const DataProvidersAccumulatedRewards = {
    encode(
        message: DataProvidersAccumulatedRewards,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        for (const v of message.currentRewardPerByte) {
            Coin.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.accumulatedAmount) {
            Coin.encode(v!, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): DataProvidersAccumulatedRewards {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseDataProvidersAccumulatedRewards
        } as DataProvidersAccumulatedRewards;
        message.currentRewardPerByte = [];
        message.accumulatedAmount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.currentRewardPerByte.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.accumulatedAmount.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): DataProvidersAccumulatedRewards {
        const message = {
            ...baseDataProvidersAccumulatedRewards
        } as DataProvidersAccumulatedRewards;
        message.currentRewardPerByte = [];
        message.accumulatedAmount = [];
        if (object.currentRewardPerByte !== undefined && object.currentRewardPerByte !== null) {
            for (const e of object.currentRewardPerByte) {
                message.currentRewardPerByte.push(Coin.fromJSON(e));
            }
        }
        if (object.accumulatedAmount !== undefined && object.accumulatedAmount !== null) {
            for (const e of object.accumulatedAmount) {
                message.accumulatedAmount.push(Coin.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: DataProvidersAccumulatedRewards): unknown {
        const obj: any = {};
        if (message.currentRewardPerByte) {
            obj.currentRewardPerByte = message.currentRewardPerByte.map((e) =>
                e ? Coin.toJSON(e) : undefined
            );
        } else {
            obj.currentRewardPerByte = [];
        }
        if (message.accumulatedAmount) {
            obj.accumulatedAmount = message.accumulatedAmount.map((e) =>
                e ? Coin.toJSON(e) : undefined
            );
        } else {
            obj.accumulatedAmount = [];
        }
        return obj;
    },

    fromPartial(
        object: DeepPartial<DataProvidersAccumulatedRewards>
    ): DataProvidersAccumulatedRewards {
        const message = {
            ...baseDataProvidersAccumulatedRewards
        } as DataProvidersAccumulatedRewards;
        message.currentRewardPerByte = [];
        message.accumulatedAmount = [];
        if (object.currentRewardPerByte !== undefined && object.currentRewardPerByte !== null) {
            for (const e of object.currentRewardPerByte) {
                message.currentRewardPerByte.push(Coin.fromPartial(e));
            }
        }
        if (object.accumulatedAmount !== undefined && object.accumulatedAmount !== null) {
            for (const e of object.accumulatedAmount) {
                message.accumulatedAmount.push(Coin.fromPartial(e));
            }
        }
        return message;
    }
};

const baseAccumulatedPaymentsForData: object = {};

export const AccumulatedPaymentsForData = {
    encode(
        message: AccumulatedPaymentsForData,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        for (const v of message.accumulatedAmount) {
            Coin.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): AccumulatedPaymentsForData {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseAccumulatedPaymentsForData
        } as AccumulatedPaymentsForData;
        message.accumulatedAmount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accumulatedAmount.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): AccumulatedPaymentsForData {
        const message = {
            ...baseAccumulatedPaymentsForData
        } as AccumulatedPaymentsForData;
        message.accumulatedAmount = [];
        if (object.accumulatedAmount !== undefined && object.accumulatedAmount !== null) {
            for (const e of object.accumulatedAmount) {
                message.accumulatedAmount.push(Coin.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: AccumulatedPaymentsForData): unknown {
        const obj: any = {};
        if (message.accumulatedAmount) {
            obj.accumulatedAmount = message.accumulatedAmount.map((e) =>
                e ? Coin.toJSON(e) : undefined
            );
        } else {
            obj.accumulatedAmount = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<AccumulatedPaymentsForData>): AccumulatedPaymentsForData {
        const message = {
            ...baseAccumulatedPaymentsForData
        } as AccumulatedPaymentsForData;
        message.accumulatedAmount = [];
        if (object.accumulatedAmount !== undefined && object.accumulatedAmount !== null) {
            for (const e of object.accumulatedAmount) {
                message.accumulatedAmount.push(Coin.fromPartial(e));
            }
        }
        return message;
    }
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    if (typeof global !== "undefined") return global;
    throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
    globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}

const btoa: (bin: string) => string =
    globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
    const bin: string[] = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(""));
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

function toTimestamp(date: Date): Timestamp {
    const seconds = numberToLong(date.getTime() / 1_000);
    const nanos = (date.getTime() % 1_000) * 1_000_000;
    return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
    let millis = t.seconds.toNumber() * 1_000;
    millis += t.nanos / 1_000_000;
    return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
    if (o instanceof Date) {
        return o;
    } else if (typeof o === "string") {
        return new Date(o);
    } else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}

function numberToLong(number: number) {
    return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
    _m0.util.Long = Long as any;
    _m0.configure();
}
