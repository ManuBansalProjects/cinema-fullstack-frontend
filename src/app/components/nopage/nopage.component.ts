import { Component,OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-nopage',
  templateUrl: './nopage.component.html',
  styleUrls: ['./nopage.component.css']
})
export class NopageComponent  {
  constructor(private service:AppServiceService){

  }

 

}
