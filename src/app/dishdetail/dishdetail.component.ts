import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

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
  commentForm: FormGroup;
  comment: Comment;
  formErrors = {
    'author': '',
    'comment': '',
    'rating': ''
  };
  validationMessages = {
    'author': {
      'required': 'name is required',
      'minlength': '2 characters long'
    },
    'comment': {
      'required': 'comment is required'
    },
    'rating': {
      'required': 'rating is required'
    }
  };
  @ViewChild('cform') commentFormDirective;
  constructor(private dishService: DishService, private location: Location, private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.commentForm = this.fb.group(
      {
        author: ['', [Validators.required, Validators.minLength(2)]],
        comment: ['', [Validators.required]],
        rating: [5]
      }
    );
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset form validation messages
  }
  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id']))).
      subscribe((dish) => { this.dish = dish; this.setPrevNext(dish.id); });
  }
  goBack() {
    this.location.back();
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.commentForm.value);
    this.commentForm.reset(
      {
        author: '',
        comment: '',
        rating: 5
      }
    );
    this.commentFormDirective.resetForm();
    this.commentForm.setValue({ rating: 5, author: '', comment: '' });
    let date = new Date();
    this.comment.date = date.toISOString();
    this.dish.comments.push(this.comment);
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    if (this.commentForm.valid) {
      this.comment = this.commentForm.value;
    }
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear prev error messages
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid && control.touched) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
