import { Component,OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit{

  api:string='http://localhost:3000';

  constructor(private service:AppServiceService, private router:Router,private activatedRoute:ActivatedRoute,private toastr:ToastrService,private http:HttpClient,private datepipe:DatePipe){

  }

  movieForm=new FormGroup({
    name: new FormControl('',[Validators.required]),
    releaseddate: new FormControl('',[Validators.required]),
    descrption: new FormControl('',[Validators.required]),
    movieposter: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    this.setForm();
  }

  movie:any;

  setForm(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{

        let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
        this.http.get(`${this.api}/auth/getrole`,{headers}).subscribe( (response:any)=>{
          if(response.role!=null){
            
            if(response.role==1){
              let movieid=this.activatedRoute.snapshot.params['movieid'];
              console.log('edit movie id:',movieid);

              if(movieid){
                this.service.getMovie(movieid).subscribe((response:any)=>{
                  console.log(response);
                  this.movie=response.result;

                  this.movie.releaseddate=this.datepipe.transform(this.movie.releaseddate, 'yyyy-MM-dd');
                  console.log(this.movie.releaseddate);

                  this.movieForm=new FormGroup({
                    name: new FormControl(this.movie.name,[Validators.required]),
                    releaseddate: new FormControl( this.movie.releaseddate ,[Validators.required]),
                    descrption: new FormControl(this.movie.descrption,[Validators.required]),
                    movieposter: new FormControl(this.movie.movieposter,[Validators.required])
                  });
                })
              }

            }
            else{
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

  onSubmit(){
    console.log(this.movieForm.value);
    if(this.movieForm.invalid){
      this.formInvalid=1;
    }
    else{  
      let movieid=this.activatedRoute.snapshot.params['movieid'];
      if(movieid){
        this.editMovie(movieid,this.movieForm.value).subscribe((response:any)=>{
          console.log(response);
          this.toastr.success(response.message,'',{timeOut:3000});
          this.router.navigate(['/movies']);
        })
      }
      else{
        this.addMovie(this.movieForm.value).subscribe((response:any)=>{
          console.log(response);
          this.toastr.success(response.message, 'message from website',{timeOut:3000});
          this.router.navigate(['/movies']);
        })   
      }
    }
  }


  
  editMovie(movieid:any, moviedetails:any){
    let token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`${this.api}/movies/editmovie/${movieid}`,moviedetails,{headers:headers});
  }
  addMovie(movieDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.post(`${this.api}/movies/addmovie`,movieDetails,{headers:headers});
  } 




}