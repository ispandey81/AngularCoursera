import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(PROMOTIONS);
    //   }, 2000);
    // });
    // return Promise.resolve(PROMOTIONS);
  }
  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter((prom) => (prom.id === id))[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((prom) => (prom.id === id))[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(PROMOTIONS.filter((prom) => (prom.id === id))[0]);
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((prom) => prom.featured)[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   // server delay simulation
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((prom) => prom.featured)[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(PROMOTIONS.filter((prom) => prom.featured)[0]);
  }
}
