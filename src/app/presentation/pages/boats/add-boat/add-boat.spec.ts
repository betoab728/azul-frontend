import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoat } from './add-boat';

describe('AddBoat', () => {
  let component: AddBoat;
  let fixture: ComponentFixture<AddBoat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBoat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
