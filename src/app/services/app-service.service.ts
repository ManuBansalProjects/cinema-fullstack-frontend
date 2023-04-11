import { EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService{

  api:string='http://localhost:3000';
  role:number=3;
  
  constructor(private http: HttpClient) { 

  }


  //just for testing purpose
  getData(){
    return this.http.get(`${this.api}/getData`);
  }


  setRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.role=-1;
      this.emitRole();
    }
    else{
      let headers:any=new HttpHeaders().set("Authorization",`bearer ${token}`); 
      this.http.get(`${this.api}/auth/getrole`,{headers}).subscribe( (response:any)=>{
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
