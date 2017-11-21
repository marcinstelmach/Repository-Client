import {Injectable} from '@angular/core';
import {AuthService} from './authService';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {RepositoryModel} from '../models/repositoryModel';
import {GlobalService} from './globalService';

@Injectable()
export class RepositoryService {
  public token: string;
  private url: string;
  private headers = new HttpHeaders();
  private userId: string;


  constructor(private authService: AuthService, private global: GlobalService, private http: HttpClient) {
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Content-Type', 'application/json');
    this.userId = this.authService.getUserId();
    this.url = this.global.servicePath + 'users/' + this.userId + '/repositories/';
    this.token = this.authService.getToken();
  }

  getRepositoriesForUser(): Observable<HttpResponse<any>> {
    return this.http.get(this.url);
  }

}
