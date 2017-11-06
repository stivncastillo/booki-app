import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BookDetailPage } from './book-detail';

@NgModule({
  declarations: [
    BookDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BookDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    BookDetailPage
  ]
})
export class BookDetailPageModule {}
