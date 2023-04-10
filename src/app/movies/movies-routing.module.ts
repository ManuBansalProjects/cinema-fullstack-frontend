import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SelectCinemaComponent } from './components/select-cinema/select-cinema.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';

const routes: Routes = [
  {path:'', component: MoviesComponent},
  {path:'movie/:movieid', component: MovieDetailsComponent},  
  {path:'shows/:movieid', component: SelectCinemaComponent},
  {path:'addmovie', component: AddEditMovieComponent},
  {path:'editmovie/:movieid', component: AddEditMovieComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
