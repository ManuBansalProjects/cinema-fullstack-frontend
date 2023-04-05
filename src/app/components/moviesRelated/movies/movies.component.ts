import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent } from 'ag-grid-community/dist/lib/events';
import { AggridcellmovieposterComponent } from '../aggridcellmovieposter/aggridcellmovieposter.component';



@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

  //it will take an array of objects
  rowData:any;

  colDefs:ColDef[]=[
    {
      headerName:'Poster',
      cellRenderer: AggridcellmovieposterComponent,
      cellRendererParams:{
        movieposter: 'movieposter'
      }
    }, 
    {
      headerName: 'Name',
      field: 'name', 
      // cellRenderer: AggridcellmovieposterComponent,
      // cellRendererParams:{
      //   moviename: 'moviename'
      // }

              //Or
      cellRendererSelector : (params:ICellRendererParams)=>{
        if(params.value.length>0){
          return{ component: AggridcellmovieposterComponent, params:{moviename: 'moviename'}} ;
        }
        return {};
      }
    }, 
    {
      headerName: 'Released Date',
      field: 'releaseddate',
      cellRenderer: AggridcellmovieposterComponent,
      cellRendererParams:{
        date:'date'
      },
    },
    {
      headerName: 'Descrption',
      field: 'descrption',
      cellRenderer:(params:ICellRendererParams)=>{
        return `<b> => ${params.value} </b>`
      }
    },
    {
      headerName:'Actions',
      cellRenderer: AggridcellmovieposterComponent,
      cellRendererParams:{
        actions: 'actions'
      },
    }
    
  ];

  defaultColDef:ColDef={
    sortable:true, 
    filter: true, 
    flex:1,
    enableRowGroup:true
  }

  currentMovieData:any;
  onCellClicked(event:CellClickedEvent){
    console.log(event);
    this.currentMovieData=event.data;
  }


  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  clearSelection(){
    this.agGrid.api.deselectAll();
  }





  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService,private http:HttpClient){

  }


  moviesList:any[]=[];
  role:any;

  ngOnInit(): void {
    console.log('movies componenent ngOnInit says');
  
    this.moviesRole();  

    this.service.sendingMovieToDelete.subscribe((data:any)=>{
      this.onDelete(data.movieid);
    })
  }

  moviesRole(){
    
    this.service.getMovies().subscribe((response:any)=>{
      console.log('cinemas component', response);
      if(response.error!=null){
        this.router.navigate(['/']);
      }
      else{
        this.moviesList=response.moviesList;

        console.log(this.moviesList);

        this.rowData=response.moviesList;        
            
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


  

  



  onDelete(movieid:any){

    this.deleteMovie(movieid).subscribe((response)=>{
      console.log(response);
      this.toastr.success('movie deleted successfully','message from website',{timeOut:3000});
      this.moviesRole();
    })
      
  }

  deleteMovie(movieid:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`/api/movies/deletemovie/${movieid}`,{headers:headers});
  }


  



  


}
