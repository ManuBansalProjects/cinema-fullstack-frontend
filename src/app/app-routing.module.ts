import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NopageComponent } from './components/nopage/nopage.component';
import { MainPageComponent } from './components/main-page/main-page.component';



const routes: Routes = [
  {path:'', component: MainPageComponent}, 
  {
    path: 'movies', loadChildren:() => import('./movies/movies.module').then(mod => mod.MoviesModule)
  },
  {
    path: 'cinemas', loadChildren:() => import('./cinemas/cinemas.module').then(mod => mod.CinemasModule)
  },
  {
    path: 'users', loadChildren:() => import('./users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'shows', loadChildren:() => import('./shows/shows.module').then(mod => mod.ShowsModule)
  },
  {
    path: 'bookings', loadChildren:() => import('./bookings/bookings.module').then(mod => mod.BookingsModule)
  },
  {path:'**', component:NopageComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
