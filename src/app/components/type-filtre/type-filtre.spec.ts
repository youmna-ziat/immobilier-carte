import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFiltre } from './type-filtre';

describe('TypeFiltre', () => {
  let component: TypeFiltre;
  let fixture: ComponentFixture<TypeFiltre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeFiltre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeFiltre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
