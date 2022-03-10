import { Module } from '@nestjs/common';

@Module({})
export class RtmpModule {}

const ClientRequestPayload = {
  inProtocol: 'RTMP',
  outProtocols: 'RTMP',
  filters: [
    {
      name: 'SR',
      config: {
        factor: ['4/3', '3/2', '2', '3', '4'],
        strength: [0, 1],
      },
    },
  ],
};

const ClientRequestResponse = {
  streamId: '',
  input: {
    rtmp: {
      ingestEndpoint: 'rtmps://public-endpoint/app',
      streamKey: 'string uuid',
    },
  },
  output: {
    rtmp: {
      playbackUri: 'string',
    },
  },
};

const newStreamPayload = {
  streamId: 'string',
  input: {
    type: 'RTMP',
    uri: 'rtmp://some-internal-ip/stream_id/',
  },
  output: {
    type: 'RTMP',
    uri: 'rtmp://some-external-ip/stream_id/',
  },
  filters: [
    {
      name: 'SR',
      config: {
        factor: ['4/3', '3/2', '2', '3', '4'],
        strength: [0, 1],
      },
    },
  ],
};
