import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  api:string='http://localhost:3000';

  constructor(private http:HttpClient,private activatedRoute:ActivatedRoute,private router:Router,private toastr:ToastrService,private usersService:UsersService){

  }

  ngOnInit(): void {
    const token=this.activatedRoute.snapshot.params['token'];
    
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);

    this.http.post(`${this.api}/auth/check-jwt-for-password-change`,{headers}).subscribe((response:any)=>{
      console.log(response);
      if(response.error){
        this.toastr.error(response.error.message,'',{timeOut:3000});
        this.router.navigate(['/login']);
      }
    })
  }

  formInvalid:any;

  onSubmit(form:any){
    if(form.invalid){
      this.formInvalid=1;
    }
    else if(form.value.password==form.value.confirmpassword){
      const token=this.activatedRoute.snapshot.params['token'];
      let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);

      this.usersService.resetPassword(form.value).subscribe((response:any)=>{
        console.log(response);

        if(response.message){
          this.toastr.success(response.message,'',{timeOut:3000});
        }
        else{
          this.toastr.error(response.error.message,'',{timeOut:3000});
        }
        this.router.navigate(['/login']);
      })
    }
  }





  
}

