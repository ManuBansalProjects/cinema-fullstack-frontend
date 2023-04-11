import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CinemasService } from 'src/app/cinemas/services/cinemas.service';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ShowsService } from 'src/app/shows/services/shows.service';

@Component({
  selector: 'app-show-booking',
  templateUrl: './show-booking.component.html',
  styleUrls: ['./show-booking.component.css']
})
export class ShowBookingComponent implements OnInit{

  api:string='http://localhost:3000';

  constructor(private activatedRoute:ActivatedRoute, private service:AppServiceService,private router:Router,private http:HttpClient,private toastr:ToastrService,private cinemasService:CinemasService,private moviesService:MoviesService,private showsService:ShowsService){

  }

  
  movieid:any;
  showid:any;
  cinemaid:any;

  movie:any;
  show:any; 
  cinema:any;

  handler:any=null;

  ngOnInit(): void {

    this.sheetBookingRole();

  }


  
  sheetBookingRole(){

    this.loadStripe();

    this.activatedRoute.params.subscribe((params)=>{
      this.movieid=params['movieid'];
      this.showid=params['showid'];        
      this.cinemaid=params['cinemaid'];
    })
    
    this.moviesService.getMovie(this.movieid).subscribe((response:any)=>{
      this.movie=response.result;
        
      this.showsService.getShow(this.showid).subscribe((response:any)=>{
        this.show=response.show;      console.log(this.show);

        this.cinemasService.getCinema(this.cinemaid).subscribe((response:any)=>{ 
          this.cinema=response.result;     console.log(this.cinema);
        })
      })
    })

  }


  
  sheetrows:any[]=[0,1,2,3,4,5,6,7,8,9];
  sheetcolumns:any[]=[1,2,3,4,5,6,7,8,9,10,11,12];
  tickets:any[]=[];
  stripeToken:any;

  onSubmit(form:any){

    const token=localStorage.getItem('token');    
    if(token==null){
      this.toastr.error('Please login first','message from website',{timeOut:3000});
      this.router.navigate(['/login']);
    }

    let headers:any=new HttpHeaders().set("Authorization",`bearer ${token}`); 

    this.http.get(`${this.api}/auth/getrole`,{headers}).subscribe( (response:any)=>{
      if(response.role!=null){
            
        console.log(form.value);    
        console.log(this.tickets);
        // this.pay(100*this.ticketCount)
        this.sendBookedTickets('manu8094996105@gmail.com',100*this.ticketCount,this.tickets, this.movieid,this.cinemaid,this.showid).subscribe((response:any)=>{
          
          if(response.error){
            this.toastr.error(response.error,'message from website', {timeOut:3000});
          }
          else{
            this.toastr.success(response.message,'message from website', {timeOut:6000});
            this.router.navigate(['/']);
          }

        })

      }
      else{
        this.toastr.error('Please login first','message from website',{timeOut:3000});
        this.router.navigate(['/login']);
      }
    }); 

    
  }

  sendBookedTickets(email:any,amount:any,tickets:any,movieid:any,cinemaid:any,showid:any){
    console.log('service sending boking tickets');
    
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);


    const bookingDetails={
      email:email,
      amount:amount,
      tickets:tickets,
      movieid:movieid,
      cinemaid:cinemaid,
      showid:showid
    }
    console.log('booking service ',bookingDetails);
    return this.http.post(`${this.api}/booking/booktickets/${email}`,bookingDetails,{headers:headers});
  }



  //stripe integration
  pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MeyA0SEkLm9QFTeKFj2pF7YML9x1TOQ5MlAkQLMjyWAiLNjcIj0M82v7vWIFCHppb6to0n01tudHYqFH5j5QkER00lAg2Y8BJ',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!'); 
      },
    });

    
 
    handler.open({
      name: 'Doing payment using stripe',
      description: 'Booking tickets for BookMyShow',
      amount: amount * 100
    });
 
  }


  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MeyA0SEkLm9QFTeKFj2pF7YML9x1TOQ5MlAkQLMjyWAiLNjcIj0M82v7vWIFCHppb6to0n01tudHYqFH5j5QkER00lAg2Y8BJ',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }

  }
  //stripe integration ends

 



  ticketCount=0;
  isDisable=1;

  onClick(event:any,ticketNum:any){

    console.log(event.value); 

    if(event.value==true){ 
      this.ticketCount++;
      this.tickets.push(ticketNum);
    }
    else{
      this.ticketCount--;
      let index=this.tickets.indexOf(ticketNum);
      this.tickets.splice(index,1);
    }

    console.log(this.ticketCount);
    console.log(this.tickets);

    if(this.ticketCount<1 || this.ticketCount>5){
      this.isDisable=1;
    }
    else{
      this.isDisable=0;
    }

  }

}
