import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureDialogComponent } from './infrastructure-dialog.component';

describe('InfrastructureDialogComponent', () => {
  let component: InfrastructureDialogComponent;
  let fixture: ComponentFixture<InfrastructureDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfrastructureDialogComponent]
    });
    fixture = TestBed.createComponent(InfrastructureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
