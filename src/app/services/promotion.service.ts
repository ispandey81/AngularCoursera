import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private processHTTPMsgService: ProcessHTTPMsgService, private http: HttpClient) { }
  getPromotions(): Observable<Promotion[]> {
    // return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(catchError(this.processHTTPMsgService.handleError));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(PROMOTIONS);
    //   }, 2000);
    // });
    // return Promise.resolve(PROMOTIONS);
  }
  getPromotion(id: string): Observable<Promotion> {
    // return of(PROMOTIONS.filter((prom) => (prom.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((prom) => (prom.id === id))[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(PROMOTIONS.filter((prom) => (prom.id === id))[0]);
  }
  getFeaturedPromotion(): Observable<Promotion> {
    // return of(PROMOTIONS.filter((prom) => prom.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((prom) => prom.featured)[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(PROMOTIONS.filter((prom) => prom.featured)[0]);
  }
}
