import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit{
  constructor(private http:HttpClient,private activatedRoute:ActivatedRoute,private router:Router,private toastr:ToastrService){

  }

  ngOnInit(): void {
    const token=this.activatedRoute.snapshot.params['token'];
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);

    this.http.get('/api/auth/checkjwtforpasswordchange',{headers}).subscribe((response:any)=>{
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

      this.http.put('/api/auth/changepassword',form.value,{headers}).subscribe((response:any)=>{
        console.log(response);

        if(response.message){
          this.toastr.success(response.message,'',{timeOut:3000});
          this.router.navigate(['/login']);
        }
        else{
          this.toastr.error(response.error.message,'',{timeOut:3000});
          this.router.navigate(['/login']);
        }
      })
    }
  }





  onChange(event:any){
    console.log(event);
  }
}
