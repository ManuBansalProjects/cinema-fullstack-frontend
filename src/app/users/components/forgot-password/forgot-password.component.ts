import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  api:string='http://localhost:3000';

  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService,private http:HttpClient){

  }

  formInvalid:any;

  onSubmit(form:any){
    console.log(form.value);

    if(form.invalid){
      this.formInvalid=1;
    }
    else{

      this.sendForgotPasswordEmail(form.value).subscribe((response:any)=>{
        console.log(response);

        if(response.message!=null){
          this.toastr.success(response.message,'message from website',{timeOut:4000});
          this.router.navigate(['/login']);
        }
        else{
          this.toastr.error(response.error,'message from website',{timeOut:4000});
          this.router.navigate(['/registration']);
        }
      })

    }
  }

  
  //sending forgot password email to user's email
  sendForgotPasswordEmail(form:any){
    return this.http.post(`${this.api}/auth/sendforgotpasswordemail`,form);
  }
}
