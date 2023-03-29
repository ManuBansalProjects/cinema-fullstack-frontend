import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
// import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { AggridcellcinemaComponent } from '../aggridcellcinema/aggridcellcinema.component';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit{

  rowData:any;

  colDefs:ColDef[]=[
    {
      headerName: 'Name',
      field: 'name',
      width: 130,
      cellRenderer:AggridcellcinemaComponent,
      cellRendererParams:{
        cinemaname:'cinemaname'
      }
    },
    {
      headerName: 'Address',
      field: 'address',
      width:150
    },
    {
      headerName: 'Contact',
      field: 'contactnumber',
      width:130
    },
    {
      headerName: 'Website',
      field: 'website',
      cellRenderer: AggridcellcinemaComponent,
      cellRendererParams:{
        website:'website'
      }
    },
    {
      headerName: 'Screens',
      field: 'screens',
      width:130
    },
    {
      headerName: 'Shows Availability Time',
      field: 'showsavailabilitytime'
    },
    {
      headerName: 'Actions',
      width:170,
      cellRenderer:AggridcellcinemaComponent,
      cellRendererParams:{
        actions:'actions'
      }
    }
  ]


  defaultColDef:ColDef={
    sortable:true,
    filter:true,
    enableRowGroup:true
  }


  currentCinemaDetails:any;

  onCellClicked(event:any){
    console.log(event);
    this.currentCinemaDetails=event.data;
  }

  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService,private http:HttpClient){

  }


  cinemasList:any[]=[];
  role:any;

  ngOnInit(): void {

    console.log('cinemas componenent ngOnInit says');

    this.cinemasRole();    


    this.service.sendingCinemaToDelete.subscribe((data)=>{
      this.onDelete(data.cinemaid);
    })
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

        this.rowData=response.result;
            
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

 


  

  

  onDelete(cinemaid:any){  
  
    this.deleteCinema(cinemaid).subscribe((response:any)=>{
      console.log(response.message);
      this.toastr.success('cinema successfully deleted','message from website', {timeOut:3000});
      this.cinemasRole();
    })      
    
  }

  
  deleteCinema(id:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`/api/cinemas/delete/${id}`, {headers});
  }




}
