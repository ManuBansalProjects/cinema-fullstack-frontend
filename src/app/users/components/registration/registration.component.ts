import { Component , OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/services/app-service.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  api:string='http://localhost:3000';

  constructor(private service: AppServiceService,private router:Router,private toastr:ToastrService, private http:HttpClient,private usersService:UsersService){ 

  }
  
  ngOnInit(): void {
    
  }

  registerform=new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$")]),
    confirmpassword: new FormControl('',[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$")])
  });

  registerFormInvalid:any;

  
  onSubmit(){

    if(this.registerform.invalid){
      this.registerFormInvalid=1;
    }
    else if(this.registerform.value.password==this.registerform.value.confirmpassword){    

      const obj={
        name:this.registerform.value.name,
        email:this.registerform.value.email,
        password:this.registerform.value.password,
      }

      this.usersService.registration(obj).subscribe((response:any)=>{
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

 }

 

}

