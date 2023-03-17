import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-moviedeletepopup',
  templateUrl: './moviedeletepopup.component.html',
  styleUrls: ['./moviedeletepopup.component.css']
})
export class MoviedeletepopupComponent{

  constructor(private service:AppServiceService){

  }

  delete(message:any){
    console.log(message);
    this.service.emitDeleteMovieMessage(message);  
  }
}
