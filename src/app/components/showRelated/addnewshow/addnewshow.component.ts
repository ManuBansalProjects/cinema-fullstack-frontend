import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addnewshow',
  templateUrl: './addnewshow.component.html',
  styleUrls: ['./addnewshow.component.css']
})
export class AddnewshowComponent implements OnInit{

  constructor(private service:AppServiceService, private toastr:ToastrService,private router:Router,private http:HttpClient){

  }

  form=new FormGroup({
    moviename: new FormControl('',[Validators.required]),
    cinemaname: new FormControl('',[Validators.required]),
    screen: new FormControl('',[Validators.required]),
    startscreeningdate: new FormControl('',[Validators.required]),
    endscreeningdate: new FormControl('',[Validators.required]),
    screeningtime: new FormControl('',[Validators.required]),
  });

  cinemas:any;
  movies:any;

  ngOnInit(): void {
    
    this.addNewShowRole();
  }

  
  addNewShowRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{

      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      
      this.http.get('/api/auth/getrole',{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          if(response.role==1){

            this.service.getCinemas().subscribe((response:any)=>{
              this.cinemas=response.result;

              this.service.getMovies().subscribe((response:any)=>{
                this.movies=response.moviesList;
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
  



  selectedCinema:any;
  screensInSelectedCinema:any;
  showsavailabilitytimeInSelectedCinema:any;


  onChange(cinemaname:any){
    
    console.log(cinemaname);

    this.form=new FormGroup({
      moviename: new FormControl('',[Validators.required]),
      cinemaname: new FormControl(cinemaname,[Validators.required]),
      screen: new FormControl('',[Validators.required]),
      startscreeningdate: new FormControl('',[Validators.required]),
      endscreeningdate: new FormControl('',[Validators.required]),
      screeningtime: new FormControl('',[Validators.required]),
    });


    this.service.getCinemaByName(cinemaname).subscribe((response:any)=>{
      this.selectedCinema=response.result;
      console.log(this.selectedCinema);

      this.screensInSelectedCinema=this.selectedCinema.screens;
      console.log(this.screensInSelectedCinema);
      this.screensInSelectedCinema=Array(this.screensInSelectedCinema);
      console.log(this.screensInSelectedCinema);

      this.showsavailabilitytimeInSelectedCinema=this.selectedCinema.showsavailabilitytime;  
      this.showsavailabilitytimeInSelectedCinema=this.showsavailabilitytimeInSelectedCinema.split(',');
      console.log(this.showsavailabilitytimeInSelectedCinema);      
    })
  }




  onSubmit(){
    console.log(this.form.value);
    
    this.addShow(this.form.value).subscribe((response:any)=>{
      console.log(response);

      if(response.error){
        this.toastr.error(response.error,'message from website', {timeOut:3000});
        this.router.navigate(['/shows']);
      }
      else{
        this.toastr.success(response.message,'message from website',{timeOut:3000});
        this.router.navigate(['/shows']);
      }
    })
  }

  
  addShow(showDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.post('/api/shows/addshow',showDetails,{headers:headers});
  }




}
