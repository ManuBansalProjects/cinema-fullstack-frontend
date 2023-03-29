import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridcellmovieposterComponent } from './aggridcellmovieposter.component';

describe('AggridcellmovieposterComponent', () => {
  let component: AggridcellmovieposterComponent;
  let fixture: ComponentFixture<AggridcellmovieposterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridcellmovieposterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggridcellmovieposterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
