import { Component } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-aggridcelluser',
  templateUrl: './aggridcelluser.component.html',
  styleUrls: ['./aggridcelluser.component.css']
})
export class AggridcelluserComponent {
  
  params:any;

  constructor(private service:AppServiceService){

  }

  agInit(params:any){
    console.log(params);
    this.params=params;
  }


  onDelete(){
    this.service.emitRecordDataToPopup({user: 'user', id: this.params.data.id});
  }

}
