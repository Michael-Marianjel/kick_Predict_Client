import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }
  server: string = environment.server;

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.append(k, params[k]);
        // reqOpts.params.set(k, params[k]);
      }
    }
    return this.http.get(this.server + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {

    return this.http.post(this.server + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.server + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.append(k, params[k]);
        // reqOpts.params.set(k, params[k]);
      }
    }
    return this.http.delete(this.server + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.server + '/' + endpoint, body, reqOpts);
  }
}
