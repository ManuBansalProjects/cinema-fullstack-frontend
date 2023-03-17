import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private service:AppServiceService, private router:Router,private toastr:ToastrService,private http:HttpClient){
    
  }

  onSubmit(loginform:any){
    
    this.login(loginform.value).subscribe((response:any)=>{
      console.log(response);
      if(response.login!=null){
        localStorage.setItem("token", response.token);  
        this.toastr.success('logged-In successfully','message from website',{timeOut:3000});
        this.router.navigate(['/']);
      }     
      else{
        this.toastr.error(response.error,'message from website',{timeOut:3000});
      } 
    });

  }


  
  login(loginData:any){
    return this.http.post('/api/auth/login',loginData);
  }

}
