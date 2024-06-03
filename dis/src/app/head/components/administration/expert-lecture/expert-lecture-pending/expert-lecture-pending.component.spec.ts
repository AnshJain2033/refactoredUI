import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertLecturePendingComponent } from './expert-lecture-pending.component';

describe('ExpertLecturePendingComponent', () => {
  let component: ExpertLecturePendingComponent;
  let fixture: ComponentFixture<ExpertLecturePendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertLecturePendingComponent]
    });
    fixture = TestBed.createComponent(ExpertLecturePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
