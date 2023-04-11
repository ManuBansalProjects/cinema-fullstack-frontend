import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  api:string='http://localhost:3000';

  form:any=new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)])
  });

  constructor(private service:AppServiceService,private activatedroute:ActivatedRoute,private http:HttpClient,private toastr:ToastrService,private usersService:UsersService){

  }

  user:any;

  ngOnInit(): void {
    
    this.fun();
  }

  fun=()=>{
    let userid=this.activatedroute.snapshot.params['userid'];
    this.usersService.getUser(userid).subscribe((response:any)=>{
      console.log(response);
      this.user=response.result;
      
      this.form=new FormGroup({
        name: new FormControl(this.user.name,[Validators.required,Validators.minLength(3)])
      });

    })
  }


  
  formInvalid:any;

  onSubmit(){
    console.log(this.form.value);
    if(this.form.invalid){
      this.formInvalid=1;
    }
    else{
      const token=localStorage.getItem('token');
      let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
      this.usersService.updateProfile(this.form.value).subscribe((response:any)=>{
        console.log(response);

        if(response.message!=undefined){
          this.toastr.success(response.message,'message from websiite',{timeOut:3000});
          this.fun();
        }
      })
    }
  }
}

