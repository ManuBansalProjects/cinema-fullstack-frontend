import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
// import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { AgGridCellRendererComponent } from '../ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  rowData:any;

  colDefs:ColDef[]=[
    {
      headerName:'Name',
      field:'name',
      cellRenderer: AgGridCellRendererComponent,
      cellRendererParams:{
        name:'name'
      }
    },
    {
      headerName: 'Email',
      field: 'email'
    },
    {
      headerName: 'Role',
      field: 'role',
      cellRenderer: AgGridCellRendererComponent,
      cellRendererParams:{
        role:'role'
      }
    },
    {
      headerName: 'Actions',
      cellRenderer: AgGridCellRendererComponent,
      cellRendererParams:{
        actions:'actions'
      }
    }
  ]


  defaultColDef:ColDef={
    sortable:true,
    filter:true,
    flex:1,
    enableRowGroup:true
  }

  onCellClicked(event:any){
    console.log(event);
  }

  api:string='http://localhost:3000';

  constructor(private service:AppServiceService,private router:Router,private http:HttpClient,private usersService:UsersService){

  }


  usersList:any[]=[];
  role:any;

  ngOnInit(): void {

    console.log('users componenent ngOnInit says');

    this.usersRole();  


    this.service.sendingUserToDelete.subscribe((data:any)=>{
      this.onDelete(data.userid);
    })
  }


  
  usersRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{
      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      this.http.get(`${this.api}/auth/getrole`,{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          if(response.role!=1){
            this.router.navigate(['/']);
          }
          else{
             this.usersService.getUsers().subscribe((response:any)=>{
              console.log('users component', response);
              if(response.error!=null){
                this.router.navigate(['/']);
              }
              else{
                this.usersList=response.result;
                console.log(this.usersList);

                this.rowData=response.result;
              }
            })
          }
        }
        else{
          this.router.navigate(['/']);
        }
      }); 
    }
  }


    



  onDelete(id:any){
  
    this.usersService.deleteUser(id).subscribe((response:any)=>{
      console.log(response.message);   
      // this.toastr.success('user successfully deleted','message from website', {timeOut:3000});
      this.usersRole();
    })    
    
  }


 

 


 

}
