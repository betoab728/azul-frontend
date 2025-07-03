import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Waste } from './waste';

describe('Waste', () => {
  let component: Waste;
  let fixture: ComponentFixture<Waste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Waste]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Waste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
