import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
// import { ToastrService } from 'ngx-toastr';

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

  constructor(private service: AppServiceService){
    
  }

  ngOnInit(): void {
    // this.toastr.success('hello there','message from website',{timeOut:1000});

    //for testing purpose
    this.getDataFromAPI();

    
  }

  getDataFromAPI(){
    this.service.getData().subscribe((response)=>{
      console.log('Response from api is-->', response);
    });
  }  


}
