import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';

import 'ag-grid-enterprise';

import { DatePipe } from '@angular/common';
// import {MatButtonModule} from '@angular/material/button';
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
// import {MatTableModule} from '@angular/material/table';
// import {MatDialogModule} from '@angular/material/dialog';

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
import { SelectcinemaComponent } from './components/moviesRelated/selectcinema/selectcinema.component';
import { AllbookingsComponent } from './components/bookingRelated/allbookings/allbookings.component';
import { AggridcellmovieposterComponent } from './components/moviesRelated/aggridcellmovieposter/aggridcellmovieposter.component';
import { AggridcellcinemaComponent } from './components/cinemaRelated/aggridcellcinema/aggridcellcinema.component';
import { AggridcellshowComponent } from './components/showRelated/aggridcellshow/aggridcellshow.component';
import { AggridcelluserComponent } from './components/userRelated/aggridcelluser/aggridcelluser.component';
import { ProfileComponent } from './components/userRelated/profile/profile.component';
import { UpdatepasswordComponent } from './components/userRelated/updatepassword/updatepassword.component';
import { ChangepasswordComponent } from './components/userRelated/changepassword/changepassword.component';




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
    AddnewcinemaComponent,
    EditcinemaComponent,
    AddnewmovieComponent,
    EditmovieComponent,
    ForgotpasswordComponent,
    CinemadetailsComponent,
    ShowsComponent,
    AddnewshowComponent,
    EditshowComponent,
    BookinghistoryComponent,
    AllbookingsComponent,
    AggridcellmovieposterComponent,
    AggridcellcinemaComponent,
    AggridcellshowComponent,
    AggridcelluserComponent,
    ProfileComponent,
    UpdatepasswordComponent,
    ChangepasswordComponent,
    
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

    AgGridModule,
    

    // MatButtonModule,
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
    // MatTableModule,
    // MatDialogModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
