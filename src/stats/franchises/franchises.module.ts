import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { FranchisesController } from './franchises.controller';
import { FranchisesService } from './franchises.service';

@Module({
  imports: [HttpModule],
  controllers: [FranchisesController],
  providers: [FranchisesService, ConfigService, ApiLoggerService],
})
export class FranchisesModule {}
