import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Generators } from './generators';

describe('Generators', () => {
  let component: Generators;
  let fixture: ComponentFixture<Generators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Generators]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Generators);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
