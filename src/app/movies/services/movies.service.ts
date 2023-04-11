import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  api:string='http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovie(movieid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/movies/getmovie/${movieid}`,{headers});
  }
  getMovies(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get(`${this.api}/movies/getmovies`,{headers});
  }

  getShows(movieid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/shows/getshows/${movieid}`,{headers});
  }

  
  deleteMovie(movieid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`${this.api}/movies/deletemovie/${movieid}`,{headers:headers});
  }

  
  editMovie(movieid:any, moviedetails:any){
    let token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`${this.api}/movies/editmovie/${movieid}`,moviedetails,{headers:headers});
  }
  addMovie(movieDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.post(`${this.api}/movies/addmovie`,movieDetails,{headers:headers});
  } 
}
