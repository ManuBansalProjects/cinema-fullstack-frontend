import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allbookings',
  templateUrl: './allbookings.component.html',
  styleUrls: ['./allbookings.component.css']
})
export class AllbookingsComponent implements OnInit{
  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService ){

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
      this.http.get('/api/auth/getrole',{headers}).subscribe((response:any)=>{
        if(response.error){
          this.toastr.error(response.error,'message from website',{timeOut:3000});
          this.router.navigate(['/']);
        }
        else{
          if(response.role!=1){
            this.router.navigate(['/']);
          }
          else{
            this.http.get('/api/booking/allbookings',{headers}).subscribe((response:any)=>{
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
