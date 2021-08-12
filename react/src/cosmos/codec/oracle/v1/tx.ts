/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { RawReport } from "../../oracle/v1/oracle";

export const protobufPackage = "oracle.v1";

/** MsgRequestData is a message for sending a data oracle request. */
export interface MsgRequestData {
    /** OracleScriptID is the identifier of the oracle script to call. */
    oracleScriptId: Long;
    /** Calldata is the OBI encoded call parameters to the oracle script. */
    calldata: Uint8Array;
    /** AskCount is the number of validators to perform the oracle task. */
    askCount: Long;
    /**
     * MinCount is the minimum number of validators sufficient to resolve the
     * tasks.
     */
    minCount: Long;
    /** ClientID is the client-provided unique identifier to tracking the request. */
    clientId: string;
    /**
     * FeeLimit is the maximum tokens that will be paid to all data source
     * providers.
     */
    feeLimit: Coin[];
    /** PrepareGas is amount of gas to pay to prepare raw requests */
    prepareGas: Long;
    /** ExecuteGas is amount of gas to reserve for executing */
    executeGas: Long;
    /** Sender is the sender of this message. */
    sender: string;
}

/** MsgRequestDataResponse */
export interface MsgRequestDataResponse {}

/** MsgReportData is a message for reporting to a data request by a validator. */
export interface MsgReportData {
    /** RequestID is the identifier of the request to report to. */
    requestId: Long;
    /**
     * RawReports is the list of report information for each of the request's
     * external ID.
     */
    rawReports: RawReport[];
    /** Validator is the address of the validator that owns this report. */
    validator: string;
    /**
     * Reporter is the message signer who submits this report transaction for the
     * validator.
     */
    reporter: string;
}

/** MsgReportDataResponse */
export interface MsgReportDataResponse {}

/** MsgCreateDataSource is a message for creating a new data source. */
export interface MsgCreateDataSource {
    /** Name is the name of this data source (optional). */
    name: string;
    /** Description is the description of this data source (optional). */
    description: string;
    /**
     * Executable is the executable script or binary to be run by validators upon
     * execution.
     */
    executable: Uint8Array;
    /**
     * Fee is the data source fee per ask_count that data provider will receive
     * from requester.
     */
    fee: Coin[];
    /**
     * Owner is the address who is allowed to make further changes to the data
     * source.
     */
    owner: string;
    /** Sender is the signer of this message. */
    sender: string;
}

/** MsgCreateDataSourceResponse */
export interface MsgCreateDataSourceResponse {}

/** MsgEditDataSource is a message for editing an existing data source. */
export interface MsgEditDataSource {
    /** DataSourceID is the unique identifier of the data source to be edited. */
    dataSourceId: Long;
    /** Name is the name of this data source (optional). */
    name: string;
    /** Description is the description of this data source (optional). */
    description: string;
    /**
     * Executable is the executable script or binary to be run by validators upon
     * execution.
     */
    executable: Uint8Array;
    /**
     * Fee is the data source fee per ask_count that data provider will receive
     * from requester.
     */
    fee: Coin[];
    /**
     * Owner is the address who is allowed to make further changes to the data
     * source.
     */
    owner: string;
    /**
     * Sender is the signer of this message. Must be the current data source's
     * owner.
     */
    sender: string;
}

/** MsgEditDataSourceResponse */
export interface MsgEditDataSourceResponse {}

/** MsgCreateOracleScript is a message for creating an oracle script. */
export interface MsgCreateOracleScript {
    /** Name is the name of this oracle script (optional). */
    name: string;
    /** Description is the description of this oracle script (optional). */
    description: string;
    /** Schema is the OBI schema of this oracle script (optional). */
    schema: string;
    /** SourceCodeURL is the absolute URI to the script's source code (optional). */
    sourceCodeUrl: string;
    /** Code is the oracle WebAssembly binary code. Can be raw of gzip compressed. */
    code: Uint8Array;
    /**
     * Owner is the address who is allowed to make further changes to the oracle
     * script.
     */
    owner: string;
    /** Sender is the signer of this message. */
    sender: string;
}

/** MsgCreateOracleScriptResponse */
export interface MsgCreateOracleScriptResponse {}

