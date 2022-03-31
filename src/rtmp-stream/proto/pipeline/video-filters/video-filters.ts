/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "pipeline";

export enum VideoFilterName {
  SUPER_RESOLUTION = "SUPER_RESOLUTION",
  VIDEO_DENOISE = "VIDEO_DENOISE",
  ARTIFACT_REDUCTION = "ARTIFACT_REDUCTION",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function videoFilterNameFromJSON(object: any): VideoFilterName {
  switch (object) {
    case 0:
    case "SUPER_RESOLUTION":
      return VideoFilterName.SUPER_RESOLUTION;
    case 1:
    case "VIDEO_DENOISE":
      return VideoFilterName.VIDEO_DENOISE;
    case 2:
    case "ARTIFACT_REDUCTION":
      return VideoFilterName.ARTIFACT_REDUCTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VideoFilterName.UNRECOGNIZED;
  }
}

export function videoFilterNameToJSON(object: VideoFilterName): string {
  switch (object) {
    case VideoFilterName.SUPER_RESOLUTION:
      return "SUPER_RESOLUTION";
    case VideoFilterName.VIDEO_DENOISE:
      return "VIDEO_DENOISE";
    case VideoFilterName.ARTIFACT_REDUCTION:
      return "ARTIFACT_REDUCTION";
    default:
      return "UNKNOWN";
  }
}

export function videoFilterNameToNumber(object: VideoFilterName): number {
  switch (object) {
    case VideoFilterName.SUPER_RESOLUTION:
      return 0;
    case VideoFilterName.VIDEO_DENOISE:
      return 1;
    case VideoFilterName.ARTIFACT_REDUCTION:
      return 2;
    default:
      return 0;
  }
}

export interface VideoSuperResolutionFilterConfig {
  factor: string;
  strength: number;
}

export interface VideoDenoiseFilterConfig {
  strength: number;
}

export interface VideoArtifactReductionFilterConfig {
  strength: number;
}

export interface VideoSuperResolutionFilter {
  name: VideoFilterName;
  config: VideoSuperResolutionFilterConfig | undefined;
}

export interface VideoDenoiseFilter {
  name: VideoFilterName;
  config: VideoDenoiseFilterConfig | undefined;
}

export interface VideoArtifactReductionFilter {
  name: VideoFilterName;
  config: VideoArtifactReductionFilterConfig | undefined;
}

export interface VideoFilter {
  superResolution?: VideoSuperResolutionFilter | undefined;
  denoise?: VideoDenoiseFilter | undefined;
  artifactReduction?: VideoArtifactReductionFilter | undefined;
}

function createBaseVideoSuperResolutionFilterConfig(): VideoSuperResolutionFilterConfig {
  return { factor: "", strength: 0 };
}

export const VideoSuperResolutionFilterConfig = {
  encode(
    message: VideoSuperResolutionFilterConfig,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.factor !== "") {
      writer.uint32(10).string(message.factor);
    }
    if (message.strength !== 0) {
      writer.uint32(21).float(message.strength);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): VideoSuperResolutionFilterConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoSuperResolutionFilterConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.factor = reader.string();
          break;
        case 2:
          message.strength = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VideoSuperResolutionFilterConfig {
    return {
      factor: isSet(object.factor) ? String(object.factor) : "",
      strength: isSet(object.strength) ? Number(object.strength) : 0,
    };
  },

  toJSON(message: VideoSuperResolutionFilterConfig): unknown {
    const obj: any = {};
    message.factor !== undefined && (obj.factor = message.factor);
    message.strength !== undefined && (obj.strength = message.strength);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<VideoSuperResolutionFilterConfig>, I>
  >(object: I): VideoSuperResolutionFilterConfig {
    const message = createBaseVideoSuperResolutionFilterConfig();
    message.factor = object.factor ?? "";
    message.strength = object.strength ?? 0;
    return message;
  },
};

function createBaseVideoDenoiseFilterConfig(): VideoDenoiseFilterConfig {
  return { strength: 0 };
}

export const VideoDenoiseFilterConfig = {
  encode(
    message: VideoDenoiseFilterConfig,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.strength !== 0) {
      writer.uint32(13).float(message.strength);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): VideoDenoiseFilterConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoDenoiseFilterConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.strength = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VideoDenoiseFilterConfig {
    return {
      strength: isSet(object.strength) ? Number(object.strength) : 0,
    };
  },

  toJSON(message: VideoDenoiseFilterConfig): unknown {
    const obj: any = {};
    message.strength !== undefined && (obj.strength = message.strength);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VideoDenoiseFilterConfig>, I>>(
    object: I
  ): VideoDenoiseFilterConfig {
    const message = createBaseVideoDenoiseFilterConfig();
    message.strength = object.strength ?? 0;
    return message;
  },
};

function createBaseVideoArtifactReductionFilterConfig(): VideoArtifactReductionFilterConfig {
  return { strength: 0 };
}

export const VideoArtifactReductionFilterConfig = {
  encode(
    message: VideoArtifactReductionFilterConfig,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.strength !== 0) {
      writer.uint32(13).float(message.strength);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): VideoArtifactReductionFilterConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoArtifactReductionFilterConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.strength = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VideoArtifactReductionFilterConfig {
    return {
      strength: isSet(object.strength) ? Number(object.strength) : 0,
    };
  },

  toJSON(message: VideoArtifactReductionFilterConfig): unknown {
    const obj: any = {};
    message.strength !== undefined && (obj.strength = message.strength);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<VideoArtifactReductionFilterConfig>, I>
  >(object: I): VideoArtifactReductionFilterConfig {
    const message = createBaseVideoArtifactReductionFilterConfig();
    message.strength = object.strength ?? 0;
    return message;
  },
};

function createBaseVideoSuperResolutionFilter(): VideoSuperResolutionFilter {
  return { name: VideoFilterName.SUPER_RESOLUTION, config: undefined };
}

export const VideoSuperResolutionFilter = {
  encode(
    message: VideoSuperResolutionFilter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== VideoFilterName.SUPER_RESOLUTION) {
      writer.uint32(8).int32(videoFilterNameToNumber(message.name));
    }
    if (message.config !== undefined) {
      VideoSuperResolutionFilterConfig.encode(
        message.config,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): VideoSuperResolutionFilter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoSuperResolutionFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = videoFilterNameFromJSON(reader.int32());
          break;
        case 2:
          message.config = VideoSuperResolutionFilterConfig.decode(
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

  fromJSON(object: any): VideoSuperResolutionFilter {
    return {
      name: isSet(object.name)
        ? videoFilterNameFromJSON(object.name)
        : VideoFilterName.SUPER_RESOLUTION,
      config: isSet(object.config)
        ? VideoSuperResolutionFilterConfig.fromJSON(object.config)
        : undefined,
    };
  },

  toJSON(message: VideoSuperResolutionFilter): unknown {
    const obj: any = {};
    message.name !== undefined &&
      (obj.name = videoFilterNameToJSON(message.name));
    message.config !== undefined &&
      (obj.config = message.config
        ? VideoSuperResolutionFilterConfig.toJSON(message.config)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VideoSuperResolutionFilter>, I>>(
    object: I
  ): VideoSuperResolutionFilter {
    const message = createBaseVideoSuperResolutionFilter();
    message.name = object.name ?? VideoFilterName.SUPER_RESOLUTION;
    message.config =
      object.config !== undefined && object.config !== null
        ? VideoSuperResolutionFilterConfig.fromPartial(object.config)
        : undefined;
    return message;
  },
};

function createBaseVideoDenoiseFilter(): VideoDenoiseFilter {
  return { name: VideoFilterName.SUPER_RESOLUTION, config: undefined };
}

export const VideoDenoiseFilter = {
  encode(
    message: VideoDenoiseFilter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== VideoFilterName.SUPER_RESOLUTION) {
      writer.uint32(8).int32(videoFilterNameToNumber(message.name));
    }
    if (message.config !== undefined) {
      VideoDenoiseFilterConfig.encode(
        message.config,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VideoDenoiseFilter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoDenoiseFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = videoFilterNameFromJSON(reader.int32());
          break;
        case 2:
          message.config = VideoDenoiseFilterConfig.decode(
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

  fromJSON(object: any): VideoDenoiseFilter {
    return {
      name: isSet(object.name)
        ? videoFilterNameFromJSON(object.name)
        : VideoFilterName.SUPER_RESOLUTION,
      config: isSet(object.config)
        ? VideoDenoiseFilterConfig.fromJSON(object.config)
        : undefined,
    };
  },

  toJSON(message: VideoDenoiseFilter): unknown {
    const obj: any = {};
    message.name !== undefined &&
      (obj.name = videoFilterNameToJSON(message.name));
    message.config !== undefined &&
      (obj.config = message.config
        ? VideoDenoiseFilterConfig.toJSON(message.config)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VideoDenoiseFilter>, I>>(
    object: I
  ): VideoDenoiseFilter {
    const message = createBaseVideoDenoiseFilter();
    message.name = object.name ?? VideoFilterName.SUPER_RESOLUTION;
    message.config =
      object.config !== undefined && object.config !== null
        ? VideoDenoiseFilterConfig.fromPartial(object.config)
        : undefined;
    return message;
  },
};

function createBaseVideoArtifactReductionFilter(): VideoArtifactReductionFilter {
  return { name: VideoFilterName.SUPER_RESOLUTION, config: undefined };
}

export const VideoArtifactReductionFilter = {
  encode(
    message: VideoArtifactReductionFilter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== VideoFilterName.SUPER_RESOLUTION) {
      writer.uint32(8).int32(videoFilterNameToNumber(message.name));
    }
    if (message.config !== undefined) {
      VideoArtifactReductionFilterConfig.encode(
        message.config,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): VideoArtifactReductionFilter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoArtifactReductionFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = videoFilterNameFromJSON(reader.int32());
          break;
        case 2:
          message.config = VideoArtifactReductionFilterConfig.decode(
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

  fromJSON(object: any): VideoArtifactReductionFilter {
    return {
      name: isSet(object.name)
        ? videoFilterNameFromJSON(object.name)
        : VideoFilterName.SUPER_RESOLUTION,
      config: isSet(object.config)
        ? VideoArtifactReductionFilterConfig.fromJSON(object.config)
        : undefined,
    };
  },

  toJSON(message: VideoArtifactReductionFilter): unknown {
    const obj: any = {};
    message.name !== undefined &&
      (obj.name = videoFilterNameToJSON(message.name));
    message.config !== undefined &&
      (obj.config = message.config
        ? VideoArtifactReductionFilterConfig.toJSON(message.config)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VideoArtifactReductionFilter>, I>>(
    object: I
  ): VideoArtifactReductionFilter {
    const message = createBaseVideoArtifactReductionFilter();
    message.name = object.name ?? VideoFilterName.SUPER_RESOLUTION;
    message.config =
      object.config !== undefined && object.config !== null
        ? VideoArtifactReductionFilterConfig.fromPartial(object.config)
        : undefined;
    return message;
  },
};

function createBaseVideoFilter(): VideoFilter {
  return {
    superResolution: undefined,
    denoise: undefined,
    artifactReduction: undefined,
  };
}

export const VideoFilter = {
  encode(
    message: VideoFilter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.superResolution !== undefined) {
      VideoSuperResolutionFilter.encode(
        message.superResolution,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.denoise !== undefined) {
      VideoDenoiseFilter.encode(
        message.denoise,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.artifactReduction !== undefined) {
      VideoArtifactReductionFilter.encode(
        message.artifactReduction,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VideoFilter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.superResolution = VideoSuperResolutionFilter.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.denoise = VideoDenoiseFilter.decode(reader, reader.uint32());
          break;
        case 3:
          message.artifactReduction = VideoArtifactReductionFilter.decode(
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

  fromJSON(object: any): VideoFilter {
    return {
      superResolution: isSet(object.superResolution)
        ? VideoSuperResolutionFilter.fromJSON(object.superResolution)
        : undefined,
      denoise: isSet(object.denoise)
        ? VideoDenoiseFilter.fromJSON(object.denoise)
        : undefined,
      artifactReduction: isSet(object.artifactReduction)
        ? VideoArtifactReductionFilter.fromJSON(object.artifactReduction)
        : undefined,
    };
  },

  toJSON(message: VideoFilter): unknown {
    const obj: any = {};
    message.superResolution !== undefined &&
      (obj.superResolution = message.superResolution
        ? VideoSuperResolutionFilter.toJSON(message.superResolution)
        : undefined);
    message.denoise !== undefined &&
      (obj.denoise = message.denoise
        ? VideoDenoiseFilter.toJSON(message.denoise)
        : undefined);
    message.artifactReduction !== undefined &&
      (obj.artifactReduction = message.artifactReduction
        ? VideoArtifactReductionFilter.toJSON(message.artifactReduction)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VideoFilter>, I>>(
    object: I
  ): VideoFilter {
    const message = createBaseVideoFilter();
    message.superResolution =
      object.superResolution !== undefined && object.superResolution !== null
        ? VideoSuperResolutionFilter.fromPartial(object.superResolution)
        : undefined;
    message.denoise =
      object.denoise !== undefined && object.denoise !== null
        ? VideoDenoiseFilter.fromPartial(object.denoise)
        : undefined;
    message.artifactReduction =
      object.artifactReduction !== undefined &&
      object.artifactReduction !== null
        ? VideoArtifactReductionFilter.fromPartial(object.artifactReduction)
        : undefined;
    return message;
  },
};

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
