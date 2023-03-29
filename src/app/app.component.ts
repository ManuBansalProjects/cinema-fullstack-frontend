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

  constructor(private service: AppServiceService, private toastr:ToastrService){
    
  }

  record:any;

  

  ngOnInit(): void {
    this.toastr.success('hello there','message from website',{timeOut:1000, });

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














  
                                        // angular material just for paratice
  // title = 'frontend';



  // badges

  // notifi=3;




  // progress spinner

  // showSpinner=false;

  // loadData(){
  //   this.showSpinner=true;
  //   setTimeout(()=>{
  //     this.showSpinner=false;
  //   },5000);
  // }




  //progress bar->it is related to progress spinner
  // showBar=false;

  // onClick(){
  //   this.showBar=true;
  //   setTimeout(()=>{
  //     this.showBar=false;
  //   },5000);
  // }




  //sidenav

  // isOpen=false;

  // log(event:any){
  //   console.log(event);
  // }


 

  // students:Student[]=[
  //   {
  //     id:1, name:"manu", email:"manu@gmail.com",mobile:"19993456789"
  //   },
  //   {
  //     id:1, name:"manu", email:"manu@gmail.com",mobile:"19993456789"
  //   },
  //   {
  //     id:1, name:"manu", email:"manu@gmail.com",mobile:"19993456789"
  //   },
  //   {
  //     id:1, name:"manu", email:"manu@gmail.com",mobile:"19993456789"
  //   }
  // ];
  
  // dataSource=this.students;
  // displayedColumns:string[]=['id', 'name', 'email','mobile','operations'];
  
  

  // isshow=0;



 


}
