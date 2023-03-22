import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cinemadetails',
  templateUrl: './cinemadetails.component.html',
  styleUrls: ['./cinemadetails.component.css']
})
export class CinemadetailsComponent implements OnInit{
  constructor(private activatedRoute:ActivatedRoute, private service:AppServiceService,private router:Router,private http:HttpClient){

  }

  cinema:any;
  shows:any;

  ngOnInit(): void {
    let role;
  
    this.cinemaDetailsRole();
  }

  cinemaDetailsRole(){

    const cinemaid:any=this.activatedRoute.snapshot.params['cinemaid'];

    this.service.getCinema(cinemaid).subscribe((response:any)=>{
      this.cinema=response.result;

      this.getShowsByCinemaid(cinemaid).subscribe((response:any)=>{
        this.shows=response.result;

        for(let i=0;i<this.shows.length;i++){
          this.service.getMovie(this.shows[i].movieid).subscribe((response:any)=>{
            this.shows[i].moviename=response.result.name;
            this.shows[i].moviereleaseddate=response.result.releaseddate;
            this.shows[i].moviedescrp=response.result.descrp;
          })
          console.log(this.shows[i]);
        }
      })
    })

  }


  getShowsByCinemaid(cinemaid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`/api/shows/getshowsbycinemaid/${cinemaid}`,{headers});
  }

}
