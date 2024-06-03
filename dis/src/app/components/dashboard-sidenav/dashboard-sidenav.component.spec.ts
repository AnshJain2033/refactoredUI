import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidenavComponent } from './dashboard-sidenav.component';

describe('DashboardSidenavComponent', () => {
  let component: DashboardSidenavComponent;
  let fixture: ComponentFixture<DashboardSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSidenavComponent]
    });
    fixture = TestBed.createComponent(DashboardSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
