import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-cinema',
  templateUrl: './add-edit-cinema.component.html',
  styleUrls: ['./add-edit-cinema.component.css']
})
export class AddEditCinemaComponent implements OnInit{

  cinemaForm=new FormGroup({
    name: new FormControl('',[Validators.required]),
    contactnumber: new FormControl('',[Validators.required]),
    website: new FormControl(''),
    address: new FormControl('',[Validators.required]),
    stateid: new FormControl('',Validators.required),
    cityid: new FormControl('',[Validators.required]),
  });

  states:any;
  cities:any;

  cinema:any;

  api:string='http://localhost:3000';

  constructor(private router:Router, private service:AppServiceService,private toastr:ToastrService,private http:HttpClient,private activatedRoute:ActivatedRoute){

  }

  
  ngOnInit(): void {
    console.log('add-edit cinema componenent ngOnInit says');
   
    this.setCinema();
  }

  
  setCinema(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{

      let headers:any=new HttpHeaders().set("Authorization",`bearer ${token}`); 
      
      this.http.get(`${this.api}/auth/getrole`,{headers}).subscribe( (response:any)=>{
        if(response.role!=null){

          if(response.role!=1){
            this.router.navigate(['/']);
          } 
          else{
            this.http.get(`${this.api}/cinemas/get-states-and-cities`,{headers}).subscribe((response:any)=>{
              this.states=response.result;

              let cinemaid=this.activatedRoute.snapshot.params['cinemaid'];
              if(cinemaid){
                    
                this.service.getCinema(cinemaid).subscribe((response:any)=>{
                  this.cinema=response.result;
                  console.log('editing cinema is', this.cinema);

                  
                  this.cinemaForm=new FormGroup({            
                    name: new FormControl(this.cinema.name,[Validators.required]),
                    contactnumber: new FormControl(this.cinema.contactnumber,[Validators.required]),
                    website: new FormControl(this.cinema.website),
                    address:new FormControl(this.cinema.address,[Validators.required]),
                    stateid: new FormControl(this.cinema.state.id,[Validators.required]),
                    cityid: new FormControl(this.cinema.city.id, [Validators.required]),
                  });
                  
                  let flag=1;
                  for(let i=0; i<this.states.length && flag; i++){
                    if(this.states[i].id==this.cinema.state.id){
                      this.cities=this.states[i].cities;
                      flag=0;
                    }
                  }
                  
                })
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


  onChange(){

    let stateid:any=this.cinemaForm.value.stateid;
    console.log(stateid);

    let flag=1;
    for(let i=0;i<this.states.length && flag;i++){
      if(stateid == this.states[i].id){
        this.cities=this.states[i].cities;
        flag=0;
      }
    }

    

    this.cinemaForm.controls['cityid'].setValue('');
  }


  formInvalid:any;

  onSubmit(){
    console.log(this.cinemaForm.value);
  
    if(this.cinemaForm.invalid){
      this.formInvalid=1;
    }
    else{
      let cinemaid=this.activatedRoute.snapshot.params['cinemaid'];
      
      if(cinemaid){
        this.editCinema(cinemaid, this.cinemaForm.value).subscribe((response:any)=>{
          console.log(response);
          this.toastr.success(response.message,'', {timeOut:3000});
          this.router.navigate(['/cinemas']);
        })
      }
      else{
        this.addCinema(this.cinemaForm.value).subscribe((response:any)=>{
          console.log(response);
          this.toastr.success(response.message,'', {timeOut:3000});
          this.router.navigate(['/cinemas']);
        })
      }

    }
    
  }


  addCinema(cinemaDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.post(`${this.api}/cinemas/addcinema`,cinemaDetails, {headers:headers});
  }
  editCinema(cinemaid:any,cinemaDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`${this.api}/cinemas/editcinema/${cinemaid}`,cinemaDetails,{headers:headers});
  }

}
