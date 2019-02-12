import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  constructor(private dishService: DishService, private promoService: PromotionService, private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish, errMess => this.dishErrMsg = <any>errMess);
    this.promoService.getFeaturedPromotion().subscribe((promo) => this.promotion = promo);
    this.leaderService.getFeaturedLeader().subscribe((leader) => this.leader = leader);
  }

}
