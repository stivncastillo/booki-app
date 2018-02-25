import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { BookListPage } from './book-list';

@NgModule({
  declarations: [
    BookListPage,
  ],
  imports: [
    IonicPageModule.forChild(BookListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
	  BookListPage
  ]
})
export class BookListPageModule {}
