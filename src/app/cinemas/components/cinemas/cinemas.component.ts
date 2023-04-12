import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { CellClickedEvent, ColDef, GridOptionsService } from 'ag-grid-community';

import { AgGridCellRendererComponent } from '../ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { CinemasService } from '../../services/cinemas.service';

import { Cinema } from '../../interfaces/location';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit{

  rowData: Cinema[]=[];

  colDefs:ColDef[]=[
    {
      headerName: 'Name',
      field: 'name',
      width: 180,
      cellRenderer:AgGridCellRendererComponent,
      cellRendererParams:{
        cinemaname:'cinemaname'
      }
    },
    {
      headerName: 'Address',
      field: 'address',
      width: 230,
    },
    {
      headerName: 'State',
      field: 'state.name',
      width: 100,
    },
    {
      headerName: 'City',
      field: 'city.name',
      width: 100,
    },
    {
      headerName: 'Contact',
      field: 'contactnumber',
      width: 100
    },
    {
      headerName: 'Website',
      field: 'website',
      width: 120,
      cellRenderer: AgGridCellRendererComponent,
      cellRendererParams:{
        website:'website'
      }
    },
    // {
    //   headerName: 'Screens',
    //   field: 'screens',
    //   width:100
    // },
    // {
    //   headerName: 'Shows Availability Time',
    //   field: 'showsavailabilitytime'
    // },
    {
      headerName: 'Status',
      width:90,
      cellRenderer: AgGridCellRendererComponent,
      cellRendererParams:{
        status: 'status'
      }
    },
    {
      headerName: 'Actions',
      width: 163,
      cellRenderer: AgGridCellRendererComponent,
      cellRendererParams:{
        actions:'actions'
      }
    }

  ]


  defaultColDef:ColDef={
    sortable:true,
    filter:true,
    // flex: 1,
    enableRowGroup:true
  }


  
  context:any;

  api:string='http://localhost:3000';

  constructor(private service:AppServiceService, private cinemasService: CinemasService,private router:Router,private toastr:ToastrService,private http:HttpClient){

    this.context={
      componentParent:this
    }

  }


  


  ngOnInit(): void {

    console.log('cinemas componenent ngOnInit says');

    this.setCinemas();    


    this.service.sendingCinemaToDelete.subscribe((data)=>{
      this.onDelete(data.cinemaid);
    })
  }

  
  setCinemas() : void{

    this.cinemasService.getCinemas().subscribe((response:any)=>{
      console.log('cinemas component', response);
      if(response.error!=null){
        this.router.navigate(['/']);
      }
      else{
        console.log(response);
        this.rowData=response.result;
      }
    })

  }

 
  
  onCellClicked(event:CellClickedEvent): void{
    console.log(event);
  }


  

  

  onDelete(cinemaid:number): void{  
  
    this.cinemasService.deleteCinema(cinemaid).subscribe((response:any)=>{
      console.log(response.message);
      this.toastr.success('cinema successfully deleted','message from website', {timeOut:3000});
      this.setCinemas();
    })      
    
  }

  
  


  changeStatusParent(status:boolean,cinemaid:number){
    console.log(status);
    console.log(cinemaid);

    this.cinemasService.changeCinemaStatus(cinemaid,status).subscribe((response:any)=>{

      console.log(response);
      this.toastr.success(response.message,'', {timeOut:3000});
    })  
  }

}
