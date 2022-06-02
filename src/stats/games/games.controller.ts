import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameDataType, GamesService } from './games.service';
import { Game } from './interfaces/game.interface';
import { PlayoffGame } from './interfaces/playoffGame.interface';

@Controller('games')
export class GamesController {
  constructor(private games: GamesService) {}

  @Get(':id')
  getGame(
    @Param('id') id: number,
    @Query('gameDataType') gameDataType: GameDataType,
  ): Observable<Game> {
    return this.games.getGameData(id, gameDataType);
  }

  @Get('playoff')
  getPlayoffGames(
    @Query('gameId') gameId: number,
    @Query('gameNumber') gameNumber: number,
    @Query('playoffRound') playoffRound: number,
    @Query('seasonId') seasonId: number,
  ): Observable<PlayoffGame[]> {
    return this.games.getPlayoffGames(
      gameId,
      gameNumber,
      playoffRound,
      seasonId,
    );
  }
}
