import { PartialType } from '@nestjs/swagger';
import { CreateHlDto } from './create-hl.dto';

export class UpdateHlDto extends PartialType(CreateHlDto) {}
