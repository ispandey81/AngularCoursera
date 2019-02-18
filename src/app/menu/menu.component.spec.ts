import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';
import { observable, of, Observable } from 'rxjs';
import { MatGridListModule, MatProgressSpinnerModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const dishServiceStub = {
    getDishes: function (): Observable<Dish[]> {
      return of(DISHES);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatProgressSpinnerModule, MatGridListModule,
        FlexLayoutModule, RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent }])],
      declarations: [MenuComponent],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: 'BaseURL', useValue: baseURL }
      ]
    })
      .compileComponents();
    const dishService = TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('dishes items should be four', () => {
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipakoda');
    expect(component.dishes[3].featured).toBeFalsy();
  });
  it('should use dishes in the template', () => {
    fixture.detectChanges();
    let dom: DebugElement;
    let el: HTMLElement;
    dom = fixture.debugElement.query(By.css('h1'));
    el = dom.nativeElement;
    expect(el.textContent).toContain(DISHES[0].name.toUpperCase());
  });
});
