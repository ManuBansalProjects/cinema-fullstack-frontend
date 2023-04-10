import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCinemaComponent } from './add-edit-cinema.component';

describe('AddEditCinemaComponent', () => {
  let component: AddEditCinemaComponent;
  let fixture: ComponentFixture<AddEditCinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCinemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
