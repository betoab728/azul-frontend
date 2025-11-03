import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesGenerator } from './quotes-generator';

describe('QuotesGenerator', () => {
  let component: QuotesGenerator;
  let fixture: ComponentFixture<QuotesGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
