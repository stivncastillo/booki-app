import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { BookCreatePage } from './book-create';

@NgModule({
  declarations: [
    BookCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(BookCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    BookCreatePage
  ]
})
export class BookCreatePageModule {}
