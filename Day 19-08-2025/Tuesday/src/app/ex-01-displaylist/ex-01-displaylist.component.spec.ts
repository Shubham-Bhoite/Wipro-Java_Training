import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex01DisplaylistComponent } from './ex-01-displaylist.component';

describe('Ex01DisplaylistComponent', () => {
  let component: Ex01DisplaylistComponent;
  let fixture: ComponentFixture<Ex01DisplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex01DisplaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex01DisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
