import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaste } from './add-waste';

describe('AddWaste', () => {
  let component: AddWaste;
  let fixture: ComponentFixture<AddWaste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWaste]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWaste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
