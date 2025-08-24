import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenerator } from './add-generator';

describe('AddGenerator', () => {
  let component: AddGenerator;
  let fixture: ComponentFixture<AddGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
