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
    contactnumber: new FormControl('',[Validators.required]),
    website: new FormControl(''),
    address:new FormControl('',[Validators.required]),
    stateid: new FormControl('',[Validators.required]),
    cityid: new FormControl('', [Validators.required]),
    
    // screens: new FormControl('', [Validators.required]),
    // showsavailabilitytime: new FormControl('', [Validators.required]),
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
              

              this.http.get('/api/cinemas/get-states-and-cities',{headers}).subscribe((response:any)=>{
                this.states=response.result;

                let stateIndex;
                let cityIndex;

                let flag=0;

                for(let i=0; i<this.states.length && flag==0; i++){

                  if(this.states[i].id==this.cinema.stateid){

                    stateIndex=i;
                    this.cities=this.states[stateIndex].cities;
                    
                    for(let j=0; j<this.states[stateIndex].cities.length && flag==0; j++){
                      if(this.states[stateIndex].cities[j].id == this.cinema.cityid){
                        cityIndex=j;
                        flag=1;
                      }
                    }

                  }

                }

                
                this.myform=new FormGroup({            
                  name: new FormControl(this.cinema.name,[Validators.required]),
                  contactnumber: new FormControl(this.cinema.contactnumber,[Validators.required]),
                  website: new FormControl(this.cinema.website),
                  address:new FormControl(this.cinema.address,[Validators.required]),
                  stateid: new FormControl(stateIndex,[Validators.required]),
                  cityid: new FormControl(cityIndex, [Validators.required]),
                });


              })



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

  states:any;
  cities:any;

  onChange(){
    let stateIndex=this.myform.value.stateid;
    this.cities=this.states[stateIndex].cities;

    this.myform.controls['cityid'].setValue('');
  }

  formInvalid:any;

  onSubmit(){
    console.log(this.myform.value);

    if(this.myform.invalid){
      this.formInvalid=1;
    }
    else{   
      let newCinema=this.myform.value;

      let stateIndex=newCinema.stateid;
      newCinema.stateid=this.states[stateIndex].id;
      console.log(newCinema.stateid);

      let cityIndex=newCinema.cityid;
      newCinema.cityid=this.states[stateIndex].cities[cityIndex].id;
      console.log(newCinema.cityid);
      

      let cinemaid=this.activatedRoute.snapshot.params['id'];
      this.editCinema(cinemaid,newCinema).subscribe((response)=>{
        console.log(response);
        this.toastr.success('cinema updated successfully ','message from website', {timeOut:3000});
        this.router.navigate(['/cinemas']);
      })

    }
    
  }


  editCinema(cinemaid:any,newCinema:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`/api/cinemas/editcinema/${cinemaid}`,newCinema,{headers:headers});
  }

  
}
