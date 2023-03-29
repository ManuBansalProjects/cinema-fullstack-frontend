import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridcellcinemaComponent } from './aggridcellcinema.component';

describe('AggridcellcinemaComponent', () => {
  let component: AggridcellcinemaComponent;
  let fixture: ComponentFixture<AggridcellcinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridcellcinemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggridcellcinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
