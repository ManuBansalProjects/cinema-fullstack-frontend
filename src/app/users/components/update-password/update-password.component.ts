import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  api:string='http://localhost:3000';
  
  constructor(private service :AppServiceService,private toastr:ToastrService,private router:Router){

  }

  sendEmail(){
    this.service.sendUpdatePasswordLink().subscribe((response:any)=>{
      console.log(response);
      if(response.message){
        this.toastr.success(response.message,'message from website',{timeOut:3000});

        this.service.logOutUser().subscribe((response:any)=>{
          localStorage.removeItem('token');
          this.service.setRole();

          this.router.navigate(['/']);
        })
        
      }
    })
  }
}
