import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BookListPage } from './book-list';

@NgModule({
  declarations: [
    BookListPage,
  ],
  imports: [
    IonicPageModule.forChild(BookListPage),
    TranslateModule.forChild()
  ],
  exports: [
	  BookListPage
  ]
})
export class BookListPageModule {}
