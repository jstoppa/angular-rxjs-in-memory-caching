import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Data } from './models';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'presentational-component',
  template: `
    <span><strong>Id:</strong> {{ data?.id }}</span>
    <p><strong>Data:</strong> {{ data?.title }}</p>
  `,
  styleUrls: ['./presentational.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationlComponent {
  data: Data;
  constructor(private hostElement: ElementRef){}

  @Input()
  set item(value: Data) {
    if (value && value.id && this.hostElement && this.hostElement.nativeElement) {
      this.hostElement.nativeElement.parentElement.style.backgroundColor = 'pink';
      setTimeout(() => {
        this.hostElement.nativeElement.parentElement.style.backgroundColor = 'white';
      }, 500);
    }
    this.data = value;
  }
}
