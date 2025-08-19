import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex05FruitComponent } from './ex05-fruit.component';

describe('Ex05FruitComponent', () => {
  let component: Ex05FruitComponent;
  let fixture: ComponentFixture<Ex05FruitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex05FruitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex05FruitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
