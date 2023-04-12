import { Component } from '@angular/core';
import { Params } from '@angular/router';
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

  onDelete(): void{
    this.service.emitRecordDataToPopup({cinema:'cinema', id: this.params.data.id});
  }



  //on Status change
  onChange(status:boolean): void{
    console.log(status);

    this.componentParent.changeStatusParent(status, this.params.data.id);
  }

}
