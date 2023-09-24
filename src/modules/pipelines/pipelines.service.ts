import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PipelineDocument,
  PipelineView,
  PipelineModel,
} from './models/pipeline';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { MongoQueryFilter } from '../../common';
import { PipelineNotFoundException } from './errors';
import { RtmpStreamDocument } from '../rtmp-stream/models/rtmp-stream';

export type Pipeline = {
  ingestEndpoint: string;
  outputEndpoint: string;
} & PipelineView;

@Injectable()
export class PipelinesService {
  private readonly rtmpServerUri: string;
  private readonly hlsBaseUrl: string;
  constructor(
    @InjectModel('Pipeline')
    private model: Model<PipelineDocument>,
    @InjectPinoLogger('Pipelines service')
    private readonly logger: PinoLogger,

    private configService: ConfigService,
  ) {
    this.rtmpServerUri = this.configService.get('rtmpServerUri');
    this.hlsBaseUrl = this.configService.get('hlsBaseUrl');
  }

  /**
   * The function `getPipelineView` returns a modified version of a `PipelineDocument` object with
   * additional properties for the ingest and output endpoints.
   * @param {PipelineDocument} pipeline - The `pipeline` parameter is of type `PipelineDocument`, which
   * represents a pipeline object.
   * @returns a modified version of the input `pipeline` object. The returned object includes the
   * properties of the `pipeline` object, as well as two additional properties: `ingestEndpoint` and
   * `outputEndpoint`.
   */
  getPipelineView(pipeline: PipelineDocument): Pipeline {
    return {
      ...pipeline.view(),
      ingestEndpoint: `${this.rtmpServerUri}/app`,
      outputEndpoint: `${this.hlsBaseUrl}/${pipeline._id}/master.m3u8`,
    };
  }

  /**
   * The function creates a new pipeline document with a unique stream key and saves it to the
   * database.
   * @param {PipelineModel} createPipelineDto - The createPipelineDto parameter is an object that
   * contains the data needed to create a new pipeline. It likely includes properties such as name,
   * description, and any other relevant information for the pipeline.
   * @returns a Promise that resolves to a PipelineDocument.
   */
  async create(createPipelineDto: PipelineModel): Promise<PipelineDocument> {
    const pipeline = new this.model({
      ...createPipelineDto,
      streamKey: uuidv4(),
    });
    await pipeline.save();
    this.logger.debug({ pipeline }, 'Pipeline created');

    return pipeline;
  }

  /**
   * The function finds documents in a MongoDB collection based on a filter, with options for limiting,
   * skipping, sorting, and selecting fields, and returns the count and rows of the matching documents.
   * @param {MongoQueryFilter}  - - `filter`: A filter object that specifies the conditions that the
   * documents must meet in order to be included in the result set.
   * @returns an object with two properties: "count" and "rows". The "count" property contains the
   * total count of documents that match the given filter, and the "rows" property contains an array of
   * documents that match the filter, limited by the specified limit and skip values, and sorted
   * according to the specified sort criteria.
   */
  async find({ filter, limit, skip, sort, select }: MongoQueryFilter) {
    const count = await this.model.count(filter);
    const rows = await this.model.find(filter, select, {
      limit,
      skip,
      sort,
    });
    return { count, rows };
  }

  /**
   * The function finds a pipeline document by its ID and returns it, or throws an exception if the
   * document is not found.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * pipeline document that you want to find.
   * @returns a Promise that resolves to a PipelineDocument object.
   */
  async findOne(id: string): Promise<PipelineDocument> {
    const pipeline = await this.model
      .findById(id)
      .catch((err) => this.logger.debug(err)); // cast error
    if (!pipeline) {
      throw new PipelineNotFoundException();
    }
    return pipeline;
  }

  /**
   * The function `findByStreamKey` finds a pipeline document in a model based on a given stream key
   * and returns it, or throws an exception if the pipeline is not found.
   * @param {string} streamKey - The `streamKey` parameter is a string that represents a unique
   * identifier for a stream. It is used to search for a pipeline document in the database.
   * @returns a Promise that resolves to a PipelineDocument object.
   */
  async findByStreamKey(streamKey: string): Promise<PipelineDocument> {
    const pipeline = await this.model.findOne({ streamKey });
    if (!pipeline) {
      throw new PipelineNotFoundException();
    }
    return pipeline;
  }

  /**
   * The function updates a pipeline document in a database and returns the updated document.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * pipeline document that needs to be updated.
   * @param {PipelineModel} updatePipelineDto - The parameter `updatePipelineDto` is of type
   * `PipelineDto`. It is an object that contains the updated data for a pipeline.
   * @returns a Promise that resolves to a PipelineDocument.
   */
  async update(
    id: string,
    updatePipelineDto: PipelineModel,
  ): Promise<PipelineDocument> {
    await this.findOne(id);
    const pipeline = await this.model.findByIdAndUpdate(id, updatePipelineDto, {
      upsert: false,
      new: true,
    });

    this.logger.debug({ pipeline }, 'Pipeline updated');
    return pipeline;
  }

  /**
   * The function removes a document from a MongoDB collection by its ID and returns the removed
   * document.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * document you want to remove from the database.
   * @returns The `remove` function is returning the `pipeline` object.
   */
  async remove(id: string) {
    const pipeline = await this.findOne(id);
    await this.model.findByIdAndRemove(id);
    return pipeline;
  }

  // TODO: switch by output protocol
  /**
   * The function `buildPipelineOutputs` sets the correct output for a given pipeline and stream.
   * @param {PipelineDocument} pipeline - The `pipeline` parameter is of type `PipelineDocument`, which
   * is likely a document or object representing a pipeline in a video streaming system. It may contain
   * properties such as the pipeline's ID, name, configuration settings, and other relevant
   * information.
   * @param {RtmpStreamDocument} stream - The `stream` parameter is a document that represents an RTMP
   * stream. It likely contains information such as the stream ID, stream name, stream URL, and other
   * relevant details.
   */
  buildPipelineOutputs(pipeline: PipelineDocument, stream: RtmpStreamDocument) {
    pipeline.setHlsOutput(
      this.configService.get('hlsBaseUrl'),
      stream._id.toString(),
    );
  }
}
