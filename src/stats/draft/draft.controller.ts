import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DraftService } from './draft.service';
import { Draft } from './interfaces/draft.interface';
import { DraftPlayer } from './interfaces/draftPlayer.interface';
import { Prospects } from './interfaces/prospects.interface';

@Controller('draft')
export class DraftController {
  constructor(private draft: DraftService) {}

  @Get()
  getDraft(@Query('year') year?: number): Observable<Draft> {
    return this.draft.getDraft(year);
  }

  @Get('prospects')
  getDraftProspects(): Observable<Prospects[] | Prospects> {
    return this.draft.getDraftProspects();
  }

  @Get('prospects/:id')
  getDraftProspect(
    @Param('id') id: number,
  ): Observable<Prospects[] | Prospects> {
    return this.draft.getDraftProspects(id);
  }

  @Get('players')
  getDraftPlayers(
    @Query('draftYear') draftYear: number,
    @Query('draftedByTeamId') draftedByTeamId: number,
  ): Observable<DraftPlayer[]> {
    return this.draft.getDraftPlayers(draftYear, draftedByTeamId);
  }
}
