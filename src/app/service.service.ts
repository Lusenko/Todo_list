import { Injectable } from '@angular/core';
import {Todo} from "./todo";
import {BehaviorSubject} from "rxjs";
import {StorageService} from "./storage.service";

//const storageKay = 'Todo_List';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {



  private _todo = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this._todo.asObservable();

  private todos: Todo[] = [];
  private next_id = 0;

  constructor(/*private storageService: StorageService*/) {
    /*this.todos$ = storageService.getData(storageKay)*/
  }

  /*saveList(){
    this.storageService.setData(storageKay, this.todos$);
  }*/

  createList(item: Todo){
    const cloneItem = {...item};
    item.id = ++this.next_id;
    this.todos = [...this.todos, item];
    this._todo.next(this.todos);
  }

  removeList(id: number){
    this.todos.forEach((todo, index) => {
      if (todo.id === id) {
        this.todos.splice(index, 1);
      }
      this._todo.next(this.todos);
    });
  }

  checkList(id:number){
    this.todos.forEach(item => {
      if(item.id === id){
        if(item.check){
          item.check = false;
        }else{
          item.check = true;
        }
      }
      this._todo.next(this.todos);
    })
  }

  showAll(){
    this._todo.next(this.todos);
    console.log(this.todos);
  }
  showDone() {
    this._todo.next(this.todos.filter(item => item.check));
  }
  showNotDone(){
    this._todo.next(this.todos.filter(item => !item.check));
  }
}
