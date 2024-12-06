import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsPyqComponent } from './uploads-pyq.component';

describe('UploadsPyqComponent', () => {
  let component: UploadsPyqComponent;
  let fixture: ComponentFixture<UploadsPyqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadsPyqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadsPyqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
