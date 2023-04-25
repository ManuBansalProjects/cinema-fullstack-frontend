import { Component,OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
// import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit{

  api:string='http://localhost:3000';

  constructor(private service:AppServiceService, private router:Router,private activatedRoute:ActivatedRoute,private http:HttpClient,private datepipe:DatePipe,private moviesService:MoviesService){

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
  movieid:any;

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
              this.movieid=this.activatedRoute.snapshot.params['movieid'];
              

              if(this.movieid){
                console.log('edit movie id:',this.movieid);
                
                this.moviesService.getMovie(this.movieid).subscribe((response:any)=>{
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
        this.moviesService.editMovie(movieid,this.movieForm.value).subscribe((response:any)=>{
          console.log(response);
          // this.toastr.success(response.message,'',{timeOut:3000});
          this.router.navigate(['/movies']);
        })
      }
      else{
        this.moviesService.addMovie(this.movieForm.value).subscribe((response:any)=>{
          console.log(response);
          // this.toastr.success(response.message, 'message from website',{timeOut:3000});
          this.router.navigate(['/movies']);
        })   
      }
    }
  }


  
  url:any;

  image:any;
  multipleImages:any;

  onChange(event:any){
    if(event.target.files){
      let reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }

      // this.image=event.target.files[0];      
      // const formData=new FormData();
      // formData.append('file', this.image); 
      // this.http.post('http://localhost:3000/file',formData).subscribe((response:any)=>{
      //   console.log(response);
      // })

      this.multipleImages=event.target.files;
      const formData=new FormData();
      for(let image of this.multipleImages){
        formData.append('files', image);
      }
       this.http.post('http://localhost:3000/multiple-file',formData).subscribe((response:any)=>{
        console.log(response);
      })

    }
  }



}