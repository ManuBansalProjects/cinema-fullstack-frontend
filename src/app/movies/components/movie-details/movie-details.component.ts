import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{
  movieid:any;
  movie:any;

  constructor(private activatedRoute: ActivatedRoute, private service:AppServiceService,private router:Router,private http:HttpClient,private moviesService:MoviesService){
    
  }

  ngOnInit(): void {

    this.moviesDetailsRole(); 
    
  }


  moviesDetailsRole(){
    this.movieid=this.activatedRoute.snapshot.params['movieid'];
    
    this.moviesService.getMovie(this.movieid).subscribe((response:any)=>{
      console.log(response);
      this.movie=response.result; 
    })
  }  
}
