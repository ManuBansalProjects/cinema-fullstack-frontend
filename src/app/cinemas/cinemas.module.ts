import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemasRoutingModule } from './cinemas-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { CinemasComponent } from './components/cinemas/cinemas.component';
import { AgGridCellRendererComponent } from './components/ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { CinemaDetailsComponent } from './components/cinema-details/cinema-details.component';
import { AddEditCinemaComponent } from './components/add-edit-cinema/add-edit-cinema.component';



@NgModule({
  declarations: [
    CinemasComponent,
    AgGridCellRendererComponent,
    CinemaDetailsComponent,
    AddEditCinemaComponent
  ],
  imports: [
    CommonModule,
    CinemasRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CinemasModule { }
