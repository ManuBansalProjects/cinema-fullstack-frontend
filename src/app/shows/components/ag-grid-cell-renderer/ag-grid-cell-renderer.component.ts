import { Component } from '@angular/core';
import { CinemasService } from 'src/app/cinemas/services/cinemas.service';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-ag-grid-cell-renderer',
  templateUrl: './ag-grid-cell-renderer.component.html',
  styleUrls: ['./ag-grid-cell-renderer.component.css']
})
export class AgGridCellRendererComponent {
  params:any;

  constructor(private service:AppServiceService,private moviesService:MoviesService, private cinemasService:CinemasService){

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
    this.cinemasService.getCinema(this.params.data.cinemaid).subscribe((response:any)=>{
      response.result.cinema='cinema';
      this.service.emitRecordDataToPopup(response.result);
    })
  }

  movieMoreDetailsPopup(){
    console.log('movie more details popup');
    this.moviesService.getMovie(this.params.data.movieid).subscribe((response:any)=>{
      response.result.movie='movie';
      this.service.emitRecordDataToPopup(response.result);
    })
  }

}
