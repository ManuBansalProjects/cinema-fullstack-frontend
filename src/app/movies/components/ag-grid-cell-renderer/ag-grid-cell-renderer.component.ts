import { Component } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ag-grid-cell-renderer',
  templateUrl: './ag-grid-cell-renderer.component.html',
  styleUrls: ['./ag-grid-cell-renderer.component.css']
})
export class AgGridCellRendererComponent {
  constructor(private service:AppServiceService, private modalService: NgbModal){

  }

  params:any;
  componentParent:any;
  

  agInit(params:any){
    
    console.log(params);
    this.params=params;
    this.componentParent=params.context.componentParent;
  }

  onDelete(){
    this.componentParent.onDelete(this.params.data.id);
  }






  closeResult:any;
  open(content:any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
}
