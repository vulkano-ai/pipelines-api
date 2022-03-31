/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { VideoFilter } from "./video-filters/video-filters";
import { AudioFilter } from "./audio-filters/audio-filters";

export const protobufPackage = "pipeline";

export enum InputProtocol {
  INPUT_RTMP = "INPUT_RTMP",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function inputProtocolFromJSON(object: any): InputProtocol {
  switch (object) {
    case 0:
    case "INPUT_RTMP":
      return InputProtocol.INPUT_RTMP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InputProtocol.UNRECOGNIZED;
  }
}

export function inputProtocolToJSON(object: InputProtocol): string {
  switch (object) {
    case InputProtocol.INPUT_RTMP:
      return "INPUT_RTMP";
    default:
      return "UNKNOWN";
  }
}

export function inputProtocolToNumber(object: InputProtocol): number {
  switch (object) {
    case InputProtocol.INPUT_RTMP:
      return 0;
    default:
      return 0;
  }
}

export enum OutputProtocol {
  OUTPUT_RTMP = "OUTPUT_RTMP",
  OUTPUT_HLS = "OUTPUT_HLS",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function outputProtocolFromJSON(object: any): OutputProtocol {
  switch (object) {
    case 0:
    case "OUTPUT_RTMP":
      return OutputProtocol.OUTPUT_RTMP;
    case 1:
    case "OUTPUT_HLS":
      return OutputProtocol.OUTPUT_HLS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OutputProtocol.UNRECOGNIZED;
  }
}

export function outputProtocolToJSON(object: OutputProtocol): string {
  switch (object) {
    case OutputProtocol.OUTPUT_RTMP:
      return "OUTPUT_RTMP";
    case OutputProtocol.OUTPUT_HLS:
      return "OUTPUT_HLS";
    default:
      return "UNKNOWN";
  }
}

export function outputProtocolToNumber(object: OutputProtocol): number {
  switch (object) {
    case OutputProtocol.OUTPUT_RTMP:
      return 0;
    case OutputProtocol.OUTPUT_HLS:
      return 1;
    default:
      return 0;
  }
}

export enum InputProvider {
  INPUT_INTERNAL = "INPUT_INTERNAL",
  INPUT_EXTERNAL = "INPUT_EXTERNAL",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function inputProviderFromJSON(object: any): InputProvider {
  switch (object) {
    case 0:
    case "INPUT_INTERNAL":
      return InputProvider.INPUT_INTERNAL;
    case 1:
    case "INPUT_EXTERNAL":
      return InputProvider.INPUT_EXTERNAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InputProvider.UNRECOGNIZED;
  }
}

export function inputProviderToJSON(object: InputProvider): string {
  switch (object) {
    case InputProvider.INPUT_INTERNAL:
      return "INPUT_INTERNAL";
    case InputProvider.INPUT_EXTERNAL:
      return "INPUT_EXTERNAL";
    default:
      return "UNKNOWN";
  }
}

export function inputProviderToNumber(object: InputProvider): number {
  switch (object) {
    case InputProvider.INPUT_INTERNAL:
      return 0;
    case InputProvider.INPUT_EXTERNAL:
      return 1;
    default:
      return 0;
  }
}

export enum OutputProvider {
  OUTPUT_INTERNAL = "OUTPUT_INTERNAL",
  OUTPUT_EXTERNAL = "OUTPUT_EXTERNAL",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function outputProviderFromJSON(object: any): OutputProvider {
  switch (object) {
    case 0:
    case "OUTPUT_INTERNAL":
      return OutputProvider.OUTPUT_INTERNAL;
    case 1:
    case "OUTPUT_EXTERNAL":
      return OutputProvider.OUTPUT_EXTERNAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OutputProvider.UNRECOGNIZED;
  }
}

export function outputProviderToJSON(object: OutputProvider): string {
  switch (object) {
    case OutputProvider.OUTPUT_INTERNAL:
      return "OUTPUT_INTERNAL";
    case OutputProvider.OUTPUT_EXTERNAL:
      return "OUTPUT_EXTERNAL";
    default:
      return "UNKNOWN";
  }
}

export function outputProviderToNumber(object: OutputProvider): number {
  switch (object) {
    case OutputProvider.OUTPUT_INTERNAL:
      return 0;
    case OutputProvider.OUTPUT_EXTERNAL:
      return 1;
    default:
      return 0;
  }
}

export interface RtmpProviderConfig {
  uri: string;
}

export interface CreatePipelineRequest {
  inputProtocol: InputProtocol;
  inputProvider: InputProvider;
  outputProtocol: OutputProtocol;
  outputProvider: OutputProvider;
  inputRtmp?: RtmpProviderConfig | undefined;
  outputRtmp?: RtmpProviderConfig | undefined;
  videoFilters?: VideoFilter | undefined;
  audioFilters?: AudioFilter | undefined;
  userId: string;
}

export interface CreatePipelineResponse {
  id: string;
  streamKey?: string | undefined;
  ingestEndpoint?: string | undefined;
  outputEndpoint?: string | undefined;
  error: string[];
}

function createBaseRtmpProviderConfig(): RtmpProviderConfig {
  return { uri: "" };
}

export const RtmpProviderConfig = {
  encode(
    message: RtmpProviderConfig,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.uri !== "") {
      writer.uint32(10).string(message.uri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RtmpProviderConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRtmpProviderConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RtmpProviderConfig {
    return {
      uri: isSet(object.uri) ? String(object.uri) : "",
    };
  },

  toJSON(message: RtmpProviderConfig): unknown {
    const obj: any = {};
    message.uri !== undefined && (obj.uri = message.uri);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RtmpProviderConfig>, I>>(
    object: I
  ): RtmpProviderConfig {
    const message = createBaseRtmpProviderConfig();
    message.uri = object.uri ?? "";
    return message;
  },
};

function createBaseCreatePipelineRequest(): CreatePipelineRequest {
  return {
    inputProtocol: InputProtocol.INPUT_RTMP,
    inputProvider: InputProvider.INPUT_INTERNAL,
    outputProtocol: OutputProtocol.OUTPUT_RTMP,
    outputProvider: OutputProvider.OUTPUT_INTERNAL,
    inputRtmp: undefined,
    outputRtmp: undefined,
    videoFilters: undefined,
    audioFilters: undefined,
    userId: "",
  };
}

export const CreatePipelineRequest = {
  encode(
    message: CreatePipelineRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.inputProtocol !== InputProtocol.INPUT_RTMP) {
      writer.uint32(8).int32(inputProtocolToNumber(message.inputProtocol));
    }
    if (message.inputProvider !== InputProvider.INPUT_INTERNAL) {
      writer.uint32(16).int32(inputProviderToNumber(message.inputProvider));
    }
    if (message.outputProtocol !== OutputProtocol.OUTPUT_RTMP) {
      writer.uint32(24).int32(outputProtocolToNumber(message.outputProtocol));
    }
    if (message.outputProvider !== OutputProvider.OUTPUT_INTERNAL) {
      writer.uint32(32).int32(outputProviderToNumber(message.outputProvider));
    }
    if (message.inputRtmp !== undefined) {
      RtmpProviderConfig.encode(
        message.inputRtmp,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.outputRtmp !== undefined) {
      RtmpProviderConfig.encode(
        message.outputRtmp,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.videoFilters !== undefined) {
      VideoFilter.encode(
        message.videoFilters,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.audioFilters !== undefined) {
      AudioFilter.encode(
        message.audioFilters,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.userId !== "") {
      writer.uint32(74).string(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreatePipelineRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePipelineRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inputProtocol = inputProtocolFromJSON(reader.int32());
          break;
        case 2:
          message.inputProvider = inputProviderFromJSON(reader.int32());
          break;
        case 3:
          message.outputProtocol = outputProtocolFromJSON(reader.int32());
          break;
        case 4:
          message.outputProvider = outputProviderFromJSON(reader.int32());
          break;
        case 5:
          message.inputRtmp = RtmpProviderConfig.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.outputRtmp = RtmpProviderConfig.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.videoFilters = VideoFilter.decode(reader, reader.uint32());
          break;
        case 8:
          message.audioFilters = AudioFilter.decode(reader, reader.uint32());
          break;
        case 9:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreatePipelineRequest {
    return {
      inputProtocol: isSet(object.inputProtocol)
        ? inputProtocolFromJSON(object.inputProtocol)
        : InputProtocol.INPUT_RTMP,
      inputProvider: isSet(object.inputProvider)
        ? inputProviderFromJSON(object.inputProvider)
        : InputProvider.INPUT_INTERNAL,
      outputProtocol: isSet(object.outputProtocol)
        ? outputProtocolFromJSON(object.outputProtocol)
        : OutputProtocol.OUTPUT_RTMP,
      outputProvider: isSet(object.outputProvider)
        ? outputProviderFromJSON(object.outputProvider)
        : OutputProvider.OUTPUT_INTERNAL,
      inputRtmp: isSet(object.inputRtmp)
        ? RtmpProviderConfig.fromJSON(object.inputRtmp)
        : undefined,
      outputRtmp: isSet(object.outputRtmp)
        ? RtmpProviderConfig.fromJSON(object.outputRtmp)
        : undefined,
      videoFilters: isSet(object.videoFilters)
        ? VideoFilter.fromJSON(object.videoFilters)
        : undefined,
      audioFilters: isSet(object.audioFilters)
        ? AudioFilter.fromJSON(object.audioFilters)
        : undefined,
      userId: isSet(object.userId) ? String(object.userId) : "",
    };
  },

  toJSON(message: CreatePipelineRequest): unknown {
    const obj: any = {};
    message.inputProtocol !== undefined &&
      (obj.inputProtocol = inputProtocolToJSON(message.inputProtocol));
    message.inputProvider !== undefined &&
      (obj.inputProvider = inputProviderToJSON(message.inputProvider));
    message.outputProtocol !== undefined &&
      (obj.outputProtocol = outputProtocolToJSON(message.outputProtocol));
    message.outputProvider !== undefined &&
      (obj.outputProvider = outputProviderToJSON(message.outputProvider));
    message.inputRtmp !== undefined &&
      (obj.inputRtmp = message.inputRtmp
        ? RtmpProviderConfig.toJSON(message.inputRtmp)
        : undefined);
    message.outputRtmp !== undefined &&
      (obj.outputRtmp = message.outputRtmp
        ? RtmpProviderConfig.toJSON(message.outputRtmp)
        : undefined);
    message.videoFilters !== undefined &&
      (obj.videoFilters = message.videoFilters
        ? VideoFilter.toJSON(message.videoFilters)
        : undefined);
    message.audioFilters !== undefined &&
      (obj.audioFilters = message.audioFilters
        ? AudioFilter.toJSON(message.audioFilters)
        : undefined);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreatePipelineRequest>, I>>(
    object: I
  ): CreatePipelineRequest {
    const message = createBaseCreatePipelineRequest();
    message.inputProtocol = object.inputProtocol ?? InputProtocol.INPUT_RTMP;
    message.inputProvider =
      object.inputProvider ?? InputProvider.INPUT_INTERNAL;
    message.outputProtocol =
      object.outputProtocol ?? OutputProtocol.OUTPUT_RTMP;
    message.outputProvider =
      object.outputProvider ?? OutputProvider.OUTPUT_INTERNAL;
    message.inputRtmp =
      object.inputRtmp !== undefined && object.inputRtmp !== null
        ? RtmpProviderConfig.fromPartial(object.inputRtmp)
        : undefined;
    message.outputRtmp =
      object.outputRtmp !== undefined && object.outputRtmp !== null
        ? RtmpProviderConfig.fromPartial(object.outputRtmp)
        : undefined;
    message.videoFilters =
      object.videoFilters !== undefined && object.videoFilters !== null
        ? VideoFilter.fromPartial(object.videoFilters)
        : undefined;
    message.audioFilters =
      object.audioFilters !== undefined && object.audioFilters !== null
        ? AudioFilter.fromPartial(object.audioFilters)
        : undefined;
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseCreatePipelineResponse(): CreatePipelineResponse {
  return {
    id: "",
    streamKey: undefined,
    ingestEndpoint: undefined,
    outputEndpoint: undefined,
    error: [],
  };
}

export const CreatePipelineResponse = {
  encode(
    message: CreatePipelineResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.streamKey !== undefined) {
      writer.uint32(18).string(message.streamKey);
    }
    if (message.ingestEndpoint !== undefined) {
      writer.uint32(26).string(message.ingestEndpoint);
    }
    if (message.outputEndpoint !== undefined) {
      writer.uint32(34).string(message.outputEndpoint);
    }
    for (const v of message.error) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreatePipelineResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePipelineResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.streamKey = reader.string();
          break;
        case 3:
          message.ingestEndpoint = reader.string();
          break;
        case 4:
          message.outputEndpoint = reader.string();
          break;
        case 5:
          message.error.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreatePipelineResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      streamKey: isSet(object.streamKey) ? String(object.streamKey) : undefined,
      ingestEndpoint: isSet(object.ingestEndpoint)
        ? String(object.ingestEndpoint)
        : undefined,
      outputEndpoint: isSet(object.outputEndpoint)
        ? String(object.outputEndpoint)
        : undefined,
      error: Array.isArray(object?.error)
        ? object.error.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: CreatePipelineResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.streamKey !== undefined && (obj.streamKey = message.streamKey);
    message.ingestEndpoint !== undefined &&
      (obj.ingestEndpoint = message.ingestEndpoint);
    message.outputEndpoint !== undefined &&
      (obj.outputEndpoint = message.outputEndpoint);
    if (message.error) {
      obj.error = message.error.map((e) => e);
    } else {
      obj.error = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreatePipelineResponse>, I>>(
    object: I
  ): CreatePipelineResponse {
    const message = createBaseCreatePipelineResponse();
    message.id = object.id ?? "";
    message.streamKey = object.streamKey ?? undefined;
    message.ingestEndpoint = object.ingestEndpoint ?? undefined;
    message.outputEndpoint = object.outputEndpoint ?? undefined;
    message.error = object.error?.map((e) => e) || [];
    return message;
  },
};

export interface PipelineService {
  CreatePipeline(
    request: CreatePipelineRequest
  ): Promise<CreatePipelineResponse>;
}

export class PipelineServiceClientImpl implements PipelineService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreatePipeline = this.CreatePipeline.bind(this);
  }
  CreatePipeline(
    request: CreatePipelineRequest
  ): Promise<CreatePipelineResponse> {
    const data = CreatePipelineRequest.encode(request).finish();
    const promise = this.rpc.request(
      "pipeline.PipelineService",
      "CreatePipeline",
      data
    );
    return promise.then((data) =>
      CreatePipelineResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
