/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AddressControllerService } from './services/address-controller.service';
import { AnimalControllerService } from './services/animal-controller.service';
import { AnimalSpeciesControllerService } from './services/animal-species-controller.service';
import { OwnerControllerService } from './services/owner-controller.service';
import { OwnerAddressControllerService } from './services/owner-address-controller.service';
import { PetControllerService } from './services/pet-controller.service';
import { PetOwnerControllerService } from './services/pet-owner-controller.service';
import { PetSpeciesControllerService } from './services/pet-species-controller.service';
import { SpeciesControllerService } from './services/species-controller.service';
import { WildAnimalControllerService } from './services/wild-animal-controller.service';
import { WildAnimalSpeciesControllerService } from './services/wild-animal-species-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AddressControllerService,
    AnimalControllerService,
    AnimalSpeciesControllerService,
    OwnerControllerService,
    OwnerAddressControllerService,
    PetControllerService,
    PetOwnerControllerService,
    PetSpeciesControllerService,
    SpeciesControllerService,
    WildAnimalControllerService,
    WildAnimalSpeciesControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
