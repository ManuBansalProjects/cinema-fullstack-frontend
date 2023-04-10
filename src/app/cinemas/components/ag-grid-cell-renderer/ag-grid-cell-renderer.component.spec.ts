import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCellRendererComponent } from './ag-grid-cell-renderer.component';

describe('AgGridCellRendererComponent', () => {
  let component: AgGridCellRendererComponent;
  let fixture: ComponentFixture<AgGridCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
