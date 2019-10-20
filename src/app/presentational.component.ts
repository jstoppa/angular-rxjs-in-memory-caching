import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Data } from './models';
import { ApiService } from './api.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'presentational-component',
  template: `
    <div>
        <span><strong>Id:</strong> {{ data?.id }}</span>
        <p><strong>Data:</strong> {{ data?.title }}</p>
        <button (click)="getItem(data?.id, false)">Refresh Data from Cache</button>
        <button (click)="getItem(data?.id, true)">Refresh Data from Server</button>
    </div>
  `,
  styleUrls: ['./presentational.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationlComponent {
  data: Data;
  constructor(private hostElement: ElementRef, private apiService: ApiService ){}

  @Input()
  set item(value: Data) {
    if (value && value.id && this.hostElement && this.hostElement.nativeElement) {
      this.hostElement.nativeElement.firstElementChild.style.backgroundColor = 'pink';
      setTimeout(() => {
        this.hostElement.nativeElement.firstElementChild.style.backgroundColor = 'white';
      }, 500);
    }
    this.data = value;
  }
  
  getItem(id, forceRefreshFromServer) {
    this.apiService.getItems([id], forceRefreshFromServer);  
  }
}
