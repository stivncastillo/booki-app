import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  text: string;
  @Input('progress') progress : string = "0";

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    console.log('Hello ProgressBarComponent Component');
  }

  getProgressPercent() {
    return this._sanitizer.bypassSecurityTrustStyle(`${this.progress}%`);
  }

}
