import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderRow } from './detail-order-row';

describe('DetailOrderRow', () => {
  let component: DetailOrderRow;
  let fixture: ComponentFixture<DetailOrderRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailOrderRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailOrderRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
