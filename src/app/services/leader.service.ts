import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
    // return Promise.resolve(LEADERS);
  }
  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter((lead) => (lead.id === id))[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((lead) => (lead.id === id))[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(LEADERS.filter((lead) => (lead.id === id))[0]);
  }
  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((lead) => lead.featured)[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((lead) => lead.featured)[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(LEADERS.filter((lead) => lead.featured)[0]);
  }
}
