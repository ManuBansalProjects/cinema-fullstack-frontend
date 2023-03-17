import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';


@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit{

  movieid:any;
  movie:any;

  constructor(private activatedRoute: ActivatedRoute, private service:AppServiceService,private router:Router,private http:HttpClient){
    
  }

  ngOnInit(): void {

    this.moviesDetailsRole(); 
    
  }


  moviesDetailsRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{
      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          this.movieid=this.activatedRoute.snapshot.params['movieid'];
          
          this.service.getMovie(this.movieid).subscribe((response:any)=>{
            console.log(response);
            this.movie=response.result; 
          })
        }
        else{
          this.router.navigate(['/']);
        }
      }); 
    }
  }


  


}
