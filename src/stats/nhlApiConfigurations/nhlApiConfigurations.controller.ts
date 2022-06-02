import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigurationTypes } from './enum/nhlApiConfigurations.enum';
import { NhlApiConfigurationsResponse } from './interfaces/nhlApiConfigurations.interfaces';
import { NhlApiConfigurationsService } from './nhlApiConfigurations.service';

@Controller('configurations')
export class ConfigurationsController {
  constructor(
    private readonly hhlApiConfigurationsService: NhlApiConfigurationsService,
  ) {}

  @Get()
  getConfig(): Observable<NhlApiConfigurationsResponse> {
    return this.hhlApiConfigurationsService.getConfig();
  }

  @Get(':configType')
  getConfigByType(
    @Param('configType') configType: ConfigurationTypes,
  ): Observable<NhlApiConfigurationsResponse> {
    return this.hhlApiConfigurationsService.getConfig(configType);
  }
}
