import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';

import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { AgGridCellRendererComponent } from '../ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { CinemasService } from 'src/app/cinemas/services/cinemas.service';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { ShowsService } from '../../services/shows.service';


@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit{


  shows:any;

  colDefs:ColDef[]=[
    {
      headerName:'Movie',
      field:'moviename',
      cellRenderer:AgGridCellRendererComponent,
      cellRendererParams:{
        moviename:'moviename'
      }
    },
    {
      headerName:'Cinema',
      field:'cinemaname',
      cellRenderer: AgGridCellRendererComponent,
      cellRendererParams:{
        cinemaname:'cinemaname'
      }
    },
    // {
    //   headerName:'Screen No.',
    //   field:'screen'
    // },
    // {
    //   headerName:'From',
    //   field:'startscreeningdate'
    // },
    // {
    //   headerName:'To',
    //   field:'endscreeningdate'
    // },
    {
      headerName:'Screening Time',
      field:'screeningtime'
    },
    {
      headerName:'Actions',
      cellRenderer:AgGridCellRendererComponent,
      cellRendererParams:{
        actions:'actions'
      }
    }  
  ]


  defaultColDef:ColDef={
    sortable:true,
    filter:true,
    flex: 1,
    enableRowGroup:true
  }


  currentShowDetails:any;

  onCellClicked(event:any){
    console.log(event);
    this.currentShowDetails=event.data;
  }

  api:string='http://localhost:3000';

  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService,private http:HttpClient,private cinemasService:CinemasService,private moviesService:MoviesService,private showsService:ShowsService){

  }

  

  ngOnInit(): void {

    this.showsRole();

    this.service.sendingShowToDelete.subscribe((data:any)=>{
      this.onDelete(data.showid);
    })
  }

  
  showsRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{
      let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
      this.http.get(`${this.api}/auth/getrole`,{headers}).subscribe((response:any)=>{
        if(response.role==1){
          this.showsService.getAllShows().subscribe((response:any)=>{
            this.shows=response.result;
            console.log(this.shows);

            for(let i=0;i<this.shows.length;i++){
              this.cinemasService.getCinema(this.shows[i].cinemaid).subscribe((response:any)=>{
                this.shows[i].cinemaname=response.result.name;

                this.moviesService.getMovie(this.shows[i].movieid).subscribe((response:any)=>{
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

  
  

  onDelete(showid:any){
  
    this.showsService.deleteShow(showid).subscribe((response:any)=>{
      console.log(response);
      if(response.message){
        this.toastr.success(response.message,'message from website',{timeOut:3000});
      }
      else{
        this.toastr.error(response.error,'message from website',{timeOut:3000});
      }
    })
  
    this.showsRole();
    
  }

  

}
