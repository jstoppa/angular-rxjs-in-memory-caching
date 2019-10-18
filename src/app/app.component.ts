import { Component, OnInit } from '@angular/core';
import { ApiService } from './app.api-service';

@Component({
  selector: 'my-app',
  template: `
    <button>Refresh Data from Cache</button>
    <button>Refresh Data from Server</button>
    <span *ngFor="let widget of widgets">
      <div *ngIf="(bsubs[widget] | async) as item"
      style="border-style: solid; margin-top: 5px; padding: 5px">
        <span>id: {{ item?.id }}</span>
        <p>data: {{ item?.title }}</p>
      </div>
    </span>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  widgets = [10,10,3,10];
  bsubs = this.apiService.getSubjects(this.widgets);
  
  constructor(private apiService: ApiService ){}

  ngOnInit() {
    this.apiService.getItems(this.widgets);  
  }
  

}