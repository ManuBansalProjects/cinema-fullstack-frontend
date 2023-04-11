import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit{

  api:string='http://localhost:3000';

  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService, private bookingsService: BookingsService ){

  }

  ngOnInit(): void {
    this.allBookingsRole();
  } 

  bookings:any;

  allBookingsRole(){
    const token=localStorage.getItem('token');

    if(token==null){
      this.router.navigate(['/']);
    }
    else{
      const headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
      this.http.get(`${this.api}/auth/getrole`,{headers}).subscribe((response:any)=>{
        if(response.error){
          this.toastr.error(response.error,'message from website',{timeOut:3000});
          this.router.navigate(['/']);
        }
        else{
          if(response.role!=1){
            this.router.navigate(['/']);
          }
          else{
            this.bookingsService.allBookingHistory().subscribe((response:any)=>{
              if(response.error){
                this.toastr.error(response.error,'message from website',{timeOut:3000});
                this.router.navigate(['/']);
              }
              else{
                this.bookings=response.result;
                console.log(this.bookings);
              }
            })
          }
        }
      })
    }
    
  }



}