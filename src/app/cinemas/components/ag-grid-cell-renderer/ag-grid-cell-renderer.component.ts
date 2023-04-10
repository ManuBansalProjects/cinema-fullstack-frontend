import { Component } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
@Component({
  selector: 'app-ag-grid-cell-renderer',
  templateUrl: './ag-grid-cell-renderer.component.html',
  styleUrls: ['./ag-grid-cell-renderer.component.css']
})
export class AgGridCellRendererComponent {

  params:any;
  componentParent:any;

  constructor(private service:AppServiceService){

  }

  agInit(params:any){
    console.log(params);
    this.params=params;
    this.componentParent=this.params.context.componentParent;
  }

  onDelete(){
    this.service.emitRecordDataToPopup({cinema:'cinema', id: this.params.data.id});
  }



  //on Status change
  onChange(status:any){
    console.log(status.value);

    this.componentParent.changeStatusParent(status.value, this.params.data.id);
  }

}
