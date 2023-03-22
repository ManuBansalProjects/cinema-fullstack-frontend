import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  displayedColumns:string[]=['id', 'name', 'email','Role', 'operations'];

  constructor(private service:AppServiceService,private router:Router,private toastr:ToastrService,private http:HttpClient){

  }


  usersList:any[]=[];
  role:any;

  ngOnInit(): void {

    console.log('users componenent ngOnInit says');

    // this.sendingUsersRole.subscribe((data)=>{
    //   this.role=data.role;
    //   console.log('users componenent ngOnInit emitter says', this.role);

    //   if(this.role!=1){
    //     this.router.navigate(['/']);
    //   }
    //   else{
    //     this.getUsers().subscribe((response:any)=>{
    //       console.log('users component', response);
    //       if(response.error!=null){
    //         this.router.navigate(['/']);
    //       }
    //       else{
    //         this.usersList=response.result;
    //         console.log(this.usersList);
    //       }
    //     })
    //   }
    // })
    this.usersRole();  
  }


  
  usersRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      // this.role=-1;
      // this.emitUsersRole();
      this.router.navigate(['/']);
    }
    else{
      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          // this.role=response.role;
          // this.emitUsersRole();
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

  // sendingUsersRole=new EventEmitter<{role:number}>();
  // emitUsersRole(){
  //   this.sendingUsersRole.emit({role:this.role});
  // }

    


  getUsers(){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get('/api/auth/getusers',{headers});
  }

  onDelete(id:any){
    // this.dialogRef.open(DeletepopupComponent);
    
    // this.service.sendingDeleteMessage.subscribe((response)=>{

    //   if(response.message=='Yes'){
    //     this.deleteUser(id).subscribe((response:any)=>{
    //       console.log(response.message);
    //       this.dialogRef.closeAll();
    //       this.toastr.success('user successfully deleted','message from website', {timeOut:3000});
    //       this.usersRole();
    //     })
    //   }
    //   else{
    //     this.dialogRef.closeAll();
    //   }
    // })
    
  }


  deleteUser(id:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.delete(`/api/auth/delete/${id}`,{headers});
  }

 


 

}
