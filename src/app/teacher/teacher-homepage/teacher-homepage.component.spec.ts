import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHomepageComponent } from './teacher-homepage.component';

describe('TeacherHomepageComponent', () => {
  let component: TeacherHomepageComponent;
  let fixture: ComponentFixture<TeacherHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherHomepageComponent]
    });
    fixture = TestBed.createComponent(TeacherHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
