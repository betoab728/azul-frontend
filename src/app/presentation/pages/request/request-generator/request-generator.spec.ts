import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGenerator } from './request-generator';

describe('RequestGenerator', () => {
  let component: RequestGenerator;
  let fixture: ComponentFixture<RequestGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
