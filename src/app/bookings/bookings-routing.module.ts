import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowBookingComponent } from './component/show-booking/show-booking.component';
import { BookinghistoryComponent } from './component/bookinghistory/bookinghistory.component';
import { BookingsComponent } from './component/bookings/bookings.component';

const routes: Routes = [
  {path:'', component:BookingsComponent},
  {path:'showbooking/:movieid/:cinemaid/:showid', component:ShowBookingComponent},
  {path:'bookinghistory/user/:userid', component:BookinghistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
