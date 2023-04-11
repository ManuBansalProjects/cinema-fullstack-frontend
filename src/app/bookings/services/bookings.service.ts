import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  api:string='http://localhost:3000';

  constructor(private http:HttpClient) { }


  allBookingHistory(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/booking/allbookings`,{headers})
  }

  getBookingHistory(userid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/booking/getbookinghistory/${userid}`,{headers:headers});
  }

}
