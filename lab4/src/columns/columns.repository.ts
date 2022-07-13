import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";
import { Column } from "./entities/column.entity";

@Injectable()
export class ColumnsRepository {
  private columns: Column[] = [];

  async find(): Promise<Column[]> {   
    return this.columns
  }

  async findOne(id: string): Promise<Column> {
    const column = this.columns.find((column) => column.id === id);
    
    if(!column) {
      throw new Error(`Not found column with ID ${id}`);
    }
    
    return column;
  }

  async save(createColumnDto: CreateColumnDto): Promise<Column> {
    const column: Column = {
      id: randomUUID(),
      ...createColumnDto,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.columns = [...this.columns, column];
    return column;
  }

  async update(id: string, updateColumnDto: UpdateColumnDto): Promise<Column> {
    try {
      const column = await this.findOne(id);
      const newColumn: Column = {
        ...column,
        ...updateColumnDto,
        updatedAt: new Date().toISOString(),
      };

      this.columns = this.columns.map(column => 
        column.id === id?
          newColumn:
          column
      );

      return newColumn;
    } catch (e) {
      throw e;
    };
  }

  async delete(id: string): Promise<Boolean> {
    const newColumns = this.columns.filter(column => column.id !== id);
    if (newColumns.length === this.columns.length) {
      throw new Error(`Not found column with ID ${id}`);
    }
    this.columns = newColumns;
    return true;
  }
}

export const columnsRepository = new ColumnsRepository();
