import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemasService } from 'src/app/cinemas/services/cinemas.service';
import { AppServiceService } from 'src/app/services/app-service.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-select-cinema',
  templateUrl: './select-cinema.component.html',
  styleUrls: ['./select-cinema.component.css']
})
export class SelectCinemaComponent implements OnInit{
  api:string='http://localhost:3000';

  constructor(private activatedRoute: ActivatedRoute,private service:AppServiceService,private router:Router,private http:HttpClient,private cinemasService:CinemasService,private moviesService:MoviesService){

  }


  movieid:any;
  movie:any;
  shows:any;


  ngOnInit(): void {

    this.selectCinemaRole();

  }

  
  selectCinemaRole(){
    
    this.movieid=this.activatedRoute.snapshot.params['movieid'];

    this.moviesService.getMovie(this.movieid).subscribe((response:any)=>{
      this.movie=response.result;

      this.moviesService.getShows(this.movieid).subscribe((response:any)=>{
        this.shows=response.shows;
        console.log('displaying shows \n', this.shows);

        for(let i=0;i<this.shows.length;i++){
          this.cinemasService.getCinema(this.shows[i].cinemaid).subscribe((response:any)=>{
            this.shows[i].cinemaname=response.result.name;
            this.shows[i].cinemaaddress=response.result.address;
            this.shows[i].cinemacity=response.result.city;
            this.shows[i].cinemaid=response.result.id;
          })
        }
      })
    })

  }

  

}
