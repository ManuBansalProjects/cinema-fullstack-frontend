import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


import {MatButtonModule} from '@angular/material/button';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import {MatIconModule} from '@angular/material/icon';
// import {MatBadgeModule} from '@angular/material/badge';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatListModule} from '@angular/material/list'
// import { MatDividerModule } from '@angular/material/divider';
// import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';

import { NopageComponent } from './components/nopage/nopage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/userRelated/login/login.component';
import { RegistrationComponent } from './components/userRelated/registration/registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';
import { MoviesComponent } from './components/moviesRelated/movies/movies.component';
import { CinemasComponent } from './components/cinemaRelated/cinemas/cinemas.component';
import { MoviedetailsComponent } from './components/moviesRelated/moviedetails/moviedetails.component';
import { SheetbookingComponent } from './components/bookingRelated/sheetbooking/sheetbooking.component';
import { UsersComponent } from './components/userRelated/users/users.component';
import { DeletepopupComponent } from './components/userRelated/deletepopup/deletepopup.component';
import { CinemadeletepopupComponent } from './components/cinemaRelated/cinemadeletepopup/cinemadeletepopup.component';
import { AddnewcinemaComponent } from './components/cinemaRelated/addnewcinema/addnewcinema.component';
import { EditcinemaComponent } from './components/cinemaRelated/editcinema/editcinema.component';
import { MoviedeletepopupComponent } from './components/moviesRelated/moviedeletepopup/moviedeletepopup.component';
import { AddnewmovieComponent } from './components/moviesRelated/addnewmovie/addnewmovie.component';
import { EditmovieComponent } from './components/moviesRelated/editmovie/editmovie.component';
import { ForgotpasswordComponent } from './components/userRelated/forgotpassword/forgotpassword.component';
import { CinemadetailsComponent } from './components/cinemaRelated/cinemadetails/cinemadetails.component';
import { ShowsComponent } from './components/showRelated/shows/shows.component';
import { AddnewshowComponent } from './components/showRelated/addnewshow/addnewshow.component';
import { EditshowComponent } from './components/showRelated/editshow/editshow.component';
import { ShowdeletepopupComponent } from './components/showRelated/showdeletepopup/showdeletepopup.component';
import { BookinghistoryComponent } from './components/bookingRelated/bookinghistory/bookinghistory.component';
import { SelectcinemaComponent } from './components/moviesRelated/selectcinema/selectcinema.component';




@NgModule({
  declarations: [
    AppComponent,
    NopageComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    WelcomeComponent,
    FooterComponent,
    UsernavbarComponent,
    MoviesComponent,
    CinemasComponent,
    MoviedetailsComponent,
    SelectcinemaComponent,
    SheetbookingComponent,
    UsersComponent,
    DeletepopupComponent,
    CinemadeletepopupComponent,
    AddnewcinemaComponent,
    EditcinemaComponent,
    MoviedeletepopupComponent,
    AddnewmovieComponent,
    EditmovieComponent,
    ForgotpasswordComponent,
    CinemadetailsComponent,
    ShowsComponent,
    AddnewshowComponent,
    EditshowComponent,
    ShowdeletepopupComponent,
    BookinghistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    ToastrModule.forRoot({
      timeOut:2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),

    MatButtonModule,
    // MatButtonToggleModule,
    // MatIconModule,
    // MatBadgeModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatMenuModule,
    // MatListModule,
    // MatDividerModule,
    // MatGridListModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
