import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role:any;

  constructor(private service:AppServiceService, private router:Router,private toastr:ToastrService,private http:HttpClient){

  }


  ngOnInit(): void {

    console.log('navbar ngOnInit says');

    this.service.sendingRoleEmitter.subscribe((data)=>{
      this.role=data.role;
      console.log('navbar componenent ngOnInit emitter says-> ', this.role);
    })

    this.service.setRole();    
  }


  logOut(){

    this.logOutUser().subscribe((response:any)=>{
      console.log(response);

      localStorage.removeItem('token');
      this.toastr.success('logged Out sucessfully','message from website',{timeOut:3000});
      this.service.setRole();
      this.router.navigate(['/']); 
    })
    
  }


  logOutUser(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set("Authorization",`bearer ${token}`);
    return this.http.get('/api/auth/logout',{headers});
  }


}
