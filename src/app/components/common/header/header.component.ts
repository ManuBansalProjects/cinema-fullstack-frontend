import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
// import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  api:string='http://localhost:3000';

  role:any;

  constructor(private service:AppServiceService, private router:Router,private http:HttpClient,private usersService:UsersService){

  }


  ngOnInit(): void {
    this.service.sendingRoleEmitter.subscribe((data)=>{
      this.role=data.role;
      console.log('header role ngoninit emiitter role is', this.role);
    })

    this.service.setRole();    
  }


  logOut(){

    this.usersService.logOutUser().subscribe((response:any)=>{
      console.log(response);

      localStorage.removeItem('token');
      // this.toastr.success(response.message,'message from website',{timeOut:3000});
      this.service.setRole();
      this.router.navigate(['/']); 
    })
    
  }




  profile(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    this.http.get(`${this.api}/auth/gettinguserbytoken`,{headers}).subscribe((response:any)=>{
      this.router.navigate([`/users/profile/${response.result.id}`]);
    })
  }


  
  bookinghistory(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    this.http.get(`${this.api}/auth/gettinguserbytoken`,{headers}).subscribe((response:any)=>{
      this.router.navigate([`/bookings/bookinghistory/user/${response.result.id}`]);
    })
  }
}
