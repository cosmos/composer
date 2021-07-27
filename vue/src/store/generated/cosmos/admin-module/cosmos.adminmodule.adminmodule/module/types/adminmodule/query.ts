/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'

export const protobufPackage = 'cosmos.adminmodule.adminmodule'

/** this line is used by starport scaffolding # 3 */
export interface QueryAdminsRequest {}

export interface QueryAdminsResponse {
  admins: string[]
}

const baseQueryAdminsRequest: object = {}

export const QueryAdminsRequest = {
  encode(_: QueryAdminsRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAdminsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAdminsRequest } as QueryAdminsRequest
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

  fromJSON(_: any): QueryAdminsRequest {
    const message = { ...baseQueryAdminsRequest } as QueryAdminsRequest
    return message
  },

  toJSON(_: QueryAdminsRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryAdminsRequest>): QueryAdminsRequest {
    const message = { ...baseQueryAdminsRequest } as QueryAdminsRequest
    return message
  }
}

const baseQueryAdminsResponse: object = { admins: '' }

export const QueryAdminsResponse = {
  encode(message: QueryAdminsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.admins) {
      writer.uint32(10).string(v!)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAdminsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAdminsResponse } as QueryAdminsResponse
    message.admins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.admins.push(reader.string())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAdminsResponse {
    const message = { ...baseQueryAdminsResponse } as QueryAdminsResponse
    message.admins = []
    if (object.admins !== undefined && object.admins !== null) {
      for (const e of object.admins) {
        message.admins.push(String(e))
      }
    }
    return message
  },

  toJSON(message: QueryAdminsResponse): unknown {
    const obj: any = {}
    if (message.admins) {
      obj.admins = message.admins.map((e) => e)
    } else {
      obj.admins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryAdminsResponse>): QueryAdminsResponse {
    const message = { ...baseQueryAdminsResponse } as QueryAdminsResponse
    message.admins = []
    if (object.admins !== undefined && object.admins !== null) {
      for (const e of object.admins) {
        message.admins.push(e)
      }
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of admins items. */
  Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse> {
    const data = QueryAdminsRequest.encode(request).finish()
    const promise = this.rpc.request('cosmos.adminmodule.adminmodule.Query', 'Admins', data)
    return promise.then((data) => QueryAdminsResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

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
