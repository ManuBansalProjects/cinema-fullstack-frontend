import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api:string='http://localhost:3000';
  constructor(private http:HttpClient) { }

  
  getUsers(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get(`${this.api}/auth/getusers`,{headers});
  }

  deleteUser(id:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`/${this.api}/auth/delete/${id}`,{headers});
  }

  getUser(id:any){
    console.log(id);
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get(`${this.api}/auth/getuser/${id}`,{headers});
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

  logOutUser(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set("Authorization",`bearer ${token}`);
    return this.http.get(`${this.api}/auth/logout`,{headers});
  }

  registration(registrationData:any){
    return this.http.post(`${this.api}/auth/registration`,registrationData);
  }

  updateProfile(userDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set("Authorization",`bearer ${token}`);
    return this.http.put(`${this.api}/auth/update`,userDetails, {headers})
  }

  
  login(loginData:any){
    return this.http.post(`${this.api}/auth/login`,loginData);
  }

   //sending forgot password email to user's email
   sendForgotPasswordEmail(form:any){
    return this.http.post(`${this.api}/auth/sendforgotpasswordemail`,form);
  }

  
  changePassword(passwordDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set("Authorization",`bearer ${token}`);
    return this.http.put(`${this.api}/auth/changepassword`,passwordDetails,{headers})
  }
}
