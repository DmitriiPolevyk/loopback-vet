/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Species } from '../models/species';

@Injectable({
  providedIn: 'root',
})
export class PetSpeciesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation petSpeciesControllerGetSpecies
   */
  static readonly PetSpeciesControllerGetSpeciesPath = '/pets/{id}/species';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSpecies()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSpecies$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Array<Species>>> {

    const rb = new RequestBuilder(this.rootUrl, PetSpeciesControllerService.PetSpeciesControllerGetSpeciesPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Species>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSpecies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSpecies(params: {
    id: number;
  }): Observable<Array<Species>> {

    return this.getSpecies$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Species>>) => r.body as Array<Species>)
    );
  }

}
