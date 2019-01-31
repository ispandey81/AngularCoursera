import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }
  getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((prom) => (prom.id === id))[0];
  }
  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((prom) => prom.featured)[0];
  }
}
