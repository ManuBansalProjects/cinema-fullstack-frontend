import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent{

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
