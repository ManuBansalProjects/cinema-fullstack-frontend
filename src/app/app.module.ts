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


import { NavbarComponent } from './components/navbar/navbar.component';


import { FooterComponent } from './components/footer/footer.component';



import { SheetbookingComponent } from './components/bookingRelated/sheetbooking/sheetbooking.component';






import { ShowsComponent } from './components/showRelated/shows/shows.component';
import { AddnewshowComponent } from './components/showRelated/addnewshow/addnewshow.component';
import { EditshowComponent } from './components/showRelated/editshow/editshow.component';
import { BookinghistoryComponent } from './components/bookingRelated/bookinghistory/bookinghistory.component';

import { AllbookingsComponent } from './components/bookingRelated/allbookings/allbookings.component';


import { AggridcellshowComponent } from './components/showRelated/aggridcellshow/aggridcellshow.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SheetbookingComponent,
    ShowsComponent,
    AddnewshowComponent,
    EditshowComponent,
    BookinghistoryComponent,
    AllbookingsComponent,
    AggridcellshowComponent,
    
    
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
