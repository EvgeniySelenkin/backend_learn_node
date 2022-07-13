import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsRepository } from './columns.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnsRepository])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