/** MsgEditOracleScript is a message for editing an existing oracle script. */
export interface MsgEditOracleScript {
    /** OracleScriptID is the unique identifier of the oracle script to be edited. */
    oracleScriptId: Long;
    /** Name is the name of this oracle script (optional). */
    name: string;
    /** Description is the description of this oracle script (optional). */
    description: string;
    /** Schema is the OBI schema of this oracle script (optional). */
    schema: string;
    /** SourceCodeURL is the absolute URI to the script's source code (optional). */
    sourceCodeUrl: string;
    /** Code is the oracle WebAssembly binary code. Can be raw of gzip compressed. */
    code: Uint8Array;
    /**
     * Owner is new the address who is allowed to make further changes to the
     * oracle script.
     */
    owner: string;
    /**
     * Sender is the signer of this message. Must be the current oracle script's
     * owner.
     */
    sender: string;
}

/** MsgEditOracleScriptResponse */
export interface MsgEditOracleScriptResponse {}

/**
 * MsgEditOracleScript is a message for activating a validator to become an
 * oracle provider.
 */
export interface MsgActivate {
    /** Validator is the signer of this message and the validator to be activated. */
    validator: string;
}

/** MsgActivateResponse */
export interface MsgActivateResponse {}

/** MsgAddReporter is a message for adding a new reporter for a validator. */
export interface MsgAddReporter {
    /**
     * Validator is the validator that wishes to add a new reporter. This is the
     * signer.
     */
    validator: string;
    /** Reporter is the address to be added as a reporter to the validator. */
    reporter: string;
}

/** MsgAddReporterResponse */
export interface MsgAddReporterResponse {}

/**
 * MsgAddReporter is a message for removing an existing reporter from a
 * validator.
 */
export interface MsgRemoveReporter {
    /**
     * Validator is the validator that wishes to remove an existing reporter. This
     * is the signer.
     */
    validator: string;
    /** Reporter is the address to be removed from being the validators' reporter. */
    reporter: string;
}

/** MsgRemoveReporterResponse */
export interface MsgRemoveReporterResponse {}

const baseMsgRequestData: object = {
    oracleScriptId: Long.ZERO,
    askCount: Long.UZERO,
    minCount: Long.UZERO,
    clientId: "",
    prepareGas: Long.UZERO,
    executeGas: Long.UZERO,
    sender: ""
};

export const MsgRequestData = {
    encode(message: MsgRequestData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.oracleScriptId.isZero()) {
            writer.uint32(8).int64(message.oracleScriptId);
        }
        if (message.calldata.length !== 0) {
            writer.uint32(18).bytes(message.calldata);
        }
        if (!message.askCount.isZero()) {
            writer.uint32(24).uint64(message.askCount);
        }
        if (!message.minCount.isZero()) {
            writer.uint32(32).uint64(message.minCount);
        }
        if (message.clientId !== "") {
            writer.uint32(42).string(message.clientId);
        }
        for (const v of message.feeLimit) {
            Coin.encode(v!, writer.uint32(50).fork()).ldelim();
        }
        if (!message.prepareGas.isZero()) {
            writer.uint32(56).uint64(message.prepareGas);
        }
        if (!message.executeGas.isZero()) {
            writer.uint32(64).uint64(message.executeGas);
        }
        if (message.sender !== "") {
            writer.uint32(74).string(message.sender);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRequestData {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRequestData } as MsgRequestData;
        message.feeLimit = [];
        message.calldata = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.oracleScriptId = reader.int64() as Long;
                    break;
                case 2:
                    message.calldata = reader.bytes();
                    break;
                case 3:
                    message.askCount = reader.uint64() as Long;
                    break;
                case 4:
                    message.minCount = reader.uint64() as Long;
                    break;
                case 5:
                    message.clientId = reader.string();
                    break;
                case 6:
                    message.feeLimit.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.prepareGas = reader.uint64() as Long;
                    break;
                case 8:
                    message.executeGas = reader.uint64() as Long;
                    break;
                case 9:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgRequestData {
        const message = { ...baseMsgRequestData } as MsgRequestData;
        message.feeLimit = [];
        message.calldata = new Uint8Array();
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
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = String(object.clientId);
        } else {
            message.clientId = "";
        }
        if (object.feeLimit !== undefined && object.feeLimit !== null) {
            for (const e of object.feeLimit) {
                message.feeLimit.push(Coin.fromJSON(e));
            }
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        } else {
            message.sender = "";
        }
        return message;
    },

    toJSON(message: MsgRequestData): unknown {
        const obj: any = {};
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
        message.clientId !== undefined && (obj.clientId = message.clientId);
        if (message.feeLimit) {
            obj.feeLimit = message.feeLimit.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.feeLimit = [];
        }
        message.prepareGas !== undefined &&
            (obj.prepareGas = (message.prepareGas || Long.UZERO).toString());
        message.executeGas !== undefined &&
            (obj.executeGas = (message.executeGas || Long.UZERO).toString());
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgRequestData>): MsgRequestData {
        const message = { ...baseMsgRequestData } as MsgRequestData;
        message.feeLimit = [];
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
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = object.clientId;
        } else {
            message.clientId = "";
        }
        if (object.feeLimit !== undefined && object.feeLimit !== null) {
            for (const e of object.feeLimit) {
                message.feeLimit.push(Coin.fromPartial(e));
            }
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        } else {
            message.sender = "";
        }
        return message;
    }
};

