import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  constructor(private dishService: DishService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id']))).subscribe((dish) => this.dish = dish);
  }
  goBack() {
    this.location.back();
  }
}
