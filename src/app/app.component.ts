import { Component, OnInit } from '@angular/core';
import { ApiService } from './app.api-service';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="getItems(false)">Refresh Data from Cache</button>
    <button (click)="getItems(true)">Refresh Data from Server</button>
    <span *ngFor="let widget of widgets">
      <div *ngIf="(bsubs[widget] | async) as item">
        <span>id: {{ item?.id }}</span>
        <p>data: {{ item?.title }}</p>
      </div>
    </span>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  widgets = [10,3,10,2];
  bsubs = this.apiService.getSubjects(this.widgets);
  
  constructor(private apiService: ApiService ){}

  ngOnInit() {
    this.getItems(false);
  }
  
  getItems(forceRefresh: boolean) {
    this.apiService.getItems(this.widgets, forceRefresh);  
  }

}
