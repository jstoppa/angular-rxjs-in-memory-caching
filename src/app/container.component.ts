import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="getItems(false)">Refresh ALL Data from Cache</button>
    <button (click)="getItems(true)">Refresh ALL Data from Server</button>
    <div *ngFor="let widget of widgets">
      <div class="box">
        <presentational-component [item]="bsubs[widget] | async"></presentational-component>
        <button (click)="getItems([widget], false)">Refresh Data from Cache</button>
        <button (click)="getItems([widget], true)">Refresh Data from Server</button>
      </div>
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
    this.getItems(this.widgets, true);
  }
  
  getItems(ids: number[], forceRefreshFromServer: boolean) {
    this.apiService.getItems(ids, forceRefreshFromServer);  
  }

}
