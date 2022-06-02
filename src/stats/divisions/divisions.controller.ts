import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Division } from './interfaces/division.interface';
import { DivisionsService } from './divisions.service';

@Controller('divisions')
export class DivisionsController {
  constructor(private division: DivisionsService) {}

  @Get()
  getDivisions(): Observable<Division | Division[]> {
    return this.division.getDivisions();
  }

  @Get(':id')
  getDivision(@Param('id') id: string): Observable<Division | Division[]> {
    return this.division.getDivisions(id);
  }
}
