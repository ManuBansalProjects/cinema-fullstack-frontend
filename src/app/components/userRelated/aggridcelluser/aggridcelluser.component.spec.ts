import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridcelluserComponent } from './aggridcelluser.component';

describe('AggridcelluserComponent', () => {
  let component: AggridcelluserComponent;
  let fixture: ComponentFixture<AggridcelluserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridcelluserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggridcelluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
