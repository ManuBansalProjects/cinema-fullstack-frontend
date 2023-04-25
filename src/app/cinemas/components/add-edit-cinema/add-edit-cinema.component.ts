import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
// import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CinemasService } from '../../services/cinemas.service';

import { Cinema, Cities, States} from '../../interfaces/location';

@Component({
  selector: 'app-add-edit-cinema',
  templateUrl: './add-edit-cinema.component.html',
  styleUrls: ['./add-edit-cinema.component.css']
})
export class AddEditCinemaComponent implements OnInit{

  cinemaForm:any=new FormGroup({
    name: new FormControl('',[Validators.required]),
    contactnumber: new FormControl('',[Validators.required]),
    website: new FormControl(''),
    address: new FormControl('',[Validators.required]),
    stateid: new FormControl('',Validators.required),
    cityid: new FormControl('',[Validators.required]),
    screens: new FormArray([])
  });

  


  states: States[]=[];
  cities: Cities[]=[];

  // cinema={} as Cinema;
  cinemaid:any;
  cinema:any;

  api:string='http://localhost:3000';

  constructor(private router:Router, private service:AppServiceService,private http:HttpClient,private activatedRoute:ActivatedRoute,private cinemasService:CinemasService, private fb: FormBuilder){

  }

  
  ngOnInit(): void {
    console.log('add-edit cinema componenent ngOnInit says');
   
    this.setCinema();
  }


  setCinema(): void{
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
            this.cinemasService.getStatesAndCities().subscribe((response:any)=>{
              this.states=response.result;
              console.log(this.states);

              this.cinemaid=this.activatedRoute.snapshot.params['cinemaid'];
              if(this.cinemaid){
                    
                this.cinemasService.getCinema(this.cinemaid).subscribe((response:any)=>{
                  this.cinema=response.result;
                  console.log('editing cinema is', this.cinema);

                  let flag=1;
                  for(let i=0; i<this.states.length && flag; i++){
                    if(this.states[i].id==this.cinema.state.id){
                      this.cities=this.states[i].cities;
                      flag=0;
                    }
                  }


                  // this.cinemaForm=new FormGroup({            
                  //   name: new FormControl(this.cinema.name,[Validators.required]),
                  //   contactnumber: new FormControl(this.cinema.contactnumber,[Validators.required]),
                  //   website: new FormControl(this.cinema.website),
                  //   address:new FormControl(this.cinema.address,[Validators.required]),
                  //   stateid: new FormControl(this.cinema.state.id,[Validators.required]),
                  //   cityid: new FormControl(this.cinema.city.id, [Validators.required]),
                  //   screens: new FormArray(this.cinema.screens)
                  // });

                  this.cinemaForm.patchValue({            
                    name: this.cinema.name,
                    contactnumber: this.cinema.contactnumber,
                    website: this.cinema.website,
                    address: this.cinema.address,
                    stateid: this.cinema.state.id,
                    cityid: this.cinema.city.id
                  });
                  
                  if(this.cinema.screens[0].id!=null){
                    this.cinema.screens.forEach((screen:any) => {
                      let formGroup=new FormGroup({
                        id: new FormControl(screen.id),
                        name: new FormControl(screen.name, [Validators.required]),
                        capacity: new FormControl(screen.capacity,[Validators.required]),
                        hasrecliners: new FormControl(screen.hasrecliners),
                        reclinerscapacity: new FormControl(screen.reclinerscapacity)
                      });
  
                      if(screen.hasrecliners){
                        formGroup.get('reclinerscapacity')?.setValidators([Validators.required]);
                      }
  
                      (<FormArray>this.cinemaForm.get('screens')).push(formGroup); 
                    });
                  }

                  console.log(this.cinemaForm);
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


  onChange(): void{

    let stateid:any=this.cinemaForm.value.stateid;
    console.log(stateid);

    let flag=1;
    for(let i=0;i<this.states.length && flag;i++){
      if(stateid == this.states[i].id){
        this.cities=this.states[i].cities;
        flag=0;
      }
    }

    this.cinemaForm.controls.cityid.setValue('');
  }


  formInvalid:any;
  screenInvalid:any;

  onSubmit(): void{
    console.log('submitting form', this.cinemaForm.value)
  
    if(this.cinemaForm.invalid || this.cinemaForm.get('screens').invalid){
      if(this.cinemaForm.invalid){
        console.log('formInvalid');
        this.formInvalid=1;
      }
      if(this.cinemaForm.get('screens').invalid){
        console.log('screenInvalid');
        this.screenInvalid=1;
      }
    }
    else{
      console.log('valid');
      let cinemaid=this.activatedRoute.snapshot.params['cinemaid'];
      
      if(cinemaid){
        this.cinemasService.editCinema(cinemaid, this.cinemaForm.value).subscribe((response:any)=>{
          console.log(response);
          // this.toastr.success(response.message,'', {timeOut:3000});
          this.router.navigate(['/cinemas']);
        })
      }
      else{
        
        let obj:any=this.cinemaForm.value;
        this.cinemasService.addCinema(obj).subscribe((response:any)=>{
          console.log(response);
          // this.toastr.success(response.message,'', {timeOut:3000});
          this.router.navigate(['/cinemas']);
        })
      }

    }
    
  }


  
  addScreen(){    
    let formgroup=new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      capacity: new FormControl('',[Validators.required]),
      hasrecliners: new FormControl(false),
      reclinerscapacity: new FormControl(0)
    });

    (<FormArray>this.cinemaForm.get('screens')).push(formgroup);

    console.log(this.cinemaForm);
  }

  removeScreen(index:number){
    console.log('removing screen');
    let screen=this.cinemaForm.get('screens').value[index];
    (<FormArray>this.cinemaForm.get('screens')).removeAt(index);
    
    if(screen.id){
      this.cinemasService.deleteScreen(screen.id).subscribe((response:any)=>{
        console.log(response);
      });
    }
  }

  onChangeHasRecliners(screen:any){
    if(screen.controls.hasrecliners.value==true){
      screen.controls.reclinerscapacity.setValidators([Validators.required]);
    }
    else{
      screen.controls.reclinerscapacity.setValidators([]);
      screen.controls.reclinerscapacity.setValue(0);
    }
  }

}
