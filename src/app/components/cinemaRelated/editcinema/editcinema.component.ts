import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editcinema',
  templateUrl: './editcinema.component.html',
  styleUrls: ['./editcinema.component.css']
})
export class EditcinemaComponent implements OnInit{

  constructor(private service:AppServiceService,private activatedRoute:ActivatedRoute,private router:Router,private toastr:ToastrService,private http:HttpClient){

  }

  role:any;

  cinema:any;
  myform:any=new FormGroup({
    name: new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    contactnumber: new FormControl('',[Validators.required]),
    website: new FormControl(''),
    screens: new FormControl('', [Validators.required]),
    showsavailabilitytime: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
      
    console.log('edit-cinema componenent ngOnInit says');
      
    this.editCinemaRole();
  }


  
  editCinemaRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{
      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
        if(response.role!=null){

          if(response.role==1){
            let id=this.activatedRoute.snapshot.params['id'];

            this.service.getCinema(id).subscribe((response:any)=>{
              this.cinema=response.result;
              console.log('editing cinema is', this.cinema);
              
              this.myform=new FormGroup({
                name: new FormControl(this.cinema.name,[Validators.required]),
                address:new FormControl(this.cinema.address,[Validators.required]),
                contactnumber: new FormControl(this.cinema.contactnumber,[Validators.required]),
                website: new FormControl(this.cinema.website),
                screens: new FormControl(this.cinema.screens, [Validators.required]),
                showsavailabilitytime: new FormControl(this.cinema.showsavailabilitytime, [Validators.required]),
              });

            })
          }
          else{
            this.router.navigate(['/']);
          }

        }
        else{
          this.router.navigate(['/']);
        }
      }); 
    }
  }


  formInvalid:any;

  onSubmit(){
    console.log(this.myform.value);

    if(this.myform.invalid){
      this.formInvalid=1;
    }
    else{   
      let cinemaid=this.activatedRoute.snapshot.params['id'];
      
      this.editCinema(cinemaid,this.myform.value).subscribe((response)=>{
        console.log(response);
        this.toastr.success('cinema updated successfully ','message from website', {timeOut:3000});
        this.router.navigate(['/cinemas']);
      })
    }
    
  }


  editCinema(cinemaid:any,cinemaDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`/api/cinemas/editcinema/${cinemaid}`,cinemaDetails,{headers:headers});
  }

  
}
