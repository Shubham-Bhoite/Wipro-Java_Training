import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex01HomeComponent } from './ex01-home.component';

describe('Ex01HomeComponent', () => {
  let component: Ex01HomeComponent;
  let fixture: ComponentFixture<Ex01HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex01HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex01HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
