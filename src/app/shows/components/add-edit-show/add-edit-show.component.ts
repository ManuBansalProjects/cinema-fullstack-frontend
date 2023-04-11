import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CinemasService } from 'src/app/cinemas/services/cinemas.service';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-add-edit-show',
  templateUrl: './add-edit-show.component.html',
  styleUrls: ['./add-edit-show.component.css']
})
export class AddEditShowComponent implements OnInit{

  api:string='http://localhost:3000';

  constructor(private service:AppServiceService, private toastr:ToastrService,private router:Router,private http:HttpClient,private activatedRoute:ActivatedRoute,private cinemasService:CinemasService,private moviesService:MoviesService,private showsService:ShowsService){

  }

  showForm=new FormGroup({
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
    
    this.setShow();
  }

  
  setShow(){
    const token=localStorage.getItem('token');
    if(token==null){
      this.router.navigate(['/']);
    }
    else{

      let headers:any=new HttpHeaders().set("Authorization",'bearer'+' '+token); 
      
      this.http.get(`${this.api}/auth/getrole`,{headers}).subscribe( (response:any)=>{
        if(response.role!=null){
          if(response.role==1){

            const showid=this.activatedRoute.snapshot.params['showid'];

            if(showid!=undefined){
              this.cinemasService.getCinemas().subscribe((response:any)=>{
                this.cinemas=response.result;

                this.moviesService.getMovies().subscribe((response:any)=>{
                  this.movies=response.moviesList;
                })
              })
            }
            else{
              this.showsService.getShow(showid).subscribe((response:any)=>{
                const show=response.show;
                console.log(show);
  
                this.showForm=new FormGroup({
                  moviename: new FormControl(show.moviename,[Validators.required]),
                  cinemaname: new FormControl(show.cinemaname,[Validators.required]),
                  screen: new FormControl(show.screen,[Validators.required]),
                  startscreeningdate: new FormControl(show.startscreeningdate,[Validators.required]),
                  endscreeningdate: new FormControl(show.endscreeningdate,[Validators.required]),
                  screeningtime: new FormControl(show.screeningtime,[Validators.required]),
                });
  
                this.cinemasService.getCinemas().subscribe((response:any)=>{
                  this.cinemas=response.result;
  
                  this.moviesService.getMovies().subscribe((response:any)=>{
                    this.movies=response.moviesList;
  
                      this.cinemasService.getCinemaByName(this.showForm.value.cinemaname).subscribe((response:any)=>{
                        this.selectedCinema=response.result;
  
                        this.screensInSelectedCinema=Array(this.selectedCinema.screens);
  
                        this.showsavailabilitytimeInSelectedCinema=this.selectedCinema.showsavailabilitytime;
                        this.showsavailabilitytimeInSelectedCinema=this.showsavailabilitytimeInSelectedCinema.split(',');
                      })
                  })
                })
  
              })
            }

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

    this.showForm=new FormGroup({
      moviename: new FormControl('',[Validators.required]),
      cinemaname: new FormControl(cinemaname,[Validators.required]),
      screen: new FormControl('',[Validators.required]),
      startscreeningdate: new FormControl('',[Validators.required]),
      endscreeningdate: new FormControl('',[Validators.required]),
      screeningtime: new FormControl('',[Validators.required]),
    });

    this.cinemasService.getCinemaByName(cinemaname).subscribe((response:any)=>{
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



  formInvalid:any;

  onSubmit(){
    console.log(this.showForm.value);
    if(this.showForm.invalid){
      this.formInvalid=1;
    }
    else{
      const showid=this.activatedRoute.snapshot.params['showid'];
      if(showid==undefined){
        this.addShow(this.showForm.value).subscribe((response:any)=>{
          console.log(response);
          if(response.error){
            this.toastr.error(response.error,'message from website', {timeOut:3000});
          }
          else{
            this.toastr.success(response.message,'message from website',{timeOut:3000});
          }
          this.router.navigate(['/shows']);
        })
      }
      else{
        this.editShow(showid,this.showForm.value).subscribe((response:any)=>{
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
  }

  
  addShow(showDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.post(`${this.api}/shows/addshow`,showDetails,{headers:headers});
  }
  editShow(showid:any, showDetails:any){
    const token=localStorage.getItem('token');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`);
    return this.http.put(`${this.api}/shows/editshow/${showid}`,showDetails,{headers:headers});
  }


}
