/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "pipeline";

export enum AudioFilterName {
  AUDIO_DENOISE = "AUDIO_DENOISE",
  ROOM_ECO = "ROOM_ECO",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function audioFilterNameFromJSON(object: any): AudioFilterName {
  switch (object) {
    case 0:
    case "AUDIO_DENOISE":
      return AudioFilterName.AUDIO_DENOISE;
    case 1:
    case "ROOM_ECO":
      return AudioFilterName.ROOM_ECO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AudioFilterName.UNRECOGNIZED;
  }
}

export function audioFilterNameToJSON(object: AudioFilterName): string {
  switch (object) {
    case AudioFilterName.AUDIO_DENOISE:
      return "AUDIO_DENOISE";
    case AudioFilterName.ROOM_ECO:
      return "ROOM_ECO";
    default:
      return "UNKNOWN";
  }
}

export function audioFilterNameToNumber(object: AudioFilterName): number {
  switch (object) {
    case AudioFilterName.AUDIO_DENOISE:
      return 0;
    case AudioFilterName.ROOM_ECO:
      return 1;
    default:
      return 0;
  }
}

export interface AudioDenoiseFilterConfig {
  strength: number;
}

export interface AudioDenoiseFilter {
  name: AudioFilterName;
  config: AudioDenoiseFilterConfig | undefined;
}

export interface AudioFilter {
  denoise?: AudioDenoiseFilter | undefined;
}

function createBaseAudioDenoiseFilterConfig(): AudioDenoiseFilterConfig {
  return { strength: 0 };
}

export const AudioDenoiseFilterConfig = {
  encode(
    message: AudioDenoiseFilterConfig,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.strength !== 0) {
      writer.uint32(21).float(message.strength);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AudioDenoiseFilterConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAudioDenoiseFilterConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): AudioDenoiseFilterConfig {
    return {
      strength: isSet(object.strength) ? Number(object.strength) : 0,
    };
  },

  toJSON(message: AudioDenoiseFilterConfig): unknown {
    const obj: any = {};
    message.strength !== undefined && (obj.strength = message.strength);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AudioDenoiseFilterConfig>, I>>(
    object: I
  ): AudioDenoiseFilterConfig {
    const message = createBaseAudioDenoiseFilterConfig();
    message.strength = object.strength ?? 0;
    return message;
  },
};

function createBaseAudioDenoiseFilter(): AudioDenoiseFilter {
  return { name: AudioFilterName.AUDIO_DENOISE, config: undefined };
}

export const AudioDenoiseFilter = {
  encode(
    message: AudioDenoiseFilter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== AudioFilterName.AUDIO_DENOISE) {
      writer.uint32(8).int32(audioFilterNameToNumber(message.name));
    }
    if (message.config !== undefined) {
      AudioDenoiseFilterConfig.encode(
        message.config,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AudioDenoiseFilter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAudioDenoiseFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = audioFilterNameFromJSON(reader.int32());
          break;
        case 2:
          message.config = AudioDenoiseFilterConfig.decode(
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

  fromJSON(object: any): AudioDenoiseFilter {
    return {
      name: isSet(object.name)
        ? audioFilterNameFromJSON(object.name)
        : AudioFilterName.AUDIO_DENOISE,
      config: isSet(object.config)
        ? AudioDenoiseFilterConfig.fromJSON(object.config)
        : undefined,
    };
  },

  toJSON(message: AudioDenoiseFilter): unknown {
    const obj: any = {};
    message.name !== undefined &&
      (obj.name = audioFilterNameToJSON(message.name));
    message.config !== undefined &&
      (obj.config = message.config
        ? AudioDenoiseFilterConfig.toJSON(message.config)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AudioDenoiseFilter>, I>>(
    object: I
  ): AudioDenoiseFilter {
    const message = createBaseAudioDenoiseFilter();
    message.name = object.name ?? AudioFilterName.AUDIO_DENOISE;
    message.config =
      object.config !== undefined && object.config !== null
        ? AudioDenoiseFilterConfig.fromPartial(object.config)
        : undefined;
    return message;
  },
};

function createBaseAudioFilter(): AudioFilter {
  return { denoise: undefined };
}

export const AudioFilter = {
  encode(
    message: AudioFilter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denoise !== undefined) {
      AudioDenoiseFilter.encode(
        message.denoise,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AudioFilter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAudioFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denoise = AudioDenoiseFilter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AudioFilter {
    return {
      denoise: isSet(object.denoise)
        ? AudioDenoiseFilter.fromJSON(object.denoise)
        : undefined,
    };
  },

  toJSON(message: AudioFilter): unknown {
    const obj: any = {};
    message.denoise !== undefined &&
      (obj.denoise = message.denoise
        ? AudioDenoiseFilter.toJSON(message.denoise)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AudioFilter>, I>>(
    object: I
  ): AudioFilter {
    const message = createBaseAudioFilter();
    message.denoise =
      object.denoise !== undefined && object.denoise !== null
        ? AudioDenoiseFilter.fromPartial(object.denoise)
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
