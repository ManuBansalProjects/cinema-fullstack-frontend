import { Component } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-ag-grid-cell-renderer',
  templateUrl: './ag-grid-cell-renderer.component.html',
  styleUrls: ['./ag-grid-cell-renderer.component.css']
})
export class AgGridCellRendererComponent {
  
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
