import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addnewcinema',
  templateUrl: './addnewcinema.component.html',
  styleUrls: ['./addnewcinema.component.css']
})
export class AddnewcinemaComponent implements OnInit{

  form=new FormGroup({
    name: new FormControl('',[Validators.required]),
    contactnumber: new FormControl('',[Validators.required]),
    website: new FormControl(''),
    address: new FormControl('',[Validators.required]),
    stateid: new FormControl('',Validators.required),
    cityid: new FormControl('',[Validators.required]),
  });

  states:any;
  cities:any;

  constructor(private router:Router, private service:AppServiceService,private toastr:ToastrService,private http:HttpClient){

  }

  
  ngOnInit(): void {
    console.log('add-new-user componenent ngOnInit says');
   
    this.addNewCinemaRole();
  }

  
  addNewCinemaRole(){
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
            this.http.get('/api/cinemas/get-states-and-cities',{headers}).subscribe((response:any)=>{
              this.states=response.result;
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

    let index:any=this.form.value.stateid;

    console.log(index); 
    console.log(this.states[index]);

    this.cities=this.states[index].cities;

    this.form.controls['cityid'].setValue('');
  }


  formInvalid:any;

  onSubmit(){
    console.log(this.form.value);
    
    if(this.form.invalid){
      this.formInvalid=1;
    }
    else{
      let cinema:any=this.form.value;

      let stateIndex=cinema.stateid;
      cinema.stateid=this.states[stateIndex].id;
      console.log(cinema.stateid);

      let cityIndex=cinema.cityid;
      cinema.cityid=this.states[stateIndex].cities[cityIndex].id;
      console.log(cinema.cityid);


      console.log(cinema);

      this.addCinema(cinema).subscribe((response:any)=>{
        console.log(response);
        this.toastr.success('cinema added successfully ','message from website', {timeOut:3000});
        this.router.navigate(['/cinemas']);
      })

    }
    
  }


  addCinema(cinema:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.post('/api/cinemas/addcinema',cinema, {headers:headers});
  }


}
