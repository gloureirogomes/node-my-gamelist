import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Game } from "src/domain/game";
import { CreateGameDto } from "src/dto/createGame";

@Injectable()
export class GameRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createGame(gameData: CreateGameDto): Promise<string> {
    try {
      await this.prisma.gamelist.create({
        data: gameData,
      });
      return gameData.name;
    } catch (error) {
      console.error("Erro ao inserir novo registro:", error);
      throw new Error("Erro ao inserir novo registro");
    }
  }

  async getGames(): Promise<Game[]> {
    try {
      const gamelist = await this.prisma.gamelist.findMany();
      return gamelist;
    } catch (error) {
      console.error("Erro ao buscar registro:", error);
      throw new Error("Erro ao buscar registro");
    }
  }
}
