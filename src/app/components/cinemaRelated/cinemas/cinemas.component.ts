import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
// import { MatDialog } from '@angular/material/dialog';
import { CinemadeletepopupComponent } from '../cinemadeletepopup/cinemadeletepopup.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit{

  // displayedColumns:string[]=[ 'name', 'address','contactnumber' ,'website', 'screens', 'showsavailabilitytime','operations'];

  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService,private http:HttpClient){

  }


  cinemasList:any[]=[];
  role:any;

  ngOnInit(): void {

    console.log('cinemas componenent ngOnInit says');

    this.cinemasRole();    
  }

  
  cinemasRole(){

    this.service.getCinemas().subscribe((response:any)=>{
      console.log('cinemas component', response);
      if(response.error!=null){
        this.router.navigate(['/']);
      }
      else{
        this.cinemasList=response.result;
        console.log(this.cinemasList);
            
        const token=localStorage.getItem('token');
        if(token!=null){
          let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
          this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
            if(response.role!=null){
              this.role=response.role; 
            }
          }); 
        }
      }
    })

  }

 


  

  

  onDelete(id:any){
    // this.dialogRef.open(CinemadeletepopupComponent);

    // this.service.sendingDeleteCinemaMessage.subscribe((response)=>{
    //   if(response.message=='Yes'){
    //     this.deleteCinema(id).subscribe((response:any)=>{
    //       console.log(response.message);
    //       this.dialogRef.closeAll();
    //       this.toastr.success('cinema successfully deleted','message from website', {timeOut:3000});
    //       this.cinemasRole();
    //     })
    //   }
    //   else{
    //     this.dialogRef.closeAll();
    //   }
    // })
  }

  
  deleteCinema(id:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`/api/cinemas/delete/${id}`, {headers});
  }




}
