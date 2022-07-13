import { IsNotEmpty, IsString } from "class-validator";
import { Column } from "src/columns/entities/column.entity";

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  columnId: Column['id'];
}

