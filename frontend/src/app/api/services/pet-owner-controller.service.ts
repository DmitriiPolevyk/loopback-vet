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

import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root',
})
export class PetOwnerControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation petOwnerControllerGetOwner
   */
  static readonly PetOwnerControllerGetOwnerPath = '/pets/{id}/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwner$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Array<Owner>>> {

    const rb = new RequestBuilder(this.rootUrl, PetOwnerControllerService.PetOwnerControllerGetOwnerPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Owner>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwner(params: {
    id: number;
  }): Observable<Array<Owner>> {

    return this.getOwner$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Owner>>) => r.body as Array<Owner>)
    );
  }

}
