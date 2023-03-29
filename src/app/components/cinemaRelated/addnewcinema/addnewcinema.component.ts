import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addnewcinema',
  templateUrl: './addnewcinema.component.html',
  styleUrls: ['./addnewcinema.component.css']
})
export class AddnewcinemaComponent implements OnInit{
  constructor(private router:Router, private service:AppServiceService,private toastr:ToastrService,private http:HttpClient){

  }

  
  ngOnInit(): void {
    console.log('add-new-user componenent ngOnInit says');
   
    this.addNewCinemaRole();
  }

  
  addNewCinemaRole(){
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
      this.addCinema(form.value).subscribe((response:any)=>{
        console.log(response);
        this.toastr.success('cinema added successfully ','message from website', {timeOut:3000});
        this.router.navigate(['/cinemas']);
      })
    }
  }


  addCinema(cinemaDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.post('/api/cinemas/addcinema',cinemaDetails, {headers:headers});
  }


}
