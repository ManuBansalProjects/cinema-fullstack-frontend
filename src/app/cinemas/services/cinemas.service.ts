import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CinemasService {

  api:string='http://localhost:3000';

  constructor(private http:HttpClient) { }

  getCinemas(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get(`${this.api}/cinemas/getcinemas`,{headers});
  }

  getCinema(cinemaid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/cinemas/getcinema/${cinemaid}`,{headers});
  }

  getCinemaByName(cinemaname:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/cinemas/getcinemabyname/${cinemaname}`,{headers});
  }

  
  getShowsByCinemaid(cinemaid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/shows/getshowsbycinemaid/${cinemaid}`,{headers});
  }

  deleteCinema(id:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`${this.api}/cinemas/delete/${id}`, {headers});
  }

  changeCinemaStatus(cinemaid:any, status:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`${this.api}/cinemas/changecinemastatus/${cinemaid}`,{status},{headers});
  }

  getStatesAndCities(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/cinemas/get-states-and-cities`,{headers});
  }

  addCinema(cinemaDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.post(`${this.api}/cinemas/addcinema`,cinemaDetails, {headers:headers});
  }
  editCinema(cinemaid:any,cinemaDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`${this.api}/cinemas/editcinema/${cinemaid}`,cinemaDetails,{headers:headers});
  }

  deleteScreen(screenid:number){
    console.log('cinemas service deleting ',screenid);
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`${this.api}/cinemas/delete-screen/${screenid}`,{headers:headers});
  }
}
