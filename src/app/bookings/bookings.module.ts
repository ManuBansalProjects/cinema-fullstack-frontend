import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsComponent } from './component/bookings/bookings.component';
import { BookinghistoryComponent } from './component/bookinghistory/bookinghistory.component';
import { ShowBookingComponent } from './component/show-booking/show-booking.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookingsComponent,
    BookinghistoryComponent,
    ShowBookingComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    FormsModule
  ]
})
export class BookingsModule { }
