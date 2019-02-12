import { Component, OnInit, inject, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMsg: string;
  // selectedDish: Dish;
  constructor(private dishService: DishService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe((dishes) => this.dishes = dishes, errMs => this.errMsg = <any>errMs);
  }
}
