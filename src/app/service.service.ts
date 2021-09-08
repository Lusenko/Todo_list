import { Injectable } from '@angular/core';
import {Todo} from "./todo";
import {BehaviorSubject} from "rxjs";
import {StorageService} from "./storage.service";

const storageKey = 'Todo_List';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {



  private _todo = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this._todo.asObservable();

  private todos: Todo[] = [];
  private next_id = 0;

  constructor(private storageService: StorageService) {
    this._todo.next(storageService.getData(storageKey));
  }

  saveList(){
    this.storageService.setData(storageKey, this.todos);
  }



  createList(item: Todo){
    const cloneItem = {...item};
    item.id = ++this.next_id;
    this.todos = [...this.todos, item];
    this._todo.next(this.todos);
    this.saveList();
  }

  removeList(id: number){
    this.todos.forEach((todo, index) => {
      if (todo.id === id) {
        this.todos.splice(index, 1);
      }
      this._todo.next(this.todos);
    });
    this.saveList();
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
    this.saveList();
  }

  showAll(){
    this._todo.next(this.todos);
    this.saveList();
  }
  showDone() {
    this._todo.next(this.todos.filter(item => item.check));
    this.saveList();
  }
  showNotDone(){
    this._todo.next(this.todos.filter(item => !item.check));
    this.saveList();
  }
}
