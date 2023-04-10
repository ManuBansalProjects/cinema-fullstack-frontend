import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { NopageComponent } from './components/nopage/nopage.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SheetbookingComponent } from './components/bookingRelated/sheetbooking/sheetbooking.component';
import { ShowsComponent } from './components/showRelated/shows/shows.component';
import { AddnewshowComponent } from './components/showRelated/addnewshow/addnewshow.component';
import { EditshowComponent } from './components/showRelated/editshow/editshow.component';
import { BookinghistoryComponent } from './components/bookingRelated/bookinghistory/bookinghistory.component';
import { AllbookingsComponent } from './components/bookingRelated/allbookings/allbookings.component';


const routes: Routes = [
  {path:'', component: WelcomeComponent}, 
  {
    path: 'movies', loadChildren:() => import('./movies/movies.module').then(mod => mod.MoviesModule)
  },
  {
    path: 'cinemas', loadChildren:() => import('./cinemas/cinemas.module').then(mod => mod.CinemasModule)
  },
  {
    path: 'users', loadChildren:() => import('./users/users.module').then(mod => mod.UsersModule)
  },

  
  
  {path:'showsbooking/:movieid/:cinemaid/:showid', component:SheetbookingComponent},
  {path:'users/bookinghistory/:userid', component:BookinghistoryComponent},
  {path:'bookings', component:AllbookingsComponent},

  
  // for admin only
  

  

  

  {path:'shows', component:ShowsComponent},
  {path:'shows/addnewshow', component:AddnewshowComponent},
  {path:'shows/editshow/:showid', component:EditshowComponent},

  

  
  {path:'**', component:NopageComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
