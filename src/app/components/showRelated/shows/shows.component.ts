import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { ShowdeletepopupComponent } from '../showdeletepopup/showdeletepopup.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit{

  displayedColumns:string[]=[ 'moviename','cinemaname','screen', 'startscreeningdate','endscreeningdate','screeningtime', 'operations'];

  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService,private http:HttpClient){

  }

  shows:any;

  ngOnInit(): void {

    this.showsRole();

  }

  
  showsRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{
      let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
      this.http.get('/api/auth/getrole',{headers}).subscribe((response:any)=>{
        if(response.role==1){
          this.getAllShows().subscribe((response:any)=>{
            this.shows=response.result;
            console.log(this.shows);

            for(let i=0;i<this.shows.length;i++){
              this.service.getCinema(this.shows[i].cinemaid).subscribe((response:any)=>{
                this.shows[i].cinemaname=response.result.name;

                this.service.getMovie(this.shows[i].movieid).subscribe((response:any)=>{
                  this.shows[i].moviename=response.result.name;
                })
              })
              console.log(this.shows[i]);
            }
          })
        }
        else{
          this.router.navigate(['/']);
        }
      })
    }
  }

  
  getAllShows(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.get('/api/shows/getshows',{headers});
  }

  onDelete(showid:any){
    // this.dailogRef.open(ShowdeletepopupComponent);

    // this.service.sendingDeleteShowMessage.subscribe((data:any)=>{

    //   if(data.message=='Yes'){
    //     this.deleteShow(showid).subscribe((response:any)=>{
    //       console.log(response);
    //       if(response.message){
    //         this.toastr.success(response.message,'message from website',{timeOut:3000});
    //       }
    //       else{
    //         this.toastr.error(response.error,'message from website',{timeOut:3000});
    //       }
    //     })
    //   }

    //   this.dailogRef.closeAll();
    //   this.showsRole();
    // })
  }

  deleteShow(showid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`/api/shows/deleteshow/${showid}`,{headers:headers});
  } 

}
