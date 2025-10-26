import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddType } from './add-type';

describe('AddType', () => {
  let component: AddType;
  let fixture: ComponentFixture<AddType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
