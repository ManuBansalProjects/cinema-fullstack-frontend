import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editshow',
  templateUrl: './editshow.component.html',
  styleUrls: ['./editshow.component.css']
})
export class EditshowComponent implements OnInit{

  api:string='http://localhost:3000';

  constructor(private activatedRoute:ActivatedRoute, private service:AppServiceService, private router:Router,private toastr:ToastrService,private http:HttpClient){

  }

  form=new FormGroup({
    moviename: new FormControl('',[Validators.required]),
    cinemaname: new FormControl('',[Validators.required]),
    screen: new FormControl('',[Validators.required]),
    startscreeningdate: new FormControl('',[Validators.required]),
    endscreeningdate: new FormControl('',[Validators.required]),
    screeningtime: new FormControl('',[Validators.required]),
  });

  showid:any;
  show:any;
  cinemas:any;
  movies:any;

  selectedCinema:any;
  screensInSelectedCinema:any;
  showsavailabilitytimeInSelectedCinema:any;

  ngOnInit(): void {

    this.editShowRole();

  }


  
  editShowRole(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{

      let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);

      this.http.get(`${this.api}/auth/getrole`,{headers}).subscribe((response:any)=>{
        if(response.role!=null){
          
          if(response.role==1){
              
            this.showid=this.activatedRoute.snapshot.params['showid'];

            this.service.getShow(this.showid).subscribe((response:any)=>{
              this.show=response.show;
              console.log(this.show);

              this.form=new FormGroup({
                moviename: new FormControl(this.show.moviename,[Validators.required]),
                cinemaname: new FormControl(this.show.cinemaname,[Validators.required]),
                screen: new FormControl(this.show.screen,[Validators.required]),
                startscreeningdate: new FormControl(this.show.startscreeningdate,[Validators.required]),
                endscreeningdate: new FormControl(this.show.endscreeningdate,[Validators.required]),
                screeningtime: new FormControl(this.show.screeningtime,[Validators.required]),
              });

              this.service.getCinemas().subscribe((response:any)=>{
                this.cinemas=response.result;

                this.service.getMovies().subscribe((response:any)=>{
                  this.movies=response.moviesList;

                    this.service.getCinemaByName(this.form.value.cinemaname).subscribe((response:any)=>{
                      this.selectedCinema=response.result;

                      this.screensInSelectedCinema=Array(this.selectedCinema.screens);

                      this.showsavailabilitytimeInSelectedCinema=this.selectedCinema.showsavailabilitytime;
                      this.showsavailabilitytimeInSelectedCinema=this.showsavailabilitytimeInSelectedCinema.split(',');
                    })
                })
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
      })
    }
  }


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

      this.screensInSelectedCinema=Array(this.selectedCinema.screens);

      this.showsavailabilitytimeInSelectedCinema=this.selectedCinema.showsavailabilitytime;
      this.showsavailabilitytimeInSelectedCinema=this.showsavailabilitytimeInSelectedCinema.split(',');
    })

  }

  formInvalid:any;
  
  onSubmit(){
    console.log(this.form.value);

    if(this.form.invalid){
      this.formInvalid=1;
    }
    else{  
      this.editShow(this.showid,this.form.value).subscribe((response:any)=>{
        console.log(response);

        if(response.message){
          this.toastr.success(response.message, 'message from website', {timeOut:3000});
        }
        else{
          this.toastr.error(response.error, 'message from website', {timeOut:3000});
        }
        this.router.navigate(['/shows']);
      })
    }
  }


  editShow(showid:any, showDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`${this.api}/shows/editshow/${showid}`,showDetails,{headers:headers});
  }
}
