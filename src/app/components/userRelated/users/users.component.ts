import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AggridcelluserComponent } from '../aggridcelluser/aggridcelluser.component';

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
      cellRenderer: AggridcelluserComponent,
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
      cellRenderer:AggridcelluserComponent,
      cellRendererParams:{
        role:'role'
      }
    },
    {
      headerName: 'Actions',
      cellRenderer: AggridcelluserComponent,
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

  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService,private http:HttpClient){

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
      this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          if(response.role!=1){
            this.router.navigate(['/']);
          }
          else{
             this.getUsers().subscribe((response:any)=>{
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


    


  getUsers(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get('/api/auth/getusers',{headers});
  }

  onDelete(id:any){
  
    this.deleteUser(id).subscribe((response:any)=>{
      console.log(response.message);   
      this.toastr.success('user successfully deleted','message from website', {timeOut:3000});
      this.usersRole();
    })    
    
  }


  deleteUser(id:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`/api/auth/delete/${id}`,{headers});
  }

 


 

}
