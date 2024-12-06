import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsCellRendererTaskComponent } from './actions-cell-renderer-task.component';

describe('ActionsCellRendererTaskComponent', () => {
  let component: ActionsCellRendererTaskComponent;
  let fixture: ComponentFixture<ActionsCellRendererTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsCellRendererTaskComponent]
    });
    fixture = TestBed.createComponent(ActionsCellRendererTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
