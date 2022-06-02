import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameType } from './enum/gameType.enum';
import { ScheduleExpands } from './enum/scheduleExpands';
import { Schedule } from './interfaces/schedule.interface';
import { NhlScheduleService } from './nhlSchedule.service';

@Controller('schedule')
export class NhlScheduleController {
  constructor(private scheduleService: NhlScheduleService) {}

  @Get()
  getSchedule(
    @Query('expand') expand: ScheduleExpands,
    @Query('teamId') teamId: number,
    @Query('date') date: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('gameType') gameType: GameType,
  ): Observable<Schedule> {
    return this.scheduleService.getSchedule(
      expand,
      teamId,
      date,
      startDate,
      endDate,
      gameType,
    );
  }
}
