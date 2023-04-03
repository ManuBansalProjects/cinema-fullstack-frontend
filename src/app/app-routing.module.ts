import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CinemasComponent } from './components/cinemaRelated/cinemas/cinemas.component';
import { LoginComponent } from './components/userRelated/login/login.component';
import { MoviesComponent } from './components/moviesRelated/movies/movies.component';
import { NopageComponent } from './components/nopage/nopage.component';
import { RegistrationComponent } from './components/userRelated/registration/registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MoviedetailsComponent } from './components/moviesRelated/moviedetails/moviedetails.component';
import { SelectcinemaComponent } from './components/moviesRelated/selectcinema/selectcinema.component';
import { SheetbookingComponent } from './components/bookingRelated/sheetbooking/sheetbooking.component';
import { UsersComponent } from './components/userRelated/users/users.component';
import { AddnewcinemaComponent } from './components/cinemaRelated/addnewcinema/addnewcinema.component';
import { EditcinemaComponent } from './components/cinemaRelated/editcinema/editcinema.component';
import { AddnewmovieComponent } from './components/moviesRelated/addnewmovie/addnewmovie.component';
import { EditmovieComponent } from './components/moviesRelated/editmovie/editmovie.component';
import { ForgotpasswordComponent } from './components/userRelated/forgotpassword/forgotpassword.component';
import { CinemadetailsComponent } from './components/cinemaRelated/cinemadetails/cinemadetails.component';
import { ShowsComponent } from './components/showRelated/shows/shows.component';
import { AddnewshowComponent } from './components/showRelated/addnewshow/addnewshow.component';
import { EditshowComponent } from './components/showRelated/editshow/editshow.component';
import { BookinghistoryComponent } from './components/bookingRelated/bookinghistory/bookinghistory.component';
import { AllbookingsComponent } from './components/bookingRelated/allbookings/allbookings.component';
import { ProfileComponent } from './components/userRelated/profile/profile.component';
import { UpdatepasswordComponent } from './components/userRelated/updatepassword/updatepassword.component';
import { ChangepasswordComponent } from './components/userRelated/changepassword/changepassword.component';

const routes: Routes = [
  {path:'', component: WelcomeComponent}, 
    
  
  {path:'movies', component:MoviesComponent},
  {path:'movies/details/:movieid', component:MoviedetailsComponent},
  {path:'movies/:movieid/shows', component:SelectcinemaComponent},

  {path:'cinemas', component:CinemasComponent},
  {path:'cinemas/details/:cinemaid', component:CinemadetailsComponent},
  
  {path:'showsbooking/:movieid/:cinemaid/:showid', component:SheetbookingComponent},

  {path:'users/bookinghistory/:userid', component:BookinghistoryComponent},
  {path:'users/profile/:userid', component:ProfileComponent},
  {path:'users/updatepassword/:userid', component:UpdatepasswordComponent},
  {path:'users/changepassword/:token', component:ChangepasswordComponent},

  
  // for admin only
  {path:'users', component:UsersComponent},

  {path:'cinemas/addnewcinema', component:AddnewcinemaComponent},
  {path:'cinemas/editcinema/:id', component:EditcinemaComponent},

  {path:'movies/addnewmovie', component:AddnewmovieComponent},
  {path:'movies/editmovie/:id', component:EditmovieComponent},

  {path:'shows', component:ShowsComponent},
  {path:'shows/addnewshow', component:AddnewshowComponent},
  {path:'shows/editshow/:showid', component:EditshowComponent},

  {path:'bookings', component:AllbookingsComponent},

     
  
  {path:'login', component:LoginComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'forgotpassword', component:ForgotpasswordComponent},
  {path:'**', component:NopageComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
