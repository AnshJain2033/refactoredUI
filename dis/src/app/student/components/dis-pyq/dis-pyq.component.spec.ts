import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisPyqComponent } from './dis-pyq.component';

describe('DisPyqComponent', () => {
  let component: DisPyqComponent;
  let fixture: ComponentFixture<DisPyqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisPyqComponent]
    });
    fixture = TestBed.createComponent(DisPyqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});