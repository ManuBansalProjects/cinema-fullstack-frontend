import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridcellshowComponent } from './aggridcellshow.component';

describe('AggridcellshowComponent', () => {
  let component: AggridcellshowComponent;
  let fixture: ComponentFixture<AggridcellshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridcellshowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggridcellshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
