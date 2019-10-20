import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="getItems(false)">Refresh ALL Data from Cache</button>
    <button (click)="getItems(true)">Refresh ALL Data from Server</button>
    <div *ngFor="let widget of widgets">
      <presentational-component [item]="bsubs[widget] | async"></presentational-component>
    </div>
  `,
  styleUrls: ['./container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements AfterViewInit  {
  widgets = [1,1,2,3,4,5];
  bsubs = this.apiService.getSubjects(this.widgets);
  
  constructor(private apiService: ApiService ){}

  ngAfterViewInit() { 
    this.getItems(true);
  }
  
  getItems(forceRefreshFromServer: boolean) {
    this.apiService.getItems(this.widgets, forceRefreshFromServer);  
  }

}
