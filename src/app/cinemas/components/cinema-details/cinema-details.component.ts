import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CinemasService } from '../../services/cinemas.service';
import { MoviesService } from 'src/app/movies/services/movies.service';

import { Cinema } from '../../interfaces/location';

@Component({
  selector: 'app-cinema-details',
  templateUrl: './cinema-details.component.html',
  styleUrls: ['./cinema-details.component.css']
})
export class CinemaDetailsComponent implements OnInit{

  api:string='http://localhost:3000';

  constructor(private activatedRoute:ActivatedRoute, private service:AppServiceService,private router:Router,private http:HttpClient,private cinemasService:CinemasService,private moviesService:MoviesService){

  }

  cinema={} as Cinema;
  shows:any;

  ngOnInit(): void {

    this.cinemaDetailsRole();
    
  }

  cinemaDetailsRole(): void{

    const cinemaid:number=this.activatedRoute.snapshot.params['cinemaid'];

    this.cinemasService.getCinema(cinemaid).subscribe((response:any)=>{
      this.cinema=response.result;
      console.log(this.cinema);

      this.cinemasService.getShowsByCinemaid(cinemaid).subscribe((response:any)=>{
        this.shows=response.result;

        for(let i=0;i<this.shows.length;i++){
          this.moviesService.getMovie(this.shows[i].movieid).subscribe((response:any)=>{
            this.shows[i].moviename=response.result.name;
            this.shows[i].moviereleaseddate=response.result.releaseddate;
            this.shows[i].moviedescrp=response.result.descrp;
          })
          console.log(this.shows[i]);
        }
      })
    })

  }



}
