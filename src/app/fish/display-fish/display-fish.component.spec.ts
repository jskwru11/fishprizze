import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFishComponent } from './display-fish.component';

describe('DisplayFishComponent', () => {
  let component: DisplayFishComponent;
  let fixture: ComponentFixture<DisplayFishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayFishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
