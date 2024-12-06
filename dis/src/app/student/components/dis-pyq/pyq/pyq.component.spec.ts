import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PYQComponent } from './pyq.component';

describe('PYQComponent', () => {
  let component: PYQComponent;
  let fixture: ComponentFixture<PYQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PYQComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PYQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
