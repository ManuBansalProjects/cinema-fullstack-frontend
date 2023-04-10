import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemasComponent } from './components/cinemas/cinemas.component';
import { CinemaDetailsComponent } from './components/cinema-details/cinema-details.component';
import { AddEditCinemaComponent } from './components/add-edit-cinema/add-edit-cinema.component';

const routes: Routes = [
  { path: '', component: CinemasComponent },
  { path: 'cinema/:cinemaid', component: CinemaDetailsComponent },
  { path: 'addcinema', component: AddEditCinemaComponent },
  { path: 'editcinema/:cinemaid', component: AddEditCinemaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemasRoutingModule { }
