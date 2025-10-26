import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesTypes } from './vehicles-types';

describe('VehiclesTypes', () => {
  let component: VehiclesTypes;
  let fixture: ComponentFixture<VehiclesTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesTypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesTypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
