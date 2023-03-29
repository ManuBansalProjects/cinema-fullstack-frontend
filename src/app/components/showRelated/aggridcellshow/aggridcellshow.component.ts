import { Component } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';


@Component({
  selector: 'app-aggridcellshow',
  templateUrl: './aggridcellshow.component.html',
  styleUrls: ['./aggridcellshow.component.css']
})
export class AggridcellshowComponent {
  params:any;

  constructor(private service:AppServiceService){

  }

  agInit(params:any){
    console.log(params);
    this.params=params;
  }

  onDelete(){
    console.log(this.params.data);
    this.service.emitRecordDataToPopup({show:'show', id: this.params.data.id});
  }

  showMoreDetailsPopup(){
    let obj=this.params.data;
    obj.show='show';
    this.service.emitRecordDataToPopup(this.params.data);
  }

  cinemaMoreDetailsPopup(){
    this.service.getCinema(this.params.data.cinemaid).subscribe((response:any)=>{
      response.result.cinema='cinema';
      this.service.emitRecordDataToPopup(response.result);
    })
  }

  movieMoreDetailsPopup(){
    console.log('movie more details popup');
    this.service.getMovie(this.params.data.movieid).subscribe((response:any)=>{
      response.result.movie='movie';
      this.service.emitRecordDataToPopup(response.result);
    })
  }

}
