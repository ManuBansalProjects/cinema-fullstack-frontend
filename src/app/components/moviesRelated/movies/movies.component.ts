import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MoviedeletepopupComponent } from '../moviedeletepopup/moviedeletepopup.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  displayedColumns:string[]=['movieposter', 'name', 'releaseddate','descrp','operations'];

  constructor(private service:AppServiceService,private router:Router,private dialogRef:MatDialog,private toastr:ToastrService,private http:HttpClient){

  }


  moviesList:any[]=[];
  role:any;

  ngOnInit(): void {
    console.log('movies componenent ngOnInit says');
  
    this.moviesRole();  
  }

  moviesRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{
      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          this.role=response.role;
          this.service.getMovies().subscribe((response:any)=>{
            this.moviesList=response.moviesList;
          })
        }
        else{
          this.router.navigate(['/']);
        }
      }); 
    }
  }


  

  



  onDelete(id:any){
    this.dialogRef.open(MoviedeletepopupComponent);

    this.service.sendingDeleteMovieMessage.subscribe((data)=>{
      if(data.message=='No'){
        this.dialogRef.closeAll();
      }
      else{
        this.deleteMovie(id).subscribe((response)=>{
          console.log(response);
          this.dialogRef.closeAll();
          this.toastr.success('movie deleted successfully','message from website',{timeOut:3000});
          this.moviesRole();
          
        })
      }
    })
  }

  deleteMovie(movieid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`/api/movies/deletemovie/${movieid}`,{headers:headers});
  }


  

 





}
