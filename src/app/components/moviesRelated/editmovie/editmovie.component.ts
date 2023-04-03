import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent implements OnInit{
  constructor(private service:AppServiceService, private router:Router,private activatedRoute:ActivatedRoute,private toastr:ToastrService,private http:HttpClient){

  }

  form=new FormGroup({
    name: new FormControl('',[Validators.required]),
    releaseddate: new FormControl('',[Validators.required]),
    descrp: new FormControl('',[Validators.required]),
    movieposter: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {

    this.editMovieRole();

  }

  movie:any;

  editMovieRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{
      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          
          if(response.role==1){
            let id=this.activatedRoute.snapshot.params['id'];
            console.log('edit movie id:',id);

            this.service.getMovie(id).subscribe((response:any)=>{
              console.log(response);
              this.movie=response.result;

              this.form=new FormGroup({
                name: new FormControl(this.movie.name,[Validators.required]),
                releaseddate: new FormControl(this.movie.releaseddate,[Validators.required]),
                descrp: new FormControl(this.movie.descrp,[Validators.required]),
                movieposter: new FormControl(this.movie.movieposter,[Validators.required])
              });
            })
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
    console.log(this.form.value);

    if(this.form.invalid){
      this.formInvalid=1;
    }
    else{  
      let movieid=this.activatedRoute.snapshot.params['id'];
      this.editMovie(movieid,this.form.value).subscribe((response:any)=>{
        console.log(response);
        this.toastr.success('movie updated successfully','message from website',{timeOut:3000});
        this.router.navigate(['/movies']);
      })
    }
  }


  
  editMovie(movieid:any, moviedetails:any){
    let token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`/api/movies/editmovie/${movieid}`,moviedetails,{headers:headers});
  }




}
