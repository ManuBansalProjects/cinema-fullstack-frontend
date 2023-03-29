import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addnewmovie',
  templateUrl: './addnewmovie.component.html',
  styleUrls: ['./addnewmovie.component.css']
})
export class AddnewmovieComponent implements OnInit{
  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService,private http:HttpClient){

  }

  ngOnInit(): void {
    console.log('add-new-user componenent ngOnInit says');

    this.addNewMovieRole();
  }

  addNewMovieRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{

      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      
      this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          if(response.role!=1){
            this.router.navigate(['/']);
          } 
        }
        else{
          this.router.navigate(['/']);
        }
      }); 
    }
  }

  formInvalid:any;

  onSubmit(form:any){
    console.log(form.value);
    
    if(form.invalid){
      this.formInvalid=1;
    }
    else{
      this.addMovie(form.value).subscribe((response)=>{
        console.log(response);
        this.toastr.success('movie added successfully', 'message from website',{timeOut:3000});
        this.router.navigate(['/movies']);
      })
    }
  }

  addMovie(movieDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.post('/api/movies/addmovie',movieDetails,{headers:headers});
  } 

 

}
