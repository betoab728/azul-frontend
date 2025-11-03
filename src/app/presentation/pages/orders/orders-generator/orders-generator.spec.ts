import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersGenerator } from './orders-generator';

describe('OrdersGenerator', () => {
  let component: OrdersGenerator;
  let fixture: ComponentFixture<OrdersGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
