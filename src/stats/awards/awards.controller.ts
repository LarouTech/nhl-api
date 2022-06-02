import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AwardsService } from './awards.service';
import { Award } from './interfaces/awards.interface';

@Controller('awards')
export class AwardsController {
  constructor(private awards: AwardsService) {}

  @Get()
  getAwards(): Observable<Award[]> {
    return this.awards.getAwards();
  }

  @Get(':id')
  getAward(@Param('id') id: number) {
    return this.awards.getAwards(id);
  }
}
