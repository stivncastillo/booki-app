import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Item } from '../../models/item';
import { Book } from '../../models/book';
import { APIResponse } from '../../models/api-response';
import { Items, BooksProvider } from '../../providers/providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  currentItems: Item[];
  books: Book[];
  loadList: string;

  constructor(
    public navCtrl: NavController,
    public items: Items,
    public loadingCtrl: LoadingController,
    public booksProvider: BooksProvider,
    public modalCtrl: ModalController,
    public translateService: TranslateService,
    public storage: Storage
  ) {
    this.currentItems = this.items.query();

    this.translateService.get('LOAD_LIST').subscribe((value) => {
      this.loadList = value;
    });

    this.fillList();
  }

  fillList(){
    this.books = [];

    this.booksProvider.getUserBookList().subscribe((response) => {
      let respuesta: APIResponse;
      respuesta = <APIResponse>response;
      this.books = respuesta.data;
    }, (err) => {
      // this.storage.remove('token');
      localStorage.removeItem('token');
      this.navCtrl.setRoot('LoginPage', {opt:{dismiss:false}});
    });
  }

  addBook(){
    let addModal = this.modalCtrl.create('BookCreatePage');
    addModal.onDidDismiss(book => {
      if (book) {
        this.fillList();
      }
    })
    addModal.present();
  }

  openBook(book: Book) {
    this.navCtrl.setRoot('BookDetailPage', {
      book: book,
      opt: {
        dismiss: false
      }
    });
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
