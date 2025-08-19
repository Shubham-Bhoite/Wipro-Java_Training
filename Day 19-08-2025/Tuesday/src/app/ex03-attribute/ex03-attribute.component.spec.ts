import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex03AttributeComponent } from './ex03-attribute.component';

describe('Ex03AttributeComponent', () => {
  let component: Ex03AttributeComponent;
  let fixture: ComponentFixture<Ex03AttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex03AttributeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex03AttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
