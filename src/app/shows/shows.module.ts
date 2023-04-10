import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsRoutingModule } from './shows-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShowsComponent } from './components/shows/shows.component';
import { AgGridCellRendererComponent } from './components/ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { AddEditShowComponent } from './components/add-edit-show/add-edit-show.component';


@NgModule({
  declarations: [
    ShowsComponent,
    AgGridCellRendererComponent,
    AddEditShowComponent
  ],
  imports: [
    CommonModule,
    ShowsRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShowsModule { }
