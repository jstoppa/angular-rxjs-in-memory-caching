import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Data } from './app.api-service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-presentational-component',
  template: `
    <div>
        <span><strong>Id:</strong> {{ value?.id }}</span>
        <p><strong>data:</strong> {{ value?.title }}</p>
    </div>
  `,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationlComponent {
  value: Data;
  constructor(private hostElement: ElementRef) {}

  @Input()
  set item(value: Data) {
    if (this.hostElement && this.hostElement.nativeElement && value && value.id) {
      this.hostElement.nativeElement.firstElementChild.style.backgroundColor = 'pink';
      setTimeout(() => {
        this.hostElement.nativeElement.firstElementChild.style.backgroundColor = 'white';
      }, 500);
    }
    this.value = value;
  }
}
