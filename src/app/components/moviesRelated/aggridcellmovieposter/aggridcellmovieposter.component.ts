import { Component } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-aggridcellmovieposter',
  templateUrl: './aggridcellmovieposter.component.html',
  styleUrls: ['./aggridcellmovieposter.component.css']
})
export class AggridcellmovieposterComponent {

  constructor(private service:AppServiceService){

  }

  params:any;

  

  agInit(params:any){
    
    console.log(params);
    this.params=params;
  }

  onDelete(){
    this.service.emitRecordDataToPopup({movie: 'movie', id: this.params.data.id});
  }
  
}
