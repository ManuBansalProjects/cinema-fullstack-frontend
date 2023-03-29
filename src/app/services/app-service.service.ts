import { EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


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

  
  





  sendingRecordDataToPopup=new EventEmitter<{record:any}>();
  emitRecordDataToPopup(record:any){
    console.log('popup service', record);
    this.sendingRecordDataToPopup.emit({record:record}); 
  }



  sendingMovieToDelete=new EventEmitter<{movieid:any}>();
  emitMovieToDelete(movieid:any){
    this.sendingMovieToDelete.emit({movieid:movieid});
  }

  sendingCinemaToDelete=new EventEmitter<{cinemaid:any}>();
  emitCinemaToDelete(cinemaid:any){
    this.sendingCinemaToDelete.emit({cinemaid:cinemaid});
  }
  
  sendingShowToDelete=new EventEmitter<{showid:any}>();
  emitShowToDelete(showid:any){
    console.log('show delete service');
    this.sendingShowToDelete.emit({showid:showid});
  }

  sendingUserToDelete=new EventEmitter<{userid:any}>();
  emitUserToDelete(userid:any){
    this.sendingUserToDelete.emit({userid:userid});
  }
}
