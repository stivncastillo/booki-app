import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  clases: Array<string>;
  @Input('progress') progress : string = "0";

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    this.clases = [ "progress-wrap", "progress" ];

    // console.log(parseInt(this.progress), this.progress);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (parseInt(changes.progress.currentValue) <= 40) {
      this.clases.push('red');
    } else if(parseInt(changes.progress.currentValue) > 40 && parseInt(changes.progress.currentValue) <= 70){
      this.clases.push('yellow');
    } else {
      this.clases.push('green');
    }
  }

  getProgressPercent() {
    return this._sanitizer.bypassSecurityTrustStyle(`${this.progress}%`);
  }

}
