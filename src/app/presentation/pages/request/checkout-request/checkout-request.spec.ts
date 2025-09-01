import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutRequest } from './checkout-request';

describe('CheckoutRequest', () => {
  let component: CheckoutRequest;
  let fixture: ComponentFixture<CheckoutRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
