import { EntityRepository, Repository } from "typeorm";
import { Card } from "./entities/card.entity"

@EntityRepository(Card)
export class CardsRepository extends Repository<Card> {}
