import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @ApiProperty()
  name: string;
}
