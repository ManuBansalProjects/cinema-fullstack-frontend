import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MoviesComponent } from './components/movies/movies.component';
import { AgGridCellRendererComponent } from './components/ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SelectCinemaComponent } from './components/select-cinema/select-cinema.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';



@NgModule({
  declarations: [
    MoviesComponent,
    AgGridCellRendererComponent,
    MovieDetailsComponent,
    SelectCinemaComponent,
    AddEditMovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
})
export class MoviesModule { 
  constructor(){
    console.log('movies module initialized');
  }
}
