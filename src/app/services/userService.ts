import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {GlobalService} from './globalService';
import {UserForCreation} from '../models/userForCreation';
import {Observable} from 'rxjs/Observable';
import {UserForLogin} from '../models/userForLogin';

@Injectable()
export class UserService {
  private url: string;
  private headers = new HttpHeaders();


  constructor(private http: HttpClient, private global: GlobalService) {
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Content-Type', 'application/json');
    this.url = global.servicePath + 'users/';
  }

  public register(user: UserForCreation): Observable<HttpResponse<any>> {
    return this.http.post(this.url, user, {headers: this.headers, observe: 'response'});
  }

  public login(user: UserForLogin): Observable<HttpResponse<any>> {
    return this.http.post(this.url + 'token/', user, {headers: this.headers, observe: 'response'});
  }

}
