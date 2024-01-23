import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api:string='http://localhost:3000';
  constructor(private http:HttpClient) { }

  registration(registrationData:any){
    return this.http.post(`${this.api}/auth/registration`,registrationData);
  }

  login(loginData:any){
    return this.http.post(`${this.api}/auth/login`,loginData);
  }

  sendForgotPasswordEmail(form:any){
    return this.http.post(`${this.api}/auth/forgot-password`,form);
  }

  resetPassword(passwordDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set("Authorization",`bearer ${token}`);
    return this.http.post(`${this.api}/auth/reset-password`,passwordDetails,{headers})
  }





  getUsers(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get(`${this.api}/users/all-users`,{headers});
  }

  getUser(id:any){
    console.log(id);
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/users/user/${id}`,{headers});
  }

  updateProfile(userDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set("Authorization",`bearer ${token}`);
    return this.http.put(`${this.api}/users/update-user`,userDetails, {headers})
  }

  deleteUser(id:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`/${this.api}/users/delete/${id}`,{headers});
  }

  logOutUser(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set("Authorization",`bearer ${token}`);
    return this.http.get(`${this.api}/users/logout`,{headers});
  }  

  



  getUserByToken(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/auth/getuserbytoken`,{headers});
  }
 
  sendUpdatePasswordLink(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/auth/sendupdatepasswordlink`,{headers:headers});
  }


  

  
  

   

  
  
}
