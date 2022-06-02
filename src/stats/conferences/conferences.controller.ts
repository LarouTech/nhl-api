import { Controller, Get, Param } from '@nestjs/common';
import { ConferencesService } from './conferences.service';

@Controller('conferences')
export class ConferencesController {
  constructor(private conference: ConferencesService) {}

  @Get()
  getConferences() {
    return this.conference.getDivisions();
  }

  @Get(':id')
  getConference(@Param('id') id: string) {
    return this.conference.getDivisions(id);
  }
}
