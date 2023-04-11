import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  api:string='http://localhost:3000';

  constructor(private http:HttpClient) { }

  getAllShows(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/shows/getshows`,{headers});
  }

  getShow(showid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get(`${this.api}/shows/getshow/${showid}`,{headers});
  }

  deleteShow(showid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`${this.api}/shows/deleteshow/${showid}`,{headers:headers});
  } 
}
