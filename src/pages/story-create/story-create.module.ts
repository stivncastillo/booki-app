import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryCreatePage } from './story-create';

@NgModule({
  declarations: [
    StoryCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(StoryCreatePage),
  ],
})
export class StoryCreatePageModule {}
