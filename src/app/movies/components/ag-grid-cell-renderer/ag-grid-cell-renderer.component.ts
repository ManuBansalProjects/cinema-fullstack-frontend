import { Component } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-ag-grid-cell-renderer',
  templateUrl: './ag-grid-cell-renderer.component.html',
  styleUrls: ['./ag-grid-cell-renderer.component.css']
})
export class AgGridCellRendererComponent {
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
