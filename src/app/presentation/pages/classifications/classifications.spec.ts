import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Classifications } from './classifications';

describe('Classifications', () => {
  let component: Classifications;
  let fixture: ComponentFixture<Classifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Classifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Classifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
