import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyRoomComponent } from './faculty-room.component';

describe('FacultyRoomComponent', () => {
  let component: FacultyRoomComponent;
  let fixture: ComponentFixture<FacultyRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultyRoomComponent]
    });
    fixture = TestBed.createComponent(FacultyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