const baseMsgRequestDataResponse: object = {};

export const MsgRequestDataResponse = {
    encode(_: MsgRequestDataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRequestDataResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRequestDataResponse } as MsgRequestDataResponse;
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

    fromJSON(_: any): MsgRequestDataResponse {
        const message = { ...baseMsgRequestDataResponse } as MsgRequestDataResponse;
        return message;
    },

    toJSON(_: MsgRequestDataResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgRequestDataResponse>): MsgRequestDataResponse {
        const message = { ...baseMsgRequestDataResponse } as MsgRequestDataResponse;
        return message;
    }
};

const baseMsgReportData: object = {
    requestId: Long.ZERO,
    validator: "",
    reporter: ""
};

export const MsgReportData = {
    encode(message: MsgReportData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.requestId.isZero()) {
            writer.uint32(8).int64(message.requestId);
        }
        for (const v of message.rawReports) {
            RawReport.encode(v!, writer.uint32(18).fork()).ldelim();
        }
        if (message.validator !== "") {
            writer.uint32(26).string(message.validator);
        }
        if (message.reporter !== "") {
            writer.uint32(34).string(message.reporter);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgReportData {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgReportData } as MsgReportData;
        message.rawReports = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requestId = reader.int64() as Long;
                    break;
                case 2:
                    message.rawReports.push(RawReport.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.validator = reader.string();
                    break;
                case 4:
                    message.reporter = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgReportData {
        const message = { ...baseMsgReportData } as MsgReportData;
        message.rawReports = [];
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = Long.fromString(object.requestId);
        } else {
            message.requestId = Long.ZERO;
        }
        if (object.rawReports !== undefined && object.rawReports !== null) {
            for (const e of object.rawReports) {
                message.rawReports.push(RawReport.fromJSON(e));
            }
        }
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = String(object.validator);
        } else {
            message.validator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = String(object.reporter);
        } else {
            message.reporter = "";
        }
        return message;
    },

    toJSON(message: MsgReportData): unknown {
        const obj: any = {};
        message.requestId !== undefined &&
            (obj.requestId = (message.requestId || Long.ZERO).toString());
        if (message.rawReports) {
            obj.rawReports = message.rawReports.map((e) => (e ? RawReport.toJSON(e) : undefined));
        } else {
            obj.rawReports = [];
        }
        message.validator !== undefined && (obj.validator = message.validator);
        message.reporter !== undefined && (obj.reporter = message.reporter);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgReportData>): MsgReportData {
        const message = { ...baseMsgReportData } as MsgReportData;
        message.rawReports = [];
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = object.requestId as Long;
        } else {
            message.requestId = Long.ZERO;
        }
        if (object.rawReports !== undefined && object.rawReports !== null) {
            for (const e of object.rawReports) {
                message.rawReports.push(RawReport.fromPartial(e));
            }
        }
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = object.validator;
        } else {
            message.validator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = object.reporter;
        } else {
            message.reporter = "";
        }
        return message;
    }
};

const baseMsgReportDataResponse: object = {};

export const MsgReportDataResponse = {
    encode(_: MsgReportDataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgReportDataResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgReportDataResponse } as MsgReportDataResponse;
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

    fromJSON(_: any): MsgReportDataResponse {
        const message = { ...baseMsgReportDataResponse } as MsgReportDataResponse;
        return message;
    },

    toJSON(_: MsgReportDataResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgReportDataResponse>): MsgReportDataResponse {
        const message = { ...baseMsgReportDataResponse } as MsgReportDataResponse;
        return message;
    }
};

const baseMsgCreateDataSource: object = {
    name: "",
    description: "",
    owner: "",
    sender: ""
};

