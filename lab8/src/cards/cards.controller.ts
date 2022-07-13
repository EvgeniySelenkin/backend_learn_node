import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Crud({
    model:{
        type: Card
    },
    dto:{
        create: CreateCardDto,
        update: UpdateCardDto
    }
})

@ApiTags('cards')
@Controller('cards')
export class CardsController implements CrudController<Card> {
    constructor(public service: CardsService) {}
}
