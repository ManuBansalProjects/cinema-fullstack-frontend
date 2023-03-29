import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit{

  displayedColumns:string[]=['id', 'userid', 'movieid', 'cinemaid', 'showid', 'seatnumber'];

  constructor(private service:AppServiceService,private router:Router,private activatedRoute:ActivatedRoute,private toastr:ToastrService,private http:HttpClient){

  }

  role:string='';
  user:any;
  bookings:any;

  ngOnInit(): void {

    this.bookingHistoryRole();

  }

  
  bookingHistoryRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{

      let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);

      this.http.get('/api/auth/getrole',{headers}).subscribe((response:any)=>{
        if(response.role!=null){  
            
          const userid=this.activatedRoute.snapshot.params['userid'];

          this.service.getBookingHistory(userid).subscribe((response:any)=>{
            if(response.error){
              this.toastr.error(response.error,'message from website',{timeOut:3000});
              this.router.navigate(['/']);
            }
            else{
              this.bookings=response.result;
              console.log(this.bookings);

              this.service.getUser(userid).subscribe((response:any)=>{
                this.user=response.result;
                if(this.user.role==true)
                  this.role='admin';
                else 
                  this.role='user';
                  
                console.log(this.user);
              })
            }
          })

        }
        else{
          this.router.navigate(['/']);
        }
      })
    }
  }
}
