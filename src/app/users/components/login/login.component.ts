import { Component } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  api:string='http://localhost:3000';

  constructor(private service:AppServiceService, private router:Router,private http:HttpClient,private usersService:UsersService){
    
  }

  loginFormInvalid:any;

  onSubmit(loginform:any){
    
    if(loginform.invalid){
      this.loginFormInvalid=1;
    }
    else{
      this.usersService.login(loginform.value).subscribe((response:any)=>{
        console.log(response);
        if(response.login!=null){
          localStorage.setItem("token", response.token);  
          // this.toastr.success('logged-In successfully','message from website',{timeOut:3000});
          this.router.navigate(['/']);
        }     
        else{
          // this.toastr.error(response.error,'message from website',{timeOut:3000});
        } 
      });
    }

  }


  

}
