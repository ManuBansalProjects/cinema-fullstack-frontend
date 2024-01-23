import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  

  role:any;

  constructor(private service:AppServiceService){
    
  }

  ngOnInit(): void {
    this.service.sendingRoleEmitter.subscribe((data)=>{
      this.role=data.role;
      console.log('welcome componenent ngOnInit emitter role is-> ', this.role);
    })

    this.service.setRole();
  }

  
  
}