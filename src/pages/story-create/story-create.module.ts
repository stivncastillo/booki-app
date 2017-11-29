import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryCreatePage } from './story-create';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StoryCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(StoryCreatePage),
    TranslateModule.forChild()
  ],
})
export class StoryCreatePageModule {}
