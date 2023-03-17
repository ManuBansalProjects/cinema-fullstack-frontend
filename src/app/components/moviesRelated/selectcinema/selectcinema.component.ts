import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-selectcinema',
  templateUrl: './selectcinema.component.html',
  styleUrls: ['./selectcinema.component.css']
})
export class SelectcinemaComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute,private service:AppServiceService,private router:Router,private http:HttpClient){

  }


  movieid:any;
  movie:any;
  shows:any;


  ngOnInit(): void {

    this.selectCinemaRole();

  }

  
  selectCinemaRole(){
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
            this.movie=response.result;

            this.getShows(this.movieid).subscribe((response:any)=>{
              this.shows=response.shows;
              console.log('displaying shows \n', this.shows);

              for(let i=0;i<this.shows.length;i++){
                this.service.getCinema(this.shows[i].cinemaid).subscribe((response:any)=>{
                  this.shows[i].cinemaname=response.result.name;
                  this.shows[i].cinemaaddress=response.result.address;
                  this.shows[i].cinemacity=response.result.city;
                  this.shows[i].cinemaid=response.result.id;
                })
              }
            })
          })

        }
        else{
          this.router.navigate(['/']);
        }
      }); 
    }
  }

  getShows(movieid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`/api/shows/getshows/${movieid}`,{headers});
  }

  
}
