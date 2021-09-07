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
    this.todos.forEach((todo, item) => {
      if (todo.id === id) {
        this.todos.splice(item, 1);
      }
      this._todo.next(this.todos);
    });
  }

  checkList(id:number){
    this.todos.forEach(item => {
      if(item.id === id){
        if(item.check === true){
          item.check = false;
        }else{
          item.check = true;
        }
      }
      this._todo.next(this.todos);
    })
  }

  deleteSelectedList(){
    for(let i = (this.todos.length - 1); i > -1; i--){
      if(this.todos[i].check){
        this.todos.splice(i, 1);
      }
    }
    this._todo.next(this.todos);
  }
}