export const MsgCreateDataSource = {
    encode(message: MsgCreateDataSource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        if (message.executable.length !== 0) {
            writer.uint32(26).bytes(message.executable);
        }
        for (const v of message.fee) {
            Coin.encode(v!, writer.uint32(34).fork()).ldelim();
        }
        if (message.owner !== "") {
            writer.uint32(42).string(message.owner);
        }
        if (message.sender !== "") {
            writer.uint32(50).string(message.sender);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDataSource {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateDataSource } as MsgCreateDataSource;
        message.fee = [];
        message.executable = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                case 3:
                    message.executable = reader.bytes();
                    break;
                case 4:
                    message.fee.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.owner = reader.string();
                    break;
                case 6:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgCreateDataSource {
        const message = { ...baseMsgCreateDataSource } as MsgCreateDataSource;
        message.fee = [];
        message.executable = new Uint8Array();
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
        if (object.executable !== undefined && object.executable !== null) {
            message.executable = bytesFromBase64(object.executable);
        }
        if (object.fee !== undefined && object.fee !== null) {
            for (const e of object.fee) {
                message.fee.push(Coin.fromJSON(e));
            }
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        } else {
            message.owner = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        } else {
            message.sender = "";
        }
        return message;
    },

    toJSON(message: MsgCreateDataSource): unknown {
        const obj: any = {};
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.executable !== undefined &&
            (obj.executable = base64FromBytes(
                message.executable !== undefined ? message.executable : new Uint8Array()
            ));
        if (message.fee) {
            obj.fee = message.fee.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.fee = [];
        }
        message.owner !== undefined && (obj.owner = message.owner);
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgCreateDataSource>): MsgCreateDataSource {
        const message = { ...baseMsgCreateDataSource } as MsgCreateDataSource;
        message.fee = [];
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
        if (object.executable !== undefined && object.executable !== null) {
            message.executable = object.executable;
        } else {
            message.executable = new Uint8Array();
        }
        if (object.fee !== undefined && object.fee !== null) {
            for (const e of object.fee) {
                message.fee.push(Coin.fromPartial(e));
            }
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        } else {
            message.owner = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        } else {
            message.sender = "";
        }
        return message;
    }
};

const baseMsgCreateDataSourceResponse: object = {};

export const MsgCreateDataSourceResponse = {
    encode(_: MsgCreateDataSourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDataSourceResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateDataSourceResponse
        } as MsgCreateDataSourceResponse;
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

    fromJSON(_: any): MsgCreateDataSourceResponse {
        const message = {
            ...baseMsgCreateDataSourceResponse
        } as MsgCreateDataSourceResponse;
        return message;
    },

    toJSON(_: MsgCreateDataSourceResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgCreateDataSourceResponse>): MsgCreateDataSourceResponse {
        const message = {
            ...baseMsgCreateDataSourceResponse
        } as MsgCreateDataSourceResponse;
        return message;
    }
};

const baseMsgEditDataSource: object = {
    dataSourceId: Long.ZERO,
    name: "",
    description: "",
    owner: "",
    sender: ""
};

export const MsgEditDataSource = {
    encode(message: MsgEditDataSource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.dataSourceId.isZero()) {
            writer.uint32(8).int64(message.dataSourceId);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        if (message.executable.length !== 0) {
            writer.uint32(34).bytes(message.executable);
        }
        for (const v of message.fee) {
            Coin.encode(v!, writer.uint32(42).fork()).ldelim();
        }
        if (message.owner !== "") {
            writer.uint32(50).string(message.owner);
        }
        if (message.sender !== "") {
            writer.uint32(58).string(message.sender);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditDataSource {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgEditDataSource } as MsgEditDataSource;
        message.fee = [];
        message.executable = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.dataSourceId = reader.int64() as Long;
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.description = reader.string();
                    break;
                case 4:
                    message.executable = reader.bytes();
                    break;
                case 5:
                    message.fee.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.owner = reader.string();
                    break;
                case 7:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgEditDataSource {
        const message = { ...baseMsgEditDataSource } as MsgEditDataSource;
        message.fee = [];
        message.executable = new Uint8Array();
        if (object.dataSourceId !== undefined && object.dataSourceId !== null) {
            message.dataSourceId = Long.fromString(object.dataSourceId);
        } else {
            message.dataSourceId = Long.ZERO;
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
        if (object.executable !== undefined && object.executable !== null) {
            message.executable = bytesFromBase64(object.executable);
        }
        if (object.fee !== undefined && object.fee !== null) {
            for (const e of object.fee) {
                message.fee.push(Coin.fromJSON(e));
            }
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        } else {
            message.owner = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        } else {
            message.sender = "";
        }
        return message;
    },

    toJSON(message: MsgEditDataSource): unknown {
        const obj: any = {};
        message.dataSourceId !== undefined &&
            (obj.dataSourceId = (message.dataSourceId || Long.ZERO).toString());
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.executable !== undefined &&
            (obj.executable = base64FromBytes(
                message.executable !== undefined ? message.executable : new Uint8Array()
            ));
        if (message.fee) {
            obj.fee = message.fee.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.fee = [];
        }
        message.owner !== undefined && (obj.owner = message.owner);
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgEditDataSource>): MsgEditDataSource {
        const message = { ...baseMsgEditDataSource } as MsgEditDataSource;
        message.fee = [];
        if (object.dataSourceId !== undefined && object.dataSourceId !== null) {
            message.dataSourceId = object.dataSourceId as Long;
        } else {
            message.dataSourceId = Long.ZERO;
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
        if (object.executable !== undefined && object.executable !== null) {
            message.executable = object.executable;
        } else {
            message.executable = new Uint8Array();
        }
        if (object.fee !== undefined && object.fee !== null) {
            for (const e of object.fee) {
                message.fee.push(Coin.fromPartial(e));
            }
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        } else {
            message.owner = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        } else {
            message.sender = "";
        }
        return message;
    }
};

const baseMsgEditDataSourceResponse: object = {};

export const MsgEditDataSourceResponse = {
    encode(_: MsgEditDataSourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditDataSourceResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgEditDataSourceResponse
        } as MsgEditDataSourceResponse;
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

    fromJSON(_: any): MsgEditDataSourceResponse {
        const message = {
            ...baseMsgEditDataSourceResponse
        } as MsgEditDataSourceResponse;
        return message;
    },

    toJSON(_: MsgEditDataSourceResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgEditDataSourceResponse>): MsgEditDataSourceResponse {
        const message = {
            ...baseMsgEditDataSourceResponse
        } as MsgEditDataSourceResponse;
        return message;
    }
};

const baseMsgCreateOracleScript: object = {
    name: "",
    description: "",
    schema: "",
    sourceCodeUrl: "",
    owner: "",
    sender: ""
};

export const MsgCreateOracleScript = {
    encode(message: MsgCreateOracleScript, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        if (message.schema !== "") {
            writer.uint32(26).string(message.schema);
        }
        if (message.sourceCodeUrl !== "") {
            writer.uint32(34).string(message.sourceCodeUrl);
        }
        if (message.code.length !== 0) {
            writer.uint32(42).bytes(message.code);
        }
        if (message.owner !== "") {
            writer.uint32(50).string(message.owner);
        }
        if (message.sender !== "") {
            writer.uint32(58).string(message.sender);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateOracleScript {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateOracleScript } as MsgCreateOracleScript;
        message.code = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                case 3:
                    message.schema = reader.string();
                    break;
                case 4:
                    message.sourceCodeUrl = reader.string();
                    break;
                case 5:
                    message.code = reader.bytes();
                    break;
                case 6:
                    message.owner = reader.string();
                    break;
                case 7:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgCreateOracleScript {
        const message = { ...baseMsgCreateOracleScript } as MsgCreateOracleScript;
        message.code = new Uint8Array();
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
        if (object.code !== undefined && object.code !== null) {
            message.code = bytesFromBase64(object.code);
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        } else {
            message.owner = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        } else {
            message.sender = "";
        }
        return message;
    },

    toJSON(message: MsgCreateOracleScript): unknown {
        const obj: any = {};
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.schema !== undefined && (obj.schema = message.schema);
        message.sourceCodeUrl !== undefined && (obj.sourceCodeUrl = message.sourceCodeUrl);
        message.code !== undefined &&
            (obj.code = base64FromBytes(
                message.code !== undefined ? message.code : new Uint8Array()
            ));
        message.owner !== undefined && (obj.owner = message.owner);
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgCreateOracleScript>): MsgCreateOracleScript {
        const message = { ...baseMsgCreateOracleScript } as MsgCreateOracleScript;
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
        if (object.code !== undefined && object.code !== null) {
            message.code = object.code;
        } else {
            message.code = new Uint8Array();
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        } else {
            message.owner = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        } else {
            message.sender = "";
        }
        return message;
    }
};

const baseMsgCreateOracleScriptResponse: object = {};

export const MsgCreateOracleScriptResponse = {
    encode(_: MsgCreateOracleScriptResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateOracleScriptResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateOracleScriptResponse
        } as MsgCreateOracleScriptResponse;
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

    fromJSON(_: any): MsgCreateOracleScriptResponse {
        const message = {
            ...baseMsgCreateOracleScriptResponse
        } as MsgCreateOracleScriptResponse;
        return message;
    },

    toJSON(_: MsgCreateOracleScriptResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgCreateOracleScriptResponse>): MsgCreateOracleScriptResponse {
        const message = {
            ...baseMsgCreateOracleScriptResponse
        } as MsgCreateOracleScriptResponse;
        return message;
    }
};

const baseMsgEditOracleScript: object = {
    oracleScriptId: Long.ZERO,
    name: "",
    description: "",
    schema: "",
    sourceCodeUrl: "",
    owner: "",
    sender: ""
};

export const MsgEditOracleScript = {
    encode(message: MsgEditOracleScript, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.oracleScriptId.isZero()) {
            writer.uint32(8).int64(message.oracleScriptId);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        if (message.schema !== "") {
            writer.uint32(34).string(message.schema);
        }
        if (message.sourceCodeUrl !== "") {
            writer.uint32(42).string(message.sourceCodeUrl);
        }
        if (message.code.length !== 0) {
            writer.uint32(50).bytes(message.code);
        }
        if (message.owner !== "") {
            writer.uint32(58).string(message.owner);
        }
        if (message.sender !== "") {
            writer.uint32(66).string(message.sender);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditOracleScript {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgEditOracleScript } as MsgEditOracleScript;
        message.code = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.oracleScriptId = reader.int64() as Long;
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.description = reader.string();
                    break;
                case 4:
                    message.schema = reader.string();
                    break;
                case 5:
                    message.sourceCodeUrl = reader.string();
                    break;
                case 6:
                    message.code = reader.bytes();
                    break;
                case 7:
                    message.owner = reader.string();
                    break;
                case 8:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgEditOracleScript {
        const message = { ...baseMsgEditOracleScript } as MsgEditOracleScript;
        message.code = new Uint8Array();
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = Long.fromString(object.oracleScriptId);
        } else {
            message.oracleScriptId = Long.ZERO;
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
        if (object.code !== undefined && object.code !== null) {
            message.code = bytesFromBase64(object.code);
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        } else {
            message.owner = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        } else {
            message.sender = "";
        }
        return message;
    },

    toJSON(message: MsgEditOracleScript): unknown {
        const obj: any = {};
        message.oracleScriptId !== undefined &&
            (obj.oracleScriptId = (message.oracleScriptId || Long.ZERO).toString());
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.schema !== undefined && (obj.schema = message.schema);
        message.sourceCodeUrl !== undefined && (obj.sourceCodeUrl = message.sourceCodeUrl);
        message.code !== undefined &&
            (obj.code = base64FromBytes(
                message.code !== undefined ? message.code : new Uint8Array()
            ));
        message.owner !== undefined && (obj.owner = message.owner);
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgEditOracleScript>): MsgEditOracleScript {
        const message = { ...baseMsgEditOracleScript } as MsgEditOracleScript;
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = object.oracleScriptId as Long;
        } else {
            message.oracleScriptId = Long.ZERO;
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
        if (object.code !== undefined && object.code !== null) {
            message.code = object.code;
        } else {
            message.code = new Uint8Array();
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        } else {
            message.owner = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        } else {
            message.sender = "";
        }
        return message;
    }
};

const baseMsgEditOracleScriptResponse: object = {};

export const MsgEditOracleScriptResponse = {
    encode(_: MsgEditOracleScriptResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditOracleScriptResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgEditOracleScriptResponse
        } as MsgEditOracleScriptResponse;
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

    fromJSON(_: any): MsgEditOracleScriptResponse {
        const message = {
            ...baseMsgEditOracleScriptResponse
        } as MsgEditOracleScriptResponse;
        return message;
    },

    toJSON(_: MsgEditOracleScriptResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgEditOracleScriptResponse>): MsgEditOracleScriptResponse {
        const message = {
            ...baseMsgEditOracleScriptResponse
        } as MsgEditOracleScriptResponse;
        return message;
    }
};

const baseMsgActivate: object = { validator: "" };

export const MsgActivate = {
    encode(message: MsgActivate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgActivate {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgActivate } as MsgActivate;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgActivate {
        const message = { ...baseMsgActivate } as MsgActivate;
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = String(object.validator);
        } else {
            message.validator = "";
        }
        return message;
    },

    toJSON(message: MsgActivate): unknown {
        const obj: any = {};
        message.validator !== undefined && (obj.validator = message.validator);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgActivate>): MsgActivate {
        const message = { ...baseMsgActivate } as MsgActivate;
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = object.validator;
        } else {
            message.validator = "";
        }
        return message;
    }
};

const baseMsgActivateResponse: object = {};

export const MsgActivateResponse = {
    encode(_: MsgActivateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgActivateResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgActivateResponse } as MsgActivateResponse;
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

    fromJSON(_: any): MsgActivateResponse {
        const message = { ...baseMsgActivateResponse } as MsgActivateResponse;
        return message;
    },

    toJSON(_: MsgActivateResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgActivateResponse>): MsgActivateResponse {
        const message = { ...baseMsgActivateResponse } as MsgActivateResponse;
        return message;
    }
};

const baseMsgAddReporter: object = { validator: "", reporter: "" };

export const MsgAddReporter = {
    encode(message: MsgAddReporter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        if (message.reporter !== "") {
            writer.uint32(18).string(message.reporter);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddReporter {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddReporter } as MsgAddReporter;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                case 2:
                    message.reporter = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgAddReporter {
        const message = { ...baseMsgAddReporter } as MsgAddReporter;
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = String(object.validator);
        } else {
            message.validator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = String(object.reporter);
        } else {
            message.reporter = "";
        }
        return message;
    },

    toJSON(message: MsgAddReporter): unknown {
        const obj: any = {};
        message.validator !== undefined && (obj.validator = message.validator);
        message.reporter !== undefined && (obj.reporter = message.reporter);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgAddReporter>): MsgAddReporter {
        const message = { ...baseMsgAddReporter } as MsgAddReporter;
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = object.validator;
        } else {
            message.validator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = object.reporter;
        } else {
            message.reporter = "";
        }
        return message;
    }
};

const baseMsgAddReporterResponse: object = {};

export const MsgAddReporterResponse = {
    encode(_: MsgAddReporterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddReporterResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddReporterResponse } as MsgAddReporterResponse;
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

    fromJSON(_: any): MsgAddReporterResponse {
        const message = { ...baseMsgAddReporterResponse } as MsgAddReporterResponse;
        return message;
    },

    toJSON(_: MsgAddReporterResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgAddReporterResponse>): MsgAddReporterResponse {
        const message = { ...baseMsgAddReporterResponse } as MsgAddReporterResponse;
        return message;
    }
};

const baseMsgRemoveReporter: object = { validator: "", reporter: "" };

export const MsgRemoveReporter = {
    encode(message: MsgRemoveReporter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        if (message.reporter !== "") {
            writer.uint32(18).string(message.reporter);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveReporter {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRemoveReporter } as MsgRemoveReporter;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                case 2:
                    message.reporter = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgRemoveReporter {
        const message = { ...baseMsgRemoveReporter } as MsgRemoveReporter;
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = String(object.validator);
        } else {
            message.validator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = String(object.reporter);
        } else {
            message.reporter = "";
        }
        return message;
    },

    toJSON(message: MsgRemoveReporter): unknown {
        const obj: any = {};
        message.validator !== undefined && (obj.validator = message.validator);
        message.reporter !== undefined && (obj.reporter = message.reporter);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgRemoveReporter>): MsgRemoveReporter {
        const message = { ...baseMsgRemoveReporter } as MsgRemoveReporter;
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = object.validator;
        } else {
            message.validator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = object.reporter;
        } else {
            message.reporter = "";
        }
        return message;
    }
};

const baseMsgRemoveReporterResponse: object = {};

export const MsgRemoveReporterResponse = {
    encode(_: MsgRemoveReporterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveReporterResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveReporterResponse
        } as MsgRemoveReporterResponse;
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

    fromJSON(_: any): MsgRemoveReporterResponse {
        const message = {
            ...baseMsgRemoveReporterResponse
        } as MsgRemoveReporterResponse;
        return message;
    },

    toJSON(_: MsgRemoveReporterResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgRemoveReporterResponse>): MsgRemoveReporterResponse {
        const message = {
            ...baseMsgRemoveReporterResponse
        } as MsgRemoveReporterResponse;
        return message;
    }
};

/** Msg defines the oracle Msg service. */
export interface Msg {
    /** RequestData defines a method for requesting a new request. */
    RequestData(request: MsgRequestData): Promise<MsgRequestDataResponse>;
    /** ReportData defines a method for reporting a data to resolving the request. */
    ReportData(request: MsgReportData): Promise<MsgReportDataResponse>;
    /** CreateDataSource defines a method for creating a new data source. */
    CreateDataSource(request: MsgCreateDataSource): Promise<MsgCreateDataSourceResponse>;
    /** EditDataSource defines a method for editing an existing data source. */
    EditDataSource(request: MsgEditDataSource): Promise<MsgEditDataSourceResponse>;
    /** CreateOracleScript defines a method for creating a new oracle script. */
    CreateOracleScript(request: MsgCreateOracleScript): Promise<MsgCreateOracleScriptResponse>;
    /** EditOracleScript defines a method for editing an existing oracle script. */
    EditOracleScript(request: MsgEditOracleScript): Promise<MsgEditOracleScriptResponse>;
    /** Activate defines a method for applying to be an oracle validator. */
    Activate(request: MsgActivate): Promise<MsgActivateResponse>;
    /** AddReporter defines a method for adding a new reporter for a validator. */
    AddReporter(request: MsgAddReporter): Promise<MsgAddReporterResponse>;
    /** RemoveReporter defines a method for TODO */
    RemoveReporter(request: MsgRemoveReporter): Promise<MsgRemoveReporterResponse>;
}

export class MsgClientImpl implements Msg {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
    }
    RequestData(request: MsgRequestData): Promise<MsgRequestDataResponse> {
        const data = MsgRequestData.encode(request).finish();
        const promise = this.rpc.request("oracle.v1.Msg", "RequestData", data);
        return promise.then((data) => MsgRequestDataResponse.decode(new _m0.Reader(data)));
    }

    ReportData(request: MsgReportData): Promise<MsgReportDataResponse> {
        const data = MsgReportData.encode(request).finish();
        const promise = this.rpc.request("oracle.v1.Msg", "ReportData", data);
        return promise.then((data) => MsgReportDataResponse.decode(new _m0.Reader(data)));
    }

    CreateDataSource(request: MsgCreateDataSource): Promise<MsgCreateDataSourceResponse> {
        const data = MsgCreateDataSource.encode(request).finish();
        const promise = this.rpc.request("oracle.v1.Msg", "CreateDataSource", data);
        return promise.then((data) => MsgCreateDataSourceResponse.decode(new _m0.Reader(data)));
    }

    EditDataSource(request: MsgEditDataSource): Promise<MsgEditDataSourceResponse> {
        const data = MsgEditDataSource.encode(request).finish();
        const promise = this.rpc.request("oracle.v1.Msg", "EditDataSource", data);
        return promise.then((data) => MsgEditDataSourceResponse.decode(new _m0.Reader(data)));
    }

    CreateOracleScript(request: MsgCreateOracleScript): Promise<MsgCreateOracleScriptResponse> {
        const data = MsgCreateOracleScript.encode(request).finish();
        const promise = this.rpc.request("oracle.v1.Msg", "CreateOracleScript", data);
        return promise.then((data) => MsgCreateOracleScriptResponse.decode(new _m0.Reader(data)));
    }

    EditOracleScript(request: MsgEditOracleScript): Promise<MsgEditOracleScriptResponse> {
        const data = MsgEditOracleScript.encode(request).finish();
        const promise = this.rpc.request("oracle.v1.Msg", "EditOracleScript", data);
        return promise.then((data) => MsgEditOracleScriptResponse.decode(new _m0.Reader(data)));
    }

    Activate(request: MsgActivate): Promise<MsgActivateResponse> {
        const data = MsgActivate.encode(request).finish();
        const promise = this.rpc.request("oracle.v1.Msg", "Activate", data);
        return promise.then((data) => MsgActivateResponse.decode(new _m0.Reader(data)));
    }

    AddReporter(request: MsgAddReporter): Promise<MsgAddReporterResponse> {
        const data = MsgAddReporter.encode(request).finish();
        const promise = this.rpc.request("oracle.v1.Msg", "AddReporter", data);
        return promise.then((data) => MsgAddReporterResponse.decode(new _m0.Reader(data)));
    }

    RemoveReporter(request: MsgRemoveReporter): Promise<MsgRemoveReporterResponse> {
        const data = MsgRemoveReporter.encode(request).finish();
        const promise = this.rpc.request("oracle.v1.Msg", "RemoveReporter", data);
        return promise.then((data) => MsgRemoveReporterResponse.decode(new _m0.Reader(data)));
    }
}

interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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

if (_m0.util.Long !== Long) {
    _m0.util.Long = Long as any;
    _m0.configure();
}
