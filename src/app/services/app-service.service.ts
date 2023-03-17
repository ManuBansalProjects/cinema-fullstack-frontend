import { EventEmitter, Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService{

  role:number=3;
  
  constructor(private http: HttpClient) { 

  }



  setRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.role=-1;
      this.emitRole();
    }
    else{
      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          this.role=response.role;
          this.emitRole();
        }
        else{
          this.role=-1;
          this.emitRole();
        }
      }); 
    }
  }

  sendingRoleEmitter=new EventEmitter<{role:number}>();
  emitRole(){
    this.sendingRoleEmitter.emit({role:this.role});
  }






  

  //just for testing purpose
  getData(){
    return this.http.get('/api/getData');
  }



  
  //movie
  getMovie(movieid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`/api/movies/getmovie/${movieid}`,{headers});
  }
  getMovies(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get('/api/movies/getmovies',{headers});
  }

 



  //cinema
  getCinema(cinemaid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`/api/cinemas/getcinema/${cinemaid}`,{headers});
  }
  getCinemaByName(cinemaname:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`/api/cinemas/getcinemabyname/${cinemaname}`,{headers});
  }
  getCinemas(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get('/api/cinemas/getcinemas',{headers});
  }

 





  //user
  getUser(id:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`/api/auth/getuser/${id}`,{headers});
  }
  getUserByToken(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get('/api/auth/getuserbytoken',{headers});
  }


  

  
  //show
  getShows(movieid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`/api/shows/getshows/${movieid}`,{headers});
  }
  getShowsByCinemaid(cinemaid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`/api/shows/getshowsbycinemaid/${cinemaid}`,{headers});
  }
  getShow(showid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get(`/api/shows/getshow/${showid}`,{headers});
  }

 

 

  //booking
  getBookingHistory(userid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`/api/booking/getbookinghistory/${userid}`,{headers:headers});
  }

  
  




  //delete event emitter
  sendingDeleteMessage=new EventEmitter<{message:any}>();
  emitDeleteMessage(message:any){
    this.sendingDeleteMessage.emit({message:message});
  }

  sendingDeleteCinemaMessage=new EventEmitter<{message:any}>();
  emitDeleteCinemaMessage(message:any){
    this.sendingDeleteCinemaMessage.emit({message:message});
  }

  sendingDeleteMovieMessage=new EventEmitter<{message:any}>();
  emitDeleteMovieMessage(message:any){
    this.sendingDeleteMovieMessage.emit({message:message});
  }

  sendingDeleteShowMessage=new EventEmitter<{message:any}>();
  emitDeleteShowMessage(message:any){
    this.sendingDeleteShowMessage.emit({message:message});
  }

}
