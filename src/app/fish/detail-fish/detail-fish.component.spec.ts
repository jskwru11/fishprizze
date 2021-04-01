import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFishComponent } from './detail-fish.component';

describe('DetailFishComponent', () => {
  let component: DetailFishComponent;
  let fixture: ComponentFixture<DetailFishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
