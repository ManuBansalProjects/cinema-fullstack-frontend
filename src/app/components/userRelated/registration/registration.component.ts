import { Component , OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/services/app-service.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  constructor(private service: AppServiceService,private router:Router,private toastr:ToastrService, private http:HttpClient){ 

  }
  
  ngOnInit(): void {
    
  }

  registerform=new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$")])
  });


  onSubmit(){

    //calling service to register the user
    this.registration(this.registerform.value).subscribe((response:any)=>{
      console.log(response);

      if(response.message!=null){
        this.toastr.success(response.message,'message from website',{timeOut:3000});
        // this.registerform.reset();
      }
      else{
        this.toastr.error(response.error,'message from website',{timeOut:3000});
      }
      this.router.navigate(['/login']);
    });

 }

 registration(registrationData:any){
  return this.http.post('/api/auth/registration',registrationData);
}

}
