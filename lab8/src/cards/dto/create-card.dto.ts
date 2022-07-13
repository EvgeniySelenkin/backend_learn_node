import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsUUID()
  @ApiProperty()
  columnId: string;
}
