import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreateCardDto } from "./dto/create-card.dto"
import { UpdateCardDto } from "./dto/update-card.dto"
import { Card } from "./entities/card.entity"

@Injectable()
export class CardsRepository {
  private cards: Card[] = [];

  async find(): Promise<Card[]> {
    return this.cards;
  };

  async findOne(id: string): Promise<Card> {
    const card = this.cards.find((card) => card.id === id);
    
    if(!card) {
      throw new Error(`Not found card with ID ${id}`);
    }

    return card;
  };

  async findByColumnId(id: string): Promise<Card[]> {
    const cards = this.cards.filter(card => card.columnId === id);

    if(!cards.length) {
      throw new Error(`Not found card with ID column ${id}`);
    }

    return cards;
  };

  async save(createCardDto: CreateCardDto): Promise<Card> {
    const card: Card = {
      id: randomUUID(),
      ...createCardDto,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.cards = [...this.cards, card];

    return card;
  };

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    try {
      const card = await this.findOne(id);
      const newCard: Card = {
        ...card,
        ...updateCardDto,
        updatedAt: new Date().toISOString(),
      };

      this.cards = this.cards.map(card => 
        card.id === id?
          newCard:
          card
      );
 
      return newCard;
    } catch (e) {
      throw e;
    };
  };

  async delete(id: string): Promise<Boolean> {
    const newCards = this.cards.filter(card => card.id !== id);

    if (newCards.length === this.cards.length) {
      throw new Error(`Not found card with ID ${id}`);
    }

    this.cards = newCards;
    return true;
  };
}

export const cardsRepository = new CardsRepository();
