import {Request, Response} from '@angular/http';
import {Inject} from '@angular/core';
import {Platform} from 'ionic-angular';

import { IHttpInterceptor } from 'angular2-http-interceptor';
export class AuthInterceptor implements IHttpInterceptor {
  constructor(@Inject(Platform) private platform: Platform) {
  }

  before(request: Request): Request {
    if (this.platform.is('cordova') && request.url.match(/^\/api-hk\//)) {
      console.log('ereree');
      
    }
    return request;
  }
}