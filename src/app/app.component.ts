import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ToastrService } from 'ngx-toastr';

interface Student{
  id: number;
  name: string;
  email: string;
  mobile: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  record:any;

  constructor(private service: AppServiceService, private toastr:ToastrService){
    
  }

  ngOnInit(): void {
    this.toastr.success('hello there','message from website',{timeOut:1000});

    //for testing purpose
    this.getDataFromAPI();

    this.service.sendingRecordDataToPopup.subscribe((data)=>{
      console.log(data);
      this.record=data.record;
    })
  }

  getDataFromAPI(){
    this.service.getData().subscribe((response)=>{
      console.log('Response from api is-->', response);
    });
  }  

  onDeleteRecord(){
    if(this.record.movie!=undefined){
      this.service.emitMovieToDelete(this.record.id);
    }
    else if(this.record.show!=undefined){
      console.log('on delete record');
      this.service.emitShowToDelete(this.record.id);
    }
    else if(this.record.cinema!=undefined){
      this.service.emitCinemaToDelete(this.record.id);
    }
    else if(this.record.user!=undefined){
      this.service.emitUserToDelete(this.record.id);
    } 
  }

}
