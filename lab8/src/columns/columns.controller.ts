import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';

@Crud({
    model: {
        type: Column
    },
    dto: {
        create: CreateColumnDto,
        update: UpdateColumnDto
    }
})

@ApiTags('columns')
@Controller('columns')
export class ColumnsController implements CrudController<Column> {
    constructor(public service: ColumnsService) {}
}
