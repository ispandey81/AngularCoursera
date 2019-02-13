import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of, Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private processHTTPMsgService: ProcessHTTPMsgService, private http: HttpClient) { }
  getLeaders(): Observable<Leader[]> {
    // return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
    // return Promise.resolve(LEADERS);
  }
  getLeader(id: string): Observable<Leader> {
    // return of(LEADERS.filter((lead) => (lead.id === id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leadership/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((lead) => (lead.id === id))[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(LEADERS.filter((lead) => (lead.id === id))[0]);
  }
  getFeaturedLeader(): Observable<Leader> {
    // return of(LEADERS.filter((lead) => lead.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((lead) => lead.featured)[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(LEADERS.filter((lead) => lead.featured)[0]);
  }
}
