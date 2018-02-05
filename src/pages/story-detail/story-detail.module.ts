import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { StoryDetailPage } from './story-detail';

@NgModule({
  declarations: [
    StoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    StoryDetailPage
  ]
})
export class StoryDetailPageModule {}
