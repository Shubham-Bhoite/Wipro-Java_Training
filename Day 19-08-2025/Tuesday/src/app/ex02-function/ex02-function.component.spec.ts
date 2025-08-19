import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex02FunctionComponent } from './ex02-function.component';

describe('Ex02FunctionComponent', () => {
  let component: Ex02FunctionComponent;
  let fixture: ComponentFixture<Ex02FunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex02FunctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex02FunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
