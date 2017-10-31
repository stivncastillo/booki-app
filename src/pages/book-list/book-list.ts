import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public items: Items,
    public booksProvider: BooksProvider,
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
    this.currentItems = this.items.query();
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

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('BookCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
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
