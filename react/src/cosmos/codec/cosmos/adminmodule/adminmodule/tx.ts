/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { Any } from '../google/protobuf/any'

export const protobufPackage = 'cosmos.adminmodule.adminmodule'

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgDeleteAdmin {
  creator: string
  admin: string
}

export interface MsgDeleteAdminResponse {}

export interface MsgAddAdmin {
  creator: string
  admin: string
}

export interface MsgAddAdminResponse {}

/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export interface MsgSubmitProposal {
  content: Any | undefined
  proposer: string
}

/** MsgSubmitProposalResponse defines the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
  proposalId: number
}

const baseMsgDeleteAdmin: object = { creator: '', admin: '' }

export const MsgDeleteAdmin = {
  encode(message: MsgDeleteAdmin, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.admin !== '') {
      writer.uint32(18).string(message.admin)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteAdmin {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgDeleteAdmin } as MsgDeleteAdmin
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.admin = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgDeleteAdmin {
    const message = { ...baseMsgDeleteAdmin } as MsgDeleteAdmin
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin)
    } else {
      message.admin = ''
    }
    return message
  },

  toJSON(message: MsgDeleteAdmin): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.admin !== undefined && (obj.admin = message.admin)
    return obj
  },

  fromPartial(object: DeepPartial<MsgDeleteAdmin>): MsgDeleteAdmin {
    const message = { ...baseMsgDeleteAdmin } as MsgDeleteAdmin
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin
    } else {
      message.admin = ''
    }
    return message
  }
}

const baseMsgDeleteAdminResponse: object = {}

export const MsgDeleteAdminResponse = {
  encode(_: MsgDeleteAdminResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteAdminResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgDeleteAdminResponse } as MsgDeleteAdminResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgDeleteAdminResponse {
    const message = { ...baseMsgDeleteAdminResponse } as MsgDeleteAdminResponse
    return message
  },

  toJSON(_: MsgDeleteAdminResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgDeleteAdminResponse>): MsgDeleteAdminResponse {
    const message = { ...baseMsgDeleteAdminResponse } as MsgDeleteAdminResponse
    return message
  }
}

const baseMsgAddAdmin: object = { creator: '', admin: '' }

export const MsgAddAdmin = {
  encode(message: MsgAddAdmin, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.admin !== '') {
      writer.uint32(18).string(message.admin)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddAdmin {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddAdmin } as MsgAddAdmin
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.admin = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAddAdmin {
    const message = { ...baseMsgAddAdmin } as MsgAddAdmin
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin)
    } else {
      message.admin = ''
    }
    return message
  },

  toJSON(message: MsgAddAdmin): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.admin !== undefined && (obj.admin = message.admin)
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddAdmin>): MsgAddAdmin {
    const message = { ...baseMsgAddAdmin } as MsgAddAdmin
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin
    } else {
      message.admin = ''
    }
    return message
  }
}

const baseMsgAddAdminResponse: object = {}

export const MsgAddAdminResponse = {
  encode(_: MsgAddAdminResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddAdminResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddAdminResponse } as MsgAddAdminResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgAddAdminResponse {
    const message = { ...baseMsgAddAdminResponse } as MsgAddAdminResponse
    return message
  },

  toJSON(_: MsgAddAdminResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgAddAdminResponse>): MsgAddAdminResponse {
    const message = { ...baseMsgAddAdminResponse } as MsgAddAdminResponse
    return message
  }
}

const baseMsgSubmitProposal: object = { proposer: '' }

export const MsgSubmitProposal = {
  encode(message: MsgSubmitProposal, writer: Writer = Writer.create()): Writer {
    if (message.content !== undefined) {
      Any.encode(message.content, writer.uint32(10).fork()).ldelim()
    }
    if (message.proposer !== '') {
      writer.uint32(18).string(message.proposer)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSubmitProposal {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSubmitProposal } as MsgSubmitProposal
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.content = Any.decode(reader, reader.uint32())
          break
        case 2:
          message.proposer = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSubmitProposal {
    const message = { ...baseMsgSubmitProposal } as MsgSubmitProposal
    if (object.content !== undefined && object.content !== null) {
      message.content = Any.fromJSON(object.content)
    } else {
      message.content = undefined
    }
    if (object.proposer !== undefined && object.proposer !== null) {
      message.proposer = String(object.proposer)
    } else {
      message.proposer = ''
    }
    return message
  },

  toJSON(message: MsgSubmitProposal): unknown {
    const obj: any = {}
    message.content !== undefined && (obj.content = message.content ? Any.toJSON(message.content) : undefined)
    message.proposer !== undefined && (obj.proposer = message.proposer)
    return obj
  },

  fromPartial(object: DeepPartial<MsgSubmitProposal>): MsgSubmitProposal {
    const message = { ...baseMsgSubmitProposal } as MsgSubmitProposal
    if (object.content !== undefined && object.content !== null) {
      message.content = Any.fromPartial(object.content)
    } else {
      message.content = undefined
    }
    if (object.proposer !== undefined && object.proposer !== null) {
      message.proposer = object.proposer
    } else {
      message.proposer = ''
    }
    return message
  }
}

const baseMsgSubmitProposalResponse: object = { proposalId: 0 }

export const MsgSubmitProposalResponse = {
  encode(message: MsgSubmitProposalResponse, writer: Writer = Writer.create()): Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSubmitProposalResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSubmitProposalResponse } as MsgSubmitProposalResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.proposalId = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSubmitProposalResponse {
    const message = { ...baseMsgSubmitProposalResponse } as MsgSubmitProposalResponse
    if (object.proposalId !== undefined && object.proposalId !== null) {
      message.proposalId = Number(object.proposalId)
    } else {
      message.proposalId = 0
    }
    return message
  },

  toJSON(message: MsgSubmitProposalResponse): unknown {
    const obj: any = {}
    message.proposalId !== undefined && (obj.proposalId = message.proposalId)
    return obj
  },

  fromPartial(object: DeepPartial<MsgSubmitProposalResponse>): MsgSubmitProposalResponse {
    const message = { ...baseMsgSubmitProposalResponse } as MsgSubmitProposalResponse
    if (object.proposalId !== undefined && object.proposalId !== null) {
      message.proposalId = object.proposalId
    } else {
      message.proposalId = 0
    }
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  DeleteAdmin(request: MsgDeleteAdmin): Promise<MsgDeleteAdminResponse>
  AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse>
  /** this line is used by starport scaffolding # proto/tx/rpc */
  SubmitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  DeleteAdmin(request: MsgDeleteAdmin): Promise<MsgDeleteAdminResponse> {
    const data = MsgDeleteAdmin.encode(request).finish()
    const promise = this.rpc.request('cosmos.adminmodule.adminmodule.Msg', 'DeleteAdmin', data)
    return promise.then((data) => MsgDeleteAdminResponse.decode(new Reader(data)))
  }

  AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse> {
    const data = MsgAddAdmin.encode(request).finish()
    const promise = this.rpc.request('cosmos.adminmodule.adminmodule.Msg', 'AddAdmin', data)
    return promise.then((data) => MsgAddAdminResponse.decode(new Reader(data)))
  }

  SubmitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse> {
    const data = MsgSubmitProposal.encode(request).finish()
    const promise = this.rpc.request('cosmos.adminmodule.adminmodule.Msg', 'SubmitProposal', data)
    return promise.then((data) => MsgSubmitProposalResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

// if (util.Long !== Long) {
  util.Long = Long as any
  configure()
// }
