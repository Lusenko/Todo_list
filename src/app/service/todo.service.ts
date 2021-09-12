import { Injectable } from '@angular/core';
import {Todo} from "../interface/todo";
import {BehaviorSubject} from "rxjs";
import {StorageService} from "./storage.service";

const storageKey = 'Todo_List';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todo = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this._todo.asObservable();

  private todos: Todo[] = [];

  constructor(private storageService: StorageService) {
    let data = storageService.getData(storageKey);
    this._todo.next(data);
    this.todos = data;
  }

  saveListToLocalStorage(){
    this.storageService.setData(storageKey, this.todos);
  }

  createElement(item: Todo){
    item.id = Math.random() * (10000 - 1) + 1;

    if(this.todos === null) {this.todos = []}

    this.todos = [...this.todos, item];
    this._todo.next(this.todos);

    this.saveListToLocalStorage();
  }

  removeElement(id: number){
    this.todos.forEach((todo, index) => {
      if (todo.id === id) {
        this.todos.splice(index, 1);
      }
      this._todo.next(this.todos);
    });
    this.saveListToLocalStorage();
  }

  checkElement(id:number){
    this.todos.forEach(item => {
      if(item.id === id){
        if(item.checkValue){
          item.checkValue = false;
        }else{
          item.checkValue = true;
        }
      }
      this._todo.next(this.todos);
    })
    this.saveListToLocalStorage();
  }

  showAllElement(){
    this._todo.next(this.todos);
    this.saveListToLocalStorage();
  }
  showDoneElement() {
    const showDone = this.todos.filter(item => item.checkValue);
    this._todo.next(showDone);

    this.saveListToLocalStorage();
  }
  showNotDoneElement(){
    const showNotDone = this.todos.filter(item => !item.checkValue);
    this._todo.next(showNotDone);

    this.saveListToLocalStorage();
  }
}
